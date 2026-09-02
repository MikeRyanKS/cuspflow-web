import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import DocsShell from "@/components/docs/DocsShell";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import TableOfContents from "@/components/docs/TableOfContents";
import VideoEmbed from "@/components/docs/VideoEmbed";
import {
  getAllArticles,
  getArticleBySlug,
  getAdjacentArticles,
  getCategory,
} from "@/lib/docs";
import { articleHref, categoryHref, SITE_URL } from "@/lib/docs-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.category !== category) return {};
  const url = `${SITE_URL}${articleHref(article)}`;
  return {
    title: `${article.title} | CuspFlow Docs`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.category !== category) notFound();

  const cat = getCategory(article.category);
  const { prev, next } = getAdjacentArticles(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    ...(article.updated ? { dateModified: article.updated } : {}),
    mainEntityOfPage: `${SITE_URL}${articleHref(article)}`,
    author: { "@type": "Organization", name: "CuspFlow" },
    publisher: { "@type": "Organization", name: "CuspFlow" },
  };

  return (
    <DocsShell activeSlug={slug} aside={<TableOfContents toc={article.toc} />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Documentation", href: "/docs" },
          ...(cat ? [{ label: cat.title, href: categoryHref(cat.id) }] : []),
          { label: article.title },
        ]}
      />

      <article className="max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
            {article.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">{article.description}</p>
        </header>

        {article.video && <VideoEmbed url={article.video} title={article.title} />}

        <div
          className="docs-prose"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* In-app help cross-link / support */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-slate-600">
            Still stuck? Our team is happy to help.
          </p>
          <a
            href="mailto:support@cuspflow.co"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            <Mail size={15} /> Email support
          </a>
        </div>

        {/* Prev / next */}
        <nav className="mt-10 grid sm:grid-cols-2 gap-3" aria-label="More articles">
          {prev ? (
            <Link
              href={articleHref(prev)}
              className="group rounded-xl border border-slate-200 p-4 hover:border-brand-300 transition-colors"
            >
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ArrowLeft size={12} /> Previous
              </span>
              <span className="block text-sm font-semibold text-slate-800 group-hover:text-brand-700 mt-1">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={articleHref(next)}
              className="group rounded-xl border border-slate-200 p-4 hover:border-brand-300 transition-colors sm:text-right"
            >
              <span className="text-xs text-slate-400 flex items-center gap-1 sm:justify-end">
                Next <ArrowRight size={12} />
              </span>
              <span className="block text-sm font-semibold text-slate-800 group-hover:text-brand-700 mt-1">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </DocsShell>
  );
}
