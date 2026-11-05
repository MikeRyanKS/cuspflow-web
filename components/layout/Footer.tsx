import Link from "next/link";

const year = new Date().getFullYear();

type FooterLink = {
  href: string;
  label: string;
  /** A static file served from the site root, not a Next route, so it needs a plain anchor. */
  raw?: boolean;
};

const cols: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "https://app.cuspflow.co/signup", label: "Free Trial" },
      { href: "https://app.cuspflow.co/login", label: "Log in" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/tutorials", label: "Video Tutorials" },
      { href: "/blog", label: "Blog" },
      { href: "/docs/reference/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { href: "/docs/developers/api-overview", label: "API Documentation" },
      { href: "/docs/api-reference", label: "API Reference" },
      { href: "/docs/developers/api-errors", label: "Error Codes" },
      // public/api/openapi.json is a static file, not a route.
      { href: "/api/openapi.json", label: "OpenAPI Spec", raw: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      // Sub-processors deliberately is not here. It is a disclosure that belongs
      // beside the provider list it expands on, so it is linked from the Privacy
      // Policy (section 6) and from Terms section 15 instead.
    ],
  },
];

const linkClass = "text-sm text-slate-500 hover:text-brand-600 transition-colors";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-8">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg mb-3">
            <span className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white text-sm font-bold">
              C
            </span>
            <span className="text-slate-900">
              Cusp<span className="text-brand-600">Flow</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
            Practice management software built for modern dental clinics. Real-time, multi-branch, and built to scale.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.heading}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {col.heading}
            </p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.raw ? (
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <div className="flex items-center justify-center gap-4 mb-2">
          {/* Static files served from the site root (not Next routes), so plain anchors. */}
          <a href="/sitemap.xml" className="hover:text-brand-600 transition-colors">Sitemap</a>
          <span aria-hidden>·</span>
          <a href="/llms.txt" className="hover:text-brand-600 transition-colors">llms.txt</a>
        </div>
        &copy; {year} Keplify LLC. CuspFlow is a product of Keplify LLC. All rights reserved.
      </div>
    </footer>
  );
}
