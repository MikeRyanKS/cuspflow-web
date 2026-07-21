import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — CuspFlow",
  description: "Simple, transparent pricing for dental clinics of all sizes. Every feature on every plan — pay only for seats, storage, and branches.",
};

const tiers = [
  {
    name: "Starter",
    price: "$49",
    annual: "$39",
    tagline: "For a single-location clinic just getting started.",
    highlight: false,
    badge: null,
    specs: [
      "Up to 5 staff seats",
      "15 GB imaging storage",
      "1 location",
    ],
  },
  {
    name: "Growth",
    price: "$99",
    annual: "$79",
    tagline: "For established clinics ready to scale their operations.",
    highlight: true,
    badge: "Most popular",
    specs: [
      "Up to 15 staff seats",
      "50 GB imaging storage",
      "Multi-branch",
    ],
  },
  {
    name: "Clinic Pro",
    price: "$199",
    annual: "$159",
    tagline: "For busy, high-volume practices and small groups.",
    highlight: false,
    badge: null,
    specs: [
      "Up to 35 staff seats",
      "120 GB imaging storage",
      "Multi-branch",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    annual: null,
    tagline: "For dental groups running large networks of clinics.",
    highlight: false,
    badge: null,
    specs: [
      "35+ staff seats",
      "Custom storage",
      "Unlimited branches",
      "Dedicated account manager & onboarding",
    ],
  },
];

const includedFeatures = [
  "Live waiting room & patient journey tracking",
  "Appointment scheduling & multi-chair calendar",
  "FDI treatment plans, charting & clinical notes",
  "X-ray & imaging storage",
  "Lab case management",
  "Auto-generated billing, installments & payments",
  "Financial analytics & reconciliation",
  "Staff directory, payroll, attendance & commissions",
  "Family / household groups",
  "CSV data migration & full data export",
  "Role-based access (8 staff roles)",
  "Multi-branch data isolation",
];

const addons = [
  { name: "Additional staff seat", price: "$12/mo", desc: "One extra staff login on top of your plan's seats. Add or remove any time." },
  { name: "Storage block", price: "$10/mo", desc: "Adds 50 GB of diagnostic imaging storage. Stack as many blocks as you need." },
  { name: "SMS Pack — Bronze", price: "$15", desc: "500 SMS credits for appointment and payment reminders. One-time top-up." },
  { name: "SMS Pack — Silver", price: "$30", desc: "1,200 SMS credits. One-time top-up." },
  { name: "SMS Pack — Gold", price: "$55", desc: "2,500 SMS credits. One-time top-up." },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — every new clinic starts with a fully-featured 30-day free trial. No credit card required. You get the entire platform during the trial, and only add payment details when you're ready to subscribe.",
  },
  {
    q: "Do all plans really include every feature?",
    a: "Yes. There's no feature gating in CuspFlow. Every plan unlocks the full product — waiting room, treatment plans, billing, lab cases, payroll, analytics, everything. Plans differ only by how many staff seats, how much imaging storage, and how many branches they cover.",
  },
  {
    q: "What if I need more seats or storage than my plan includes?",
    a: "Add them without changing plans. Additional staff seats are $12/mo each and storage blocks are $10/mo per 50 GB. Add or remove them any time — changes are prorated automatically.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time and your data moves with you — nothing is lost when you switch. Upgrades apply immediately (prorated); downgrades take effect at your next renewal.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual billing saves you roughly 20% versus paying monthly. You're billed once per year at the discounted rate shown on each plan.",
  },
  {
    q: "Is our patient data secure?",
    a: "All data is encrypted in transit and at rest. Each clinic's data is completely isolated from every other clinic using database-level row-level security. We follow HIPAA-aligned security practices.",
  },
  {
    q: "Do you support multiple currencies?",
    a: "Yes — your clinic's patient-facing invoices, receipts and payments use your own currency and locale, set during onboarding. (CuspFlow subscriptions themselves are billed in USD.)",
  },
  {
    q: "What happens to our data if we cancel or don't renew?",
    a: "Your clinic enters a 60-day view-only window. Every record stays readable and fully exportable the whole time — you can download your complete data at any point, free. Reactivating restores full access instantly. Only if no one returns within those 60 days is the data permanently deleted.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-24">
        {/* Header */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-sky-50/40 to-teal-50/60">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">Pricing</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
              Simple, transparent pricing
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Every feature is included on every plan. You only pay for staff seats, storage, and
              branches. Every plan starts with a 30-day free trial — no credit card required.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl p-6 border flex flex-col ${
                    tier.highlight
                      ? "bg-teal-600 border-teal-600 shadow-2xl shadow-teal-600/20 lg:scale-[1.03]"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {tier.badge ? (
                    <span className="text-xs font-semibold bg-white/20 text-white rounded-full px-3 py-1 self-start mb-4">
                      {tier.badge}
                    </span>
                  ) : (
                    <span className="h-[1.75rem] mb-4" />
                  )}
                  <h2 className={`text-xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-slate-900"}`}>
                    {tier.name}
                  </h2>
                  <p className={`text-xs mb-5 leading-relaxed min-h-[2.5rem] ${tier.highlight ? "text-teal-100" : "text-slate-500"}`}>
                    {tier.tagline}
                  </p>
                  <div className="mb-6">
                    <span className={`text-3xl font-bold ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                    {tier.annual && (
                      <span className={`text-sm font-medium ${tier.highlight ? "text-teal-100" : "text-slate-400"}`}>/mo</span>
                    )}
                    <p className={`text-xs mt-1 ${tier.highlight ? "text-teal-100" : "text-slate-400"}`}>
                      {tier.annual ? `or ${tier.annual}/mo billed annually` : "Tailored to your network"}
                    </p>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {tier.specs.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={14} className={`shrink-0 mt-0.5 ${tier.highlight ? "text-teal-200" : "text-teal-500"}`} />
                        <span className={tier.highlight ? "text-teal-50" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.name === "Enterprise" ? (
                    <Link
                      href="/contact"
                      className={`text-center py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50`}
                    >
                      Contact Sales <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      href="https://app.cuspflow.co/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-center py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        tier.highlight
                          ? "bg-white text-teal-700 hover:bg-teal-50"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      Start Free Trial <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400">
              All plans include a free onboarding session, data migration support, and a full 30-day trial.
            </p>
          </div>
        </section>

        {/* Everything included */}
        <section className="py-12 md:py-16 bg-slate-50/60">
          <div className="max-w-4xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Included on every plan</h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                No tiers to decode. Whichever plan you choose, your clinic gets the complete platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {includedFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle size={15} className="text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{f}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-8">
              A patient-facing portal for online booking and form signing is on the roadmap and will be
              an optional, separately-billable add-on when it launches.
            </p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-8 md:mb-10">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">Add-ons</p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Scale up without changing plans</h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                Need a few more seats, extra imaging storage, or SMS reminder credits? Add them to any plan.
              </p>
            </div>
            <div className="space-y-3">
              {addons.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-4 bg-slate-50 rounded-xl border border-slate-100 p-4 sm:p-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{a.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{a.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-teal-600 shrink-0">{a.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-slate-50/60">
          <div className="max-w-3xl mx-auto px-5 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5 sm:p-6">
                  <p className="text-sm font-semibold text-slate-900 mb-2">{faq.q}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-white border-t border-slate-100">
          <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Still have questions?</h2>
            <p className="text-slate-500 mb-7 text-sm sm:text-base">Our team is happy to walk you through pricing, features, and fit for your clinic.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors text-sm">
              Talk to us <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
