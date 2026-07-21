/**
 * Pure URL helpers for the docs section — no `fs`, safe to import from
 * Client Components. Keep this free of Node-only imports.
 */

export const SITE_URL = "https://cuspflow.co";

export const DOCS_ROOT = "/docs";

export function categoryHref(categoryId: string): string {
  return `${DOCS_ROOT}/${categoryId}`;
}

export function articleHref(a: { category: string; slug: string }): string {
  return `${DOCS_ROOT}/${a.category}/${a.slug}`;
}

/** Absolute URL for sitemap / canonical / cross-surface (in-app help) links. */
export function absoluteArticleUrl(a: { category: string; slug: string }): string {
  return `${SITE_URL}${articleHref(a)}`;
}
