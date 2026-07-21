import type { MetadataRoute } from "next";
import { getAllArticles, getCategories } from "@/lib/docs";
import { articleHref, categoryHref } from "@/lib/docs-routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cuspflow.co";
  const now = new Date();

  // Marketing pages
  const marketing = ["/", "/features", "/pricing", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    }),
  );

  // Docs — index, one entry per category, one per article. Real crawlable URLs.
  const docsIndex = {
    url: `${base}/docs`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  const categories = getCategories().map((c) => ({
    url: `${base}${categoryHref(c.id)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articles = getAllArticles().map((a) => ({
    url: `${base}${articleHref(a)}`,
    lastModified: a.updated ? new Date(a.updated) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...marketing, docsIndex, ...categories, ...articles];
}
