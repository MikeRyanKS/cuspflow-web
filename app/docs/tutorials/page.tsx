import type { Metadata } from "next";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import DocsShell from "@/components/docs/DocsShell";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import { SITE_URL } from "@/lib/docs-routes";

export const metadata: Metadata = {
  title: "Video Tutorials — CuspFlow",
  description:
    "Short video tutorials for CuspFlow dental practice management software — getting started, scheduling, the waiting room, billing, treatment plans, inventory, payroll and more.",
  alternates: { canonical: `${SITE_URL}/docs/tutorials` },
  openGraph: {
    title: "CuspFlow Video Tutorials",
    description: "Watch short how-to videos for every part of CuspFlow.",
    url: `${SITE_URL}/docs/tutorials`,
    type: "website",
  },
};

interface Tut {
  title: string;
  youtube: string;
  group: string;
  href: string;
}

const TUTORIALS: Tut[] = [
  { title: "Getting started", youtube: "wIW0ola5lJw", group: "Getting Started", href: "/docs/getting-started/getting-started" },
  { title: "Set up your clinic", youtube: "h3GDcGWQkgI", group: "Getting Started", href: "/docs/getting-started/initial-clinic-setup" },
  { title: "Import your existing data", youtube: "FjCAIiJmpdc", group: "Getting Started", href: "/docs/getting-started/importing-your-data" },
  { title: "Add a patient", youtube: "iYnb9jW7HPI", group: "Patients & Scheduling", href: "/docs/patients-scheduling/patient-records" },
  { title: "Book an appointment", youtube: "Qp9Wh0yJfIw", group: "Patients & Scheduling", href: "/docs/patients-scheduling/appointments" },
  { title: "Check-in & the Waiting Room", youtube: "ukbw4Z4S0PA", group: "Patients & Scheduling", href: "/docs/patients-scheduling/waiting-room" },
  { title: "Checkout & take payment", youtube: "Vzt_wDOAS4o", group: "Billing & Payments", href: "/docs/billing-payments/checkout-and-taking-payment" },
  { title: "Treatment plans & teeth chart", youtube: "oIqPf6gAnDk", group: "Clinical", href: "/docs/clinical/treatment-plans" },
  { title: "Lab cases", youtube: "ZxROSduoHhY", group: "Clinical", href: "/docs/clinical/lab-cases" },
  { title: "Price catalog & Bill of Materials", youtube: "jwlFQIgJtSo", group: "Operations", href: "/docs/operations/price-catalog" },
  { title: "Inventory & stock", youtube: "mlvzW-zejbQ", group: "Operations", href: "/docs/operations/inventory" },
  { title: "Financials & reports", youtube: "uI1t3ZEQWPI", group: "Operations", href: "/docs/reference/reports-and-analytics" },
  { title: "Insurance claims", youtube: "tTveuguTK0U", group: "Billing & Payments", href: "/docs/billing-payments/insurance-claims" },
  { title: "Staff, roles & permissions", youtube: "wi4oiDQnego", group: "Staff & HR", href: "/docs/staff-hr/staff-management" },
  { title: "Payroll & attendance", youtube: "xT6ywwQ-GMo", group: "Staff & HR", href: "/docs/staff-hr/payroll" },
  { title: "Manage your subscription", youtube: "hpMHEQuC8oI", group: "Account & Subscription", href: "/docs/account-subscription/choosing-and-managing-your-subscription" },
];

export default function TutorialsPage() {
  return (
    <DocsShell activeTutorials>
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Documentation", href: "/docs" },
          { label: "Video Tutorials" },
        ]}
      />

      <header className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-brand-600 mb-3">
          <PlayCircle size={18} />
          <span className="text-sm font-semibold uppercase tracking-wider">Video Tutorials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
          Watch & learn
        </h1>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
          Short, focused videos for every part of CuspFlow. Click any tutorial to watch it
          alongside the full written guide.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {TUTORIALS.map((t) => (
          <Link
            key={t.youtube}
            href={t.href}
            className="group rounded-xl border border-slate-200 overflow-hidden hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${t.youtube}/hqdefault.jpg`}
                alt={t.title}
                loading="lazy"
                className="h-full w-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-black/55 group-hover:bg-brand-600 transition-colors">
                  <PlayCircle size={30} className="text-white" />
                </span>
              </span>
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{t.group}</p>
              <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 mt-1">{t.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </DocsShell>
  );
}
