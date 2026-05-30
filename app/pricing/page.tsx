import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — CuspFlow",
  description: "Simple, transparent pricing for dental clinics of all sizes.",
};

const tiers = [
  {
    name: "Starter",
    tagline: "For a single-location clinic just getting started.",
    highlight: false,
    badge: null,
    features: [
      "1 branch",
      "Up to 5 staff accounts",
      "Appointments & scheduling",
      "Live waiting room",
      "Treatment plans & FDI chart",
      "Billing & payments",
      "Basic reporting",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tagline: "For established clinics ready to scale their operations.",
    highlight: true,
    badge: "Most popular",
    features: [
      "Up to 3 branches",
      "Up to 20 staff accounts",
      "Everything in Starter",
      "Lab case management",
      "Patient portal & online booking",
      "Digital consent forms",
      "X-ray & imaging storage",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For dental groups managing multiple clinic locations.",
    highlight: false,
    badge: null,
    features: [
      "Unlimited branches",
      "Unlimited staff accounts",
      "Everything in Growth",
      "Group-level reporting",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Onboarding & data migration",
      "Custom staff roles",
    ],
  },
];

const faqs = [
  {
    q: "When will CuspFlow be available?",
    a: "We're in the final stages of preparation and accepting early-access sign-ups now. Book a demo to get on the list and receive early-access pricing.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — every new clinic gets a fully-featured trial period. Book a demo and we'll walk you through the product and set up your trial environment.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Your data moves with you — nothing is lost when you switch.",
  },
  {
    q: "Is our patient data secure?",
    a: "All data is encrypted in transit and at rest. Each clinic's data is completely isolated from other clinics using row-level security. We follow HIPAA-aligned security practices.",
  },
  {
    q: "Do you support multiple currencies?",
    a: "Yes. CuspFlow supports AED, USD, GBP, EUR, and more. Currency is set per clinic during onboarding.",
  },
  {
    q: "What happens to our data if we cancel?",
    a: "You can export your full data at any time. We provide a 90-day data retention window after cancellation so you have time to migrate.",
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
              We&apos;re launching soon. Book a demo to lock in early-access rates and be among
              the first clinics on CuspFlow.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl p-6 sm:p-8 border flex flex-col ${
                    tier.highlight
                      ? "bg-teal-600 border-teal-600 shadow-2xl shadow-teal-600/20 md:scale-[1.02]"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {tier.badge && (
                    <span className="text-xs font-semibold bg-white/20 text-white rounded-full px-3 py-1 self-start mb-4">
                      {tier.badge}
                    </span>
                  )}
                  <h2 className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-slate-900"}`}>
                    {tier.name}
                  </h2>
                  <p className={`text-sm mb-6 leading-relaxed ${tier.highlight ? "text-teal-100" : "text-slate-500"}`}>
                    {tier.tagline}
                  </p>
                  <p className={`text-base font-semibold mb-8 ${tier.highlight ? "text-teal-100" : "text-slate-400"}`}>
                    Pricing on request
                  </p>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={14} className={`shrink-0 mt-0.5 ${tier.highlight ? "text-teal-200" : "text-teal-500"}`} />
                        <span className={tier.highlight ? "text-teal-50" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`text-center py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      tier.highlight
                        ? "bg-white text-teal-700 hover:bg-teal-50"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Get early access <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400">
              All plans include a free onboarding session, data migration support, and a full-featured trial.
            </p>
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
