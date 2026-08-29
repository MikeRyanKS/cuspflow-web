import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import PricingPlans from "@/components/pricing/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing — CuspFlow",
  description: "Simple, transparent pricing for dental clinics of all sizes. Every feature on every plan, with unlimited branches — pay only for seats and storage.",
};

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
  "Free built-in data import tool & full data export",
  "Role-based access (8 staff roles)",
  "Unlimited branches, with per-branch data isolation",
];

const addons = [
  { name: "Additional staff seat", price: "$12/mo", desc: "One extra staff login on top of your plan's seats. Add or remove any time." },
  { name: "Storage block", price: "$10/mo", desc: "Adds 50 GB of diagnostic imaging storage. Stack as many blocks as you need." },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — every new clinic starts with a fully-featured 30-day free trial. No credit card required. You get the entire platform during the trial, and only add payment details when you're ready to subscribe.",
  },
  {
    q: "Do all plans really include every feature?",
    a: "Yes. There's no feature gating in CuspFlow. Every plan unlocks the full product — waiting room, treatment plans, billing, lab cases, payroll, analytics, online booking, everything — with unlimited branches. Plans differ only by how many staff seats and how much imaging storage they include.",
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
              Every feature is included on every plan. You only pay for staff seats and storage, and every plan
              includes unlimited branches. Every plan starts with a 30-day free trial — no credit card required.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <PricingPlans />
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
                Need a few more seats or extra imaging storage? Add them to any plan.
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
            <p className="text-center text-sm text-slate-500 mt-8">
              Looking for more answers?{" "}
              <Link href="/docs/reference/faq" className="text-teal-600 font-medium hover:text-teal-700">
                Read the full FAQ
              </Link>{" "}
              or browse the{" "}
              <Link href="/docs" className="text-teal-600 font-medium hover:text-teal-700">
                documentation
              </Link>
              .
            </p>
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
