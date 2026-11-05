#!/usr/bin/env node
/**
 * Blog publisher.
 *
 * Posts are written ahead of time into `content/blog-queue/`, each stamped with
 * a `publishAt` on a different day of the coming week. Nothing in that folder
 * is visible on the site: `lib/blog.ts` reads `content/blog` only. This script
 * moves whichever queued post is now due into `content/blog`, verifies the site
 * still builds, records it in the public tracker CSV, and pushes. The push is
 * the deploy, so a push means live.
 *
 * Deliberately deterministic and dependency-light: it runs twice a day and is
 * almost always a no-op, so there is nothing here worth asking a model to do.
 *
 * Usage:
 *   node scripts/publish-due-posts.mjs              # publish at most one due post
 *   node scripts/publish-due-posts.mjs --dry-run    # report only, change nothing
 *   node scripts/publish-due-posts.mjs --force      # publish the earliest queued post regardless of publishAt
 *   node scripts/publish-due-posts.mjs --max 2      # allow more than one in a single run
 *   node scripts/publish-due-posts.mjs --no-push    # commit locally, do not push
 *
 * Exit codes: 0 success or nothing due, 1 failure (and the queue is restored).
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const REPO = path.resolve(import.meta.dirname, "..");
const QUEUE_DIR = path.join(REPO, "content", "blog-queue");
const BLOG_DIR = path.join(REPO, "content", "blog");
const TRACKER = path.join(REPO, "public", "blog-tracker.csv");
const BACKLOG = path.join(REPO, "docs", "blog", "TOPIC_BACKLOG.md");
const SITE = "https://cuspflow.co";

const TRACKER_HEADER =
  "Post #,Title,URL,Date Published,Cluster,Target Market,Primary Keyword,Status";

const argv = process.argv.slice(2);
const hasFlag = (name) => argv.includes(name);
const flagValue = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const dryRun = hasFlag("--dry-run");
const force = hasFlag("--force");
const noPush = hasFlag("--no-push");
const maxPosts = Math.max(1, Number.parseInt(flagValue("--max", "1"), 10) || 1);

const log = (...a) => console.log(...a);
const fail = (...a) => {
  console.error(...a);
  process.exitCode = 1;
};

/** Local calendar date as YYYY-MM-DD. Never toISOString: that is UTC. */
function localDateString(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function git(args, opts = {}) {
  return execFileSync("git", args, { cwd: REPO, encoding: "utf8", ...opts }).trim();
}

function csvField(value) {
  const s = String(value ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

/**
 * Rewrites the frontmatter textually rather than re-serialising it, so the
 * house style (double-quoted scalars, block-sequence tags) survives untouched.
 */
function stampForPublication(raw, publishDate) {
  const match = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
  if (!match) throw new Error("no frontmatter block found");

  const [, open, body, close] = match;
  const rest = raw.slice(match[0].length);

  const kept = body
    .split(/\r?\n/)
    .filter((line) => !/^publishAt\s*:/.test(line));

  const dateIndex = kept.findIndex((line) => /^date\s*:/.test(line));
  const dateLine = `date: "${publishDate}"`;
  if (dateIndex >= 0) kept[dateIndex] = dateLine;
  else kept.splice(1, 0, dateLine);

  return `${open}${kept.join("\n")}${close}${rest}`;
}

function readQueue() {
  if (!fs.existsSync(QUEUE_DIR)) return [];
  return fs
    .readdirSync(QUEUE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(QUEUE_DIR, file), "utf8");
      const { data } = matter(raw);
      const publishAt = data.publishAt ? new Date(String(data.publishAt)) : null;
      return {
        slug,
        file,
        raw,
        data,
        publishAt: publishAt && !Number.isNaN(publishAt.getTime()) ? publishAt : null,
      };
    })
    .sort((a, b) => {
      if (a.publishAt && b.publishAt) return a.publishAt - b.publishAt;
      if (a.publishAt) return -1;
      if (b.publishAt) return 1;
      return a.slug.localeCompare(b.slug);
    });
}

function nextTrackerNumber() {
  if (!fs.existsSync(TRACKER)) return 1;
  const rows = fs
    .readFileSync(TRACKER, "utf8")
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);
  return Math.max(1, rows.length); // rows includes the header, so length == next number
}

function appendTrackerRow(post, publishDate) {
  const n = nextTrackerNumber();
  const row = [
    n,
    post.data.title ?? post.slug,
    `${SITE}/blog/${post.slug}`,
    publishDate,
    post.data.cluster ?? "",
    post.data.market ?? "",
    post.data.primaryKeyword ?? "",
    "Published",
  ]
    .map(csvField)
    .join(",");

  const existing = fs.existsSync(TRACKER) ? fs.readFileSync(TRACKER, "utf8") : "";
  const base = existing.trim().length > 0 ? existing.replace(/\s*$/, "") : TRACKER_HEADER;
  fs.writeFileSync(TRACKER, `${base}\n${row}\n`, "utf8");
  return row;
}

/**
 * Flips a topic's row from `queued` to `published` in the backlog ledger.
 * The ledger is what stops the weekly writer picking a topic twice, so it has
 * to stay in step with what is actually on the site. Best effort: a missing or
 * already-updated row is not a reason to fail a publish that has succeeded.
 */
function markPublishedInBacklog(slug) {
  if (!fs.existsSync(BACKLOG)) return false;
  const lines = fs.readFileSync(BACKLOG, "utf8").split(/\r?\n/);
  let changed = false;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].includes(`\`${slug}\``) && lines[i].includes("| queued |")) {
      lines[i] = lines[i].replace("| queued |", "| published |");
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(BACKLOG, lines.join("\n"), "utf8");
  return changed;
}

function main() {
  const queue = readQueue();
  if (queue.length === 0) {
    log("Queue is empty. Nothing to publish.");
    return;
  }

  const now = new Date();
  const due = force
    ? queue.slice(0, maxPosts)
    : queue.filter((p) => p.publishAt && p.publishAt <= now).slice(0, maxPosts);

  if (due.length === 0) {
    const next = queue.find((p) => p.publishAt);
    log(
      `Nothing due. ${queue.length} post(s) queued.` +
        (next ? ` Next is "${next.slug}" at ${next.publishAt.toLocaleString()}.` : ""),
    );
    return;
  }

  if (dryRun) {
    log(`Would publish ${due.length} post(s):`);
    for (const p of due) {
      log(`  ${p.slug}`);
      log(`    title:      ${p.data.title ?? "(missing)"}`);
      log(`    publishAt:  ${p.publishAt ? p.publishAt.toLocaleString() : "(none, --force only)"}`);
      log(`    would date: ${localDateString(now)}`);
    }
    log("Dry run: nothing written.");
    return;
  }

  const publishDate = localDateString(now);
  const moved = [];

  try {
    for (const post of due) {
      const target = path.join(BLOG_DIR, `${post.slug}.md`);
      if (fs.existsSync(target)) {
        throw new Error(`content/blog/${post.slug}.md already exists; refusing to overwrite`);
      }
      fs.writeFileSync(target, stampForPublication(post.raw, publishDate), "utf8");
      fs.rmSync(path.join(QUEUE_DIR, post.file));
      moved.push(post);
      log(`Moved ${post.slug} into content/blog (date ${publishDate}).`);
    }
  } catch (err) {
    restore(moved);
    fail(`Failed while moving posts: ${err.message}`);
    return;
  }

  // The build is the gate. A post with broken frontmatter throws in
  // lib/blog.ts, and anything that throws here must not reach the live site.
  log("Building...");
  try {
    execFileSync("npm", ["run", "build"], { cwd: REPO, stdio: "pipe", encoding: "utf8" });
    log("Build passed.");
  } catch (err) {
    const output = `${err.stdout ?? ""}${err.stderr ?? ""}`;
    restore(moved);
    fail("Build failed. Queue restored, nothing committed or pushed.\n");
    fail(output.split(/\r?\n/).slice(-40).join("\n"));
    return;
  }

  const rows = moved.map((post) => appendTrackerRow(post, publishDate));
  for (const row of rows) log(`Tracker: ${row}`);

  for (const post of moved) {
    if (markPublishedInBacklog(post.slug)) log(`Backlog: ${post.slug} marked published.`);
    else log(`Backlog: no queued row found for ${post.slug}, left alone.`);
  }

  const paths = [
    TRACKER,
    BACKLOG,
    ...moved.flatMap((p) => [
      path.join(BLOG_DIR, `${p.slug}.md`),
      path.join(QUEUE_DIR, p.file),
      path.join(REPO, "public", "blog", p.slug),
    ]),
  ].filter((p) => p === TRACKER || fs.existsSync(p) || p.includes("blog-queue"));

  try {
    git(["add", "--", ...paths]);
    const titles = moved.map((p) => p.data.title ?? p.slug);
    const subject =
      moved.length === 1
        ? `content(blog): publish "${titles[0]}"`
        : `content(blog): publish ${moved.length} posts`;
    git([
      "commit",
      "-m",
      `${subject}\n\nPublished by scripts/publish-due-posts.mjs on ${publishDate}.\n${moved
        .map((p) => `- /blog/${p.slug}`)
        .join("\n")}\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>`,
    ]);
    log("Committed.");
  } catch (err) {
    fail(`Commit failed: ${err.message}`);
    return;
  }

  if (noPush) {
    log("--no-push: commit kept local.");
  } else {
    try {
      git(["push", "origin", "HEAD:main"]);
      log("Pushed to main. Deploy is running.");
    } catch (err) {
      fail(
        `Push failed, so the post is committed locally but NOT live: ${err.message}\n` +
          "Resolve by hand, then push. Do not re-run this script for the same post.",
      );
      return;
    }
  }

  for (const post of moved) log(`Live shortly: ${SITE}/blog/${post.slug}`);
}

function restore(moved) {
  for (const post of moved) {
    try {
      fs.writeFileSync(path.join(QUEUE_DIR, post.file), post.raw, "utf8");
      const published = path.join(BLOG_DIR, `${post.slug}.md`);
      if (fs.existsSync(published)) fs.rmSync(published);
    } catch (err) {
      console.error(`Could not restore ${post.slug}: ${err.message}`);
    }
  }
  if (moved.length > 0) console.error(`Restored ${moved.length} post(s) to the queue.`);
}

main();
