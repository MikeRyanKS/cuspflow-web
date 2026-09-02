import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import DocsShell from "@/components/docs/DocsShell";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import { getArticlesByCategory } from "@/lib/docs";
import { articleHref, categoryHref, SITE_URL } from "@/lib/docs-routes";

export const metadata: Metadata = {
  title: "CuspFlow Help & Documentation",
  description:
    "Guides, how-tos and answers for CuspFlow — the dental practice management system. Learn patient records, scheduling, treatment plans, billing, inventory, payroll and more.",
  alternates: { canonical: `${SITE_URL}/docs` },
  openGraph: {
    title: "CuspFlow Help & Documentation",
    description:
      "Guides, how-tos and answers for CuspFlow dental practice management software.",
    url: `${SITE_URL}/docs`,
    type: "website",
  },
};

export default function DocsIndexPage() {
  const groups = getArticlesByCategory();

  return (
    <DocsShell>
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Documentation" },
        ]}
      />

      <header className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-brand-600 mb-3">
          <BookOpen size={18} />
          <span className="text-sm font-semibold uppercase tracking-wider">Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
          CuspFlow Help Center
        </h1>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
          Everything you need to run your clinic in CuspFlow — from your first patient
          record to payroll, billing and reporting. New here?{" "}
          <Link href={articleHref({ category: "getting-started", slug: "getting-started" })} className="text-brand-600 font-medium hover:text-brand-700">
            Start with the getting-started guide
          </Link>
          .
        </p>
      </header>

      <div className="space-y-12">
        {groups.map(({ category, articles }) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  <Link href={categoryHref(category.id)} className="hover:text-brand-600">
                    {category.title}
                  </Link>
                </h2>
                <p className="text-sm text-slate-500 mt-1">{category.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={articleHref(a)}
                  className="group rounded-xl border border-slate-200 p-4 hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 flex items-center gap-1.5">
                    {a.title}
                    <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{a.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocsShell>
  );
}
