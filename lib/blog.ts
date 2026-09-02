import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

/**
 * Blog content pipeline.
 *
 * Posts are Markdown files with frontmatter in `content/blog/*.md`. This module
 * is the single source of truth for the blog: the index page, post pages,
 * sitemap and any listings read from here. Mirrors lib/docs.ts.
 *
 * Server-only (uses `fs`): import from Server Components / route handlers /
 * sitemap only, never from a "use client" module.
 */

export interface BlogFrontmatter {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-09-02". */
  date: string;
  author: string;
  /** Short read-time label, e.g. "6 min read". */
  readingTime?: string;
  /** SEO/topic tags. */
  tags?: string[];
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  html: string;
}

export interface BlogListItem extends BlogFrontmatter {
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readAllFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      raw: fs.readFileSync(path.join(BLOG_DIR, f), "utf8"),
    }));
}

function parseFrontmatter(slug: string, raw: string): { data: BlogFrontmatter; content: string } {
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;
  if (!fm.title || !fm.description || !fm.date || !fm.author) {
    throw new Error(
      `Blog post "${slug}" is missing required frontmatter (title, description, date, author).`,
    );
  }
  return {
    data: {
      title: fm.title,
      description: fm.description,
      date: fm.date,
      author: fm.author,
      readingTime: fm.readingTime,
      tags: fm.tags ?? [],
    },
    content,
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "wrap",
    properties: { className: ["heading-anchor"] },
  })
  .use(rehypeStringify);

async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown);
  return String(file);
}

/** All posts, newest first. */
export function getAllPosts(): BlogListItem[] {
  return readAllFiles()
    .map(({ slug, raw }) => {
      const { data } = parseFrontmatter(slug, raw);
      return { slug, ...data };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

/** Full post (rendered HTML) for a single slug, or null. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(slug, raw);
  const html = await renderMarkdown(content);
  return { slug, ...data, html };
}

export function getAllPostSlugs(): string[] {
  return readAllFiles().map((f) => f.slug);
}

/** Human-friendly date, e.g. "2 September 2026". */
export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
