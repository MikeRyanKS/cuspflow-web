import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import DocsShell from "@/components/docs/DocsShell";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import { getCategories, getCategory, getArticlesInCategory } from "@/lib/docs";
import { articleHref, categoryHref, SITE_URL } from "@/lib/docs-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const title = `${cat.title} | CuspFlow Docs`;
  return {
    title,
    description: cat.description,
    alternates: { canonical: `${SITE_URL}${categoryHref(cat.id)}` },
    openGraph: {
      title,
      description: cat.description,
      url: `${SITE_URL}${categoryHref(cat.id)}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const articles = getArticlesInCategory(cat.id);

  return (
    <DocsShell>
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Documentation", href: "/docs" },
          { label: cat.title },
        ]}
      />

      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{cat.title}</h1>
        <p className="text-slate-500 text-base leading-relaxed">{cat.description}</p>
      </header>

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
    </DocsShell>
  );
}
