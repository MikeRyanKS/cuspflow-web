import Link from "next/link";

const year = new Date().getFullYear();

const cols = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Book a Demo" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg mb-3">
            <span className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
              C
            </span>
            <span className="text-slate-900">
              Cusp<span className="text-teal-600">Flow</span>
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
                  <Link
                    href={l.href}
                    className="text-sm text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        &copy; {year} CuspFlow. All rights reserved.
      </div>
    </footer>
  );
}
