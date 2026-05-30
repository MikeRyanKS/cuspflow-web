import Link from "next/link";
import { CheckCircle } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    description: "Perfect for a single-location clinic just getting started.",
    highlight: false,
    features: [
      "1 branch",
      "Up to 5 staff accounts",
      "Waiting room & appointments",
      "Treatment plans & billing",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "For established clinics ready to scale their operations.",
    highlight: true,
    features: [
      "Up to 3 branches",
      "Up to 20 staff accounts",
      "Everything in Starter",
      "Lab case management",
      "Patient portal",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "For dental groups managing multiple clinic locations.",
    highlight: false,
    features: [
      "Unlimited branches",
      "Unlimited staff",
      "Everything in Growth",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

export default function PricingPreview() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
            We&apos;re launching soon. Book a demo to be among the first clinics on CuspFlow and get early-access rates.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 sm:p-8 border flex flex-col ${
                tier.highlight
                  ? "bg-teal-600 border-teal-600 text-white shadow-xl shadow-teal-600/20"
                  : "bg-white border-slate-200"
              }`}
            >
              {tier.highlight && (
                <span className="text-xs font-semibold bg-white/20 text-white rounded-full px-3 py-1 self-start mb-4">
                  Most popular
                </span>
              )}
              <h3 className={`text-lg sm:text-xl font-bold mb-1 ${tier.highlight ? "text-white" : "text-slate-900"}`}>
                {tier.name}
              </h3>
              <p className={`text-xs sm:text-sm mb-5 leading-relaxed ${tier.highlight ? "text-teal-100" : "text-slate-500"}`}>
                {tier.description}
              </p>
              <p className={`text-sm sm:text-base font-semibold mb-6 ${tier.highlight ? "text-teal-100" : "text-slate-400"}`}>
                Pricing on request
              </p>
              <ul className="space-y-2 flex-1 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle size={13} className={tier.highlight ? "text-teal-200 shrink-0" : "text-teal-500 shrink-0"} />
                    <span className={tier.highlight ? "text-teal-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-white text-teal-700 hover:bg-teal-50"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Get early access
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">
          All plans include a free onboarding session and data migration support.
        </p>
      </div>
    </section>
  );
}
