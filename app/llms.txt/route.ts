import { getArticlesByCategory } from "@/lib/docs";
import { absoluteArticleUrl, SITE_URL } from "@/lib/docs-routes";
import { getAllPosts } from "@/lib/blog";
import { apiVersion, baseUrl, getGroups, getOperations } from "@/lib/apiSpec";

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

  // The API section is written for an agent that may only ever read this file:
  // it states the conventions it cannot infer from a URL list (auth header,
  // response envelope, cursor paging, error shape) before listing the
  // endpoints, and gives each one its required scope.
  const apiGroups = getGroups();
  lines.push("## API Reference");
  lines.push("");
  lines.push(
    `The CuspFlow REST API v${apiVersion()}: ${getOperations().length} endpoints in ` +
      `${apiGroups.length} sections, for reading a clinic's own records and for bulk ` +
      "importing records from another practice management system.",
  );
  lines.push("");
  lines.push(`- Base URL: ${baseUrl()}`);
  lines.push(
    "- Auth: `Authorization: Bearer cfk_live_...`, a clinic-scoped API key created in " +
      "the app under Settings > Integrations > API. There is no OAuth and no self-serve signup.",
  );
  lines.push(
    "- Every successful response is `{\"data\": ...}`, with `meta` alongside it on a list " +
      "or an import batch, and 204 with no body on a delete.",
  );
  lines.push(
    "- Paging is keyset, not offset: pass `meta.next_cursor` back as `?cursor=`. There is " +
      "no `offset` parameter. Page size defaults to 50 and is clamped to 200.",
  );
  lines.push(
    "- Errors are RFC 9457 `application/problem+json` with a machine-readable `code`. " +
      `The catalogue is at ${SITE_URL}/docs/developers/api-errors`,
  );
  lines.push(
    "- The API sends no CORS headers and is not callable from a browser. Each reference " +
      "page carries a console that proxies the call server-side.",
  );
  lines.push(`- OpenAPI 3.1 description: ${SITE_URL}/api/openapi.json`);
  lines.push(`- Reference index: ${SITE_URL}/docs/api-reference`);
  lines.push("");

  for (const g of apiGroups) {
    lines.push(`### ${g.title}`);
    for (const op of g.operations) {
      const scope = op.scopes.length ? ` [scope: ${op.scopes.join(", ")}]` : "";
      lines.push(
        `- [${op.method} ${op.path}](${SITE_URL}/docs/api-reference/${op.slug}): ` +
          `${op.summary}${scope}`,
      );
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
