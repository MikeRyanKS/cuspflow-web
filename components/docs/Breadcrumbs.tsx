import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/docs-routes";

export interface Crumb {
  label: string;
  /** Site-relative path, e.g. "/docs". Omit href on the final (current) crumb. */
  href?: string;
}

/**
 * Real breadcrumb trail (Home → Docs → Category → Article) with
 * BreadcrumbList JSON-LD so search engines and AI crawlers parse the
 * hierarchy. Pass the full trail including the current page.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                {c.href && !last ? (
                  <Link href={c.href} className="hover:text-teal-600">
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-slate-700 font-medium" : ""} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight size={12} className="text-slate-300" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
