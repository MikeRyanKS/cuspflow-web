import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { SITE_URL } from "@/lib/docs-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | CuspFlow Blog`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "CuspFlow" },
    publisher: { "@type": "Organization", name: "CuspFlow" },
  };

  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="max-w-2xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> All articles
          </Link>

          <article>
            <header className="mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readingTime && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
                {post.title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">{post.description}</p>
            </header>

            <div className="docs-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
              <p className="text-base font-semibold text-slate-900 mb-1">
                See CuspFlow run your clinic
              </p>
              <p className="text-sm text-slate-500 mb-4">
                Every feature, unlimited branches, 30-day free trial. No card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="https://app.cuspflow.co/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors text-sm"
                >
                  Start free trial <ArrowRight size={15} />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-white transition-colors text-sm"
                >
                  See features
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
