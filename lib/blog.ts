import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
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
const PUBLIC_DIR = path.join(process.cwd(), "public");

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

/* ------------------------------------------------------------------ *
 * Images
 *
 * Markdown gives us `![alt](src "title")` and nothing else: raw HTML is
 * dropped by this pipeline (remarkRehype runs without allowDangerousHtml),
 * so `<figure>`, width/height and loading hints cannot be hand-written in
 * a post. The plugin below supplies them from the Markdown we do have.
 *
 * - intrinsic width/height are read off the real file, so there is no
 *   layout shift while the image loads
 * - the first image in a post is the likely LCP element, so it loads
 *   eagerly at high priority and the rest are lazy
 * - a paragraph containing nothing but an image becomes a <figure>, and
 *   the Markdown image title becomes its <figcaption>. The title is then
 *   removed from the <img> so the caption is not also a hover tooltip.
 * ------------------------------------------------------------------ */

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

const sizeCache = new Map<string, { width: number; height: number } | null>();

function intrinsicSize(src: string): { width: number; height: number } | null {
  const cached = sizeCache.get(src);
  if (cached !== undefined) return cached;

  let size: { width: number; height: number } | null = null;
  try {
    const file = path.join(PUBLIC_DIR, src.replace(/^\/+/, ""));
    if (fs.existsSync(file)) {
      const { width, height } = imageSize(fs.readFileSync(file));
      if (width && height) size = { width, height };
    }
  } catch {
    size = null;
  }
  sizeCache.set(src, size);
  return size;
}

function isImage(node: HastNode): boolean {
  return node.type === "element" && node.tagName === "img";
}

function isBlankText(node: HastNode): boolean {
  return node.type === "text" && !String(node.value ?? "").trim();
}

/** Sets SEO/performance attributes and returns the caption text, if any. */
function decorateImage(img: HastNode, index: number): string {
  const props = (img.properties ??= {});

  const src = typeof props.src === "string" ? props.src : "";
  if (src.startsWith("/")) {
    const size = intrinsicSize(src);
    if (size) {
      props.width = size.width;
      props.height = size.height;
    }
  }

  props.decoding = "async";
  if (index === 0) {
    props.loading = "eager";
    props.fetchpriority = "high";
  } else {
    props.loading = "lazy";
  }

  const title = typeof props.title === "string" ? props.title.trim() : "";
  if (title) delete props.title;
  return title;
}

function rehypeBlogFigures() {
  return (tree: unknown) => {
    let seen = 0;

    const walk = (node: HastNode): void => {
      const children = node.children;
      if (!children) return;

      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];

        if (child.type === "element" && child.tagName === "p") {
          const content = (child.children ?? []).filter((c) => !isBlankText(c));
          if (content.length === 1 && isImage(content[0])) {
            const img = content[0];
            const caption = decorateImage(img, seen);
            seen += 1;
            children[i] = {
              type: "element",
              tagName: "figure",
              properties: { className: ["blog-figure"] },
              children: caption
                ? [
                    img,
                    {
                      type: "element",
                      tagName: "figcaption",
                      properties: {},
                      children: [{ type: "text", value: caption }],
                    },
                  ]
                : [img],
            };
            continue;
          }
        }

        if (isImage(child)) {
          decorateImage(child, seen);
          seen += 1;
        }
        walk(child);
      }
    };

    walk(tree as HastNode);
  };
}

/** Site-relative image paths referenced by a post, in document order. */
export function getPostImages(slug: string): string[] {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return [];
  const { content } = matter(fs.readFileSync(filePath, "utf8"));
  const found: string[] = [];
  for (const match of content.matchAll(/!\[[^\]]*\]\(\s*(\/[^)\s]+)/g)) {
    if (!found.includes(match[1])) found.push(match[1]);
  }
  return found;
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
  .use(rehypeBlogFigures)
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
