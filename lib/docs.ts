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
import GithubSlugger from "github-slugger";

/**
 * Docs content pipeline.
 *
 * Articles are plain Markdown files with frontmatter in `content/docs/*.md`.
 * This module is the SINGLE source of truth for the docs: the index page,
 * category pages, article pages, sidebar, breadcrumbs, sitemap and llms.txt
 * all read from here. Never hand-maintain a second nav/list structure.
 *
 * Server-only (uses `fs`) — import from Server Components / route handlers /
 * sitemap only, never from a "use client" module.
 */

export interface DocCategory {
  /** URL segment, e.g. "billing-payments" */
  id: string;
  title: string;
  description: string;
}

/**
 * Ordered categories. Order here drives sidebar order, index order and
 * prev/next traversal. Mirrors the module grouping in the product guide.
 */
export const DOC_CATEGORIES: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up your clinic and learn the essentials.",
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    description: "The terminology and roles that run through CuspFlow.",
  },
  {
    id: "patients-scheduling",
    title: "Patients & Scheduling",
    description: "Records, families, appointments and the waiting room.",
  },
  {
    id: "clinical",
    title: "Clinical",
    description: "Treatment plans, charting, lab cases and templates.",
  },
  {
    id: "billing-payments",
    title: "Billing & Payments",
    description: "Checkout, receipts, balances and insurance claims.",
  },
  {
    id: "operations",
    title: "Operations",
    description: "Inventory, price catalog, branches and chairs.",
  },
  {
    id: "staff-hr",
    title: "Staff & HR",
    description: "Team management, payroll and attendance.",
  },
  {
    id: "account-subscription",
    title: "Account & Subscription",
    description: "Your CuspFlow plan, add-ons, trials and data export.",
  },
  {
    id: "reference",
    title: "Reference",
    description: "FAQ, reporting and quick answers.",
  },
];

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface DocFrontmatter {
  title: string;
  description: string;
  category: string;
  order: number;
  updated?: string;
}

export interface DocArticle extends DocFrontmatter {
  slug: string;
  /** Rendered HTML (static, produced at build time). */
  html: string;
  /** In-page table of contents (h2/h3), ids match rendered heading ids. */
  toc: TocEntry[];
}

export interface DocListItem extends DocFrontmatter {
  slug: string;
}

const DOCS_DIR = path.join(process.cwd(), "content", "docs");
const CATEGORY_IDS = new Set(DOC_CATEGORIES.map((c) => c.id));

function readAllFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      raw: fs.readFileSync(path.join(DOCS_DIR, f), "utf8"),
    }));
}

function parseFrontmatter(slug: string, raw: string): { data: DocFrontmatter; content: string } {
  const { data, content } = matter(raw);
  const fm = data as Partial<DocFrontmatter>;
  if (!fm.title || !fm.description || !fm.category || typeof fm.order !== "number") {
    throw new Error(
      `Doc "${slug}" is missing required frontmatter (title, description, category, order).`,
    );
  }
  if (!CATEGORY_IDS.has(fm.category)) {
    throw new Error(
      `Doc "${slug}" has unknown category "${fm.category}". Add it to DOC_CATEGORIES or fix the frontmatter.`,
    );
  }
  return {
    data: {
      title: fm.title,
      description: fm.description,
      category: fm.category,
      order: fm.order,
      updated: fm.updated,
    },
    content,
  };
}

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*#*\s*$/;

/** Build a TOC whose ids match rehype-slug output (same github-slugger). */
function buildToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = HEADING_RE.exec(line);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    // Strip inline markdown emphasis/links for the visible label.
    const text = m[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    toc.push({ id: slugger.slug(text), text, depth });
  }
  return toc;
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

/** All articles as lightweight list items, sorted by category then order. */
export function getAllArticles(): DocListItem[] {
  const items = readAllFiles().map(({ slug, raw }) => {
    const { data } = parseFrontmatter(slug, raw);
    return { slug, ...data };
  });
  return sortArticles(items);
}

function sortArticles<T extends { category: string; order: number; title: string }>(items: T[]): T[] {
  const catIndex = (id: string) => DOC_CATEGORIES.findIndex((c) => c.id === id);
  return [...items].sort((a, b) => {
    const c = catIndex(a.category) - catIndex(b.category);
    if (c !== 0) return c;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

/** Full article (rendered HTML + toc) for a single slug, or null. */
export async function getArticleBySlug(slug: string): Promise<DocArticle | null> {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(slug, raw);
  const html = await renderMarkdown(content);
  const toc = buildToc(content);
  return { slug, ...data, html, toc };
}

/** Categories that actually contain at least one article, in canonical order. */
export function getCategories(): DocCategory[] {
  const present = new Set(getAllArticles().map((a) => a.category));
  return DOC_CATEGORIES.filter((c) => present.has(c.id));
}

export function getCategory(id: string): DocCategory | undefined {
  return DOC_CATEGORIES.find((c) => c.id === id);
}

/** Articles grouped by category, categories in canonical order. */
export function getArticlesByCategory(): { category: DocCategory; articles: DocListItem[] }[] {
  const all = getAllArticles();
  return getCategories().map((category) => ({
    category,
    articles: all.filter((a) => a.category === category.id),
  }));
}

export function getArticlesInCategory(categoryId: string): DocListItem[] {
  return getAllArticles().filter((a) => a.category === categoryId);
}

/** Prev/next in the flattened (category-order, then order) sequence. */
export function getAdjacentArticles(slug: string): {
  prev: DocListItem | null;
  next: DocListItem | null;
} {
  const all = getAllArticles();
  const i = all.findIndex((a) => a.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
