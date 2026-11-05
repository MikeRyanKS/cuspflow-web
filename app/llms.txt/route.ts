import { getArticlesByCategory } from "@/lib/docs";
import { absoluteArticleUrl, SITE_URL } from "@/lib/docs-routes";
import { getAllPosts } from "@/lib/blog";
import { getGroups } from "@/lib/apiSpec";

// Emitted as a static /llms.txt file at build time (output: "export").
export const dynamic = "force-static";

/**
 * Machine-readable index of the site for AI crawlers (llms.txt convention).
 * NOTE: this does not auto-update beyond what the docs/blog loaders provide. If
 * you add other pages or change the product summary, edit this by hand.
 */
export function GET(): Response {
  const groups = getArticlesByCategory();
  const posts = getAllPosts();

  const lines: string[] = [
    "# CuspFlow",
    "",
    "> CuspFlow is cloud dental practice management software: patient records, scheduling, a live waiting room, clinical charting and treatment plans, lab cases, billing and payments, inventory, HR/payroll and reporting. Multi-branch, with each clinic's data fully isolated. Every subscription plan includes every feature. Built for dental clinics in Asia, South America and Africa; not offered in Europe, the USA or Canada.",
    "",
    `- Website: ${SITE_URL}`,
    `- Features: ${SITE_URL}/features`,
    `- Pricing: ${SITE_URL}/pricing`,
    `- About: ${SITE_URL}/about`,
    `- Blog: ${SITE_URL}/blog`,
    `- Documentation: ${SITE_URL}/docs`,
    `- Video tutorials: ${SITE_URL}/docs/tutorials`,
    `- REST API guides: ${SITE_URL}/docs/developers/api-overview`,
    `- REST API reference (every endpoint): ${SITE_URL}/docs/api-reference`,
    `- OpenAPI 3.1 description: ${SITE_URL}/api/openapi.json`,
    `- Contact: ${SITE_URL}/contact`,
    `- App (login): https://app.cuspflow.co`,
    `- Support: support@cuspflow.co`,
    "",
    "## Blog",
    "",
  ];

  for (const p of posts) {
    lines.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`);
  }
  lines.push("");

  lines.push("## Documentation");
  lines.push("");

  for (const { category, articles } of groups) {
    lines.push(`### ${category.title}`);
    for (const a of articles) {
      lines.push(`- [${a.title}](${absoluteArticleUrl(a)}): ${a.description}`);
    }
    lines.push("");
  }

  lines.push("## API Reference");
  lines.push("");
  lines.push(
    "Every endpoint of the CuspFlow REST API v1. Authentication is a clinic-scoped " +
      "API key sent as `Authorization: Bearer cfk_live_...`. Machine-readable " +
      `description: ${SITE_URL}/api/openapi.json`,
  );
  lines.push("");

  for (const g of getGroups()) {
    lines.push(`### ${g.title}`);
    for (const op of g.operations) {
      lines.push(
        `- [${op.method} ${op.path}](${SITE_URL}/docs/api-reference/${op.slug}): ${op.summary}`,
      );
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
