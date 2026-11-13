import type { MetadataRoute } from "next";
import { getAllArticles, getCategories } from "@/lib/docs";
import { articleHref, categoryHref } from "@/lib/docs-routes";
import { getAllPosts, getPostImages } from "@/lib/blog";
import { getOperations, specModified } from "@/lib/apiSpec";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cuspflow.co";
  const now = new Date();

  // Marketing pages. The app screenshots are the only images on these pages and
  // they are the ones worth surfacing in image search, so each page declares the
  // ones it actually renders — same reasoning as the blog entries below. A page
  // only lists screenshots it really shows; an image on no page does not belong
  // in here, because Google indexes images in the context of a page.
  const MARKETING_IMAGES: Record<string, string[]> = {
    "/": ["waiting-room", "treatment-plans", "financials", "data-migration"],
    "/features": [
      "waiting-room", "appointments", "treatment-plans", "financials", "claims",
      "patients", "reports", "price-catalog", "inventory", "hr", "data-migration",
    ],
    "/about": ["dashboard"],
  };

  const marketing = ["/", "/features", "/pricing", "/about", "/contact", "/privacy", "/terms", "/sub-processors"].map(
    (path) => {
      const shots = MARKETING_IMAGES[path] ?? [];
      return {
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.8,
        ...(shots.length > 0
          ? { images: shots.map((name) => `${base}/screenshots/${name}.webp`) }
          : {}),
      };
    },
  );

  // Blog — index + one entry per post
  const blogIndex = {
    url: `${base}/blog`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  // Each post also declares its own images, so the diagrams and screenshots
  // written into a post are discoverable rather than invisible to image search.
  const posts = getAllPosts().map((p) => {
    const images = getPostImages(p.slug).map((src) => `${base}${src}`);
    return {
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(images.length > 0 ? { images } : {}),
    };
  });

  // Docs — index, one entry per category, one per article. Real crawlable URLs.
  const docsIndex = {
    url: `${base}/docs`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  const tutorials = {
    url: `${base}/docs/tutorials`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
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

  // API reference - the index plus one crawlable URL per endpoint, generated
  // from the OpenAPI description so a new endpoint is indexed automatically.
  //
  // lastModified is the spec file's own mtime, not build time: these 80 URLs
  // change when the API contract changes and at no other moment, so stamping
  // them "modified today" on every unrelated deploy would be a false signal
  // across more than half the sitemap.
  const apiChanged = specModified();

  const apiRefIndex = {
    url: `${base}/docs/api-reference`,
    lastModified: apiChanged,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  const endpoints = getOperations().map((op) => ({
    url: `${base}/docs/api-reference/${op.slug}`,
    lastModified: apiChanged,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...marketing,
    blogIndex,
    ...posts,
    docsIndex,
    tutorials,
    ...categories,
    ...articles,
    apiRefIndex,
    ...endpoints,
  ];
}
