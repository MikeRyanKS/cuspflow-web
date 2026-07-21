import { getArticlesByCategory } from "@/lib/docs";
import { absoluteArticleUrl, SITE_URL } from "@/lib/docs-routes";

// Emitted as a static /llms.txt file at build time (output: "export").
export const dynamic = "force-static";

/**
 * Machine-readable index of the site for AI crawlers (llms.txt convention).
 * NOTE: this does not auto-update beyond what the docs loader provides — if you
 * add non-docs pages or change the product summary, edit this by hand.
 */
export function GET(): Response {
  const groups = getArticlesByCategory();

  const lines: string[] = [
    "# CuspFlow",
    "",
    "> CuspFlow is a cloud dental practice-management system: patient records, scheduling, a live waiting room, clinical charting and treatment plans, lab cases, billing and payments, inventory, HR/payroll and reporting. Multi-branch, with each clinic's data fully isolated. Every subscription plan includes every feature.",
    "",
    `- Website: ${SITE_URL}`,
    `- Documentation: ${SITE_URL}/docs`,
    `- Pricing: ${SITE_URL}/pricing`,
    `- App (login): https://app.cuspflow.co`,
    `- Support: support@cuspflow.co`,
    "",
    "## Documentation",
    "",
  ];

  for (const { category, articles } of groups) {
    lines.push(`### ${category.title}`);
    for (const a of articles) {
      lines.push(`- [${a.title}](${absoluteArticleUrl(a)}): ${a.description}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
