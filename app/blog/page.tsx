import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getAllPosts, formatDate } from "@/lib/blog";
import { SITE_URL } from "@/lib/docs-routes";

export const metadata: Metadata = {
  title: "Blog | Dental Practice Management Tips & Guides | CuspFlow",
  description:
    "Practical guides on running a modern dental clinic: reducing wait times, choosing practice management software, billing, multi-branch operations and more.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CuspFlow Blog",
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}/blog/${p.slug}`,
      author: { "@type": "Organization", name: "CuspFlow" },
    })),
  };

  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-brand-50/40 to-brand-50/60">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4">Blog</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              Running a better dental clinic
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Practical guides on practice management, patient flow, billing and growth, written for
              dental clinics in Asia, South America and Africa.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 space-y-4 sm:space-y-5">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl border border-slate-200 p-5 sm:p-7 hover:border-brand-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  {p.readingTime && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{p.readingTime}</span>
                    </>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2">
                  {p.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{p.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Read more <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
