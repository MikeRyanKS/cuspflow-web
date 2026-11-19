import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  BookOpen,
  Code2,
  LayoutDashboard,
  LifeBuoy,
  Newspaper,
  Tag,
} from "lucide-react";

/**
 * The site's 404.
 *
 * `next build` with `output: "export"` renders this root `not-found` into
 * `out/404.html`, and `worker/index.ts` serves that file with a 404 status for
 * any unmatched path. Before this existed the visitor got a zero-byte 404 and
 * the browser's own blank error screen, with no way back into the site.
 *
 * Next injects `<meta name="robots" content="noindex">` on a 404 itself, so the
 * metadata here only has to set the title.
 */
export const metadata: Metadata = {
  title: "Page not found | CuspFlow",
  description:
    "That page is not on cuspflow.co. Here are the places most visitors are looking for.",
};

const destinations = [
  {
    href: "/features",
    icon: LayoutDashboard,
    title: "Features",
    desc: "Waiting room, appointments, treatment plans, billing, lab cases, inventory.",
  },
  {
    href: "/pricing",
    icon: Tag,
    title: "Pricing",
    desc: "Every feature on every plan, unlimited branches, 30-day free trial.",
  },
  {
    href: "/docs",
    icon: BookOpen,
    title: "Documentation",
    desc: "Setup guides, day-to-day workflows and video tutorials for your team.",
  },
  {
    href: "/docs/api-reference",
    icon: Code2,
    title: "API reference",
    desc: "Every endpoint, with a console you can call your own clinic from.",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "Blog",
    desc: "Practical writing on running and growing a dental practice.",
  },
  {
    href: "/contact",
    icon: LifeBuoy,
    title: "Talk to us",
    desc: "Book a demo, or tell us what you were looking for so we can fix the link.",
  },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-24 min-h-screen bg-gradient-to-br from-white via-brand-50/30 to-brand-50/40">
        <section className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 rounded-full px-3 py-1">
              Error 404
            </p>
            <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
              That page isn&apos;t here
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              The link may be out of date, or the address may have a typo in it. Nothing is
              wrong with your account, and the app itself is unaffected.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
              >
                Back to the homepage
                <ArrowRight size={16} />
              </Link>
              <Link
                href="https://app.cuspflow.co/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
              >
                Log in to CuspFlow
              </Link>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Or try one of these
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map(({ href, icon: Icon, title, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
