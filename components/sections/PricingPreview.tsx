import Link from "next/link";
import { CheckCircle } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    annual: "$39",
    description: "For a clinic getting started.",
    highlight: false,
    specs: [
      "Up to 5 staff seats",
      "15 GB imaging storage",
      "Unlimited branches",
      "Full platform — every feature included",
    ],
  },
  {
    name: "Growth",
    price: "$99",
    annual: "$79",
    description: "For established clinics ready to scale.",
    highlight: true,
    specs: [
      "Up to 15 staff seats",
      "50 GB imaging storage",
      "Unlimited branches",
      "Full platform — every feature included",
    ],
  },
  {
    name: "Clinic Pro",
    price: "$199",
    annual: "$159",
    description: "For busy, high-volume practices.",
    highlight: false,
    specs: [
      "Up to 35 staff seats",
      "120 GB imaging storage",
      "Unlimited branches",
      "Full platform — every feature included",
    ],
  },
];

export default function PricingPreview() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Every feature, on every plan
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
            No feature gating, ever. Plans differ only by staff seats and storage — not by
            what your clinic can do, and every plan has unlimited branches. Every plan starts with a 30-day free trial.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 sm:p-8 border flex flex-col ${
                tier.highlight
                  ? "bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-600/20"
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
              <p className={`text-xs sm:text-sm mb-5 leading-relaxed ${tier.highlight ? "text-brand-100" : "text-slate-500"}`}>
                {tier.description}
              </p>
              <div className="mb-6">
                <span className={`text-3xl font-bold ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                <span className={`text-sm font-medium ${tier.highlight ? "text-brand-100" : "text-slate-400"}`}>/mo</span>
                <p className={`text-xs mt-1 ${tier.highlight ? "text-brand-100" : "text-slate-400"}`}>
                  or {tier.annual}/mo billed annually
                </p>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {tier.specs.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle size={13} className={tier.highlight ? "text-brand-200 shrink-0" : "text-brand-500 shrink-0"} />
                    <span className={tier.highlight ? "text-brand-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="https://app.cuspflow.co/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-white text-brand-700 hover:bg-brand-50"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">
          Running a group of 35+ seats?{" "}
          <Link href="/pricing" className="text-brand-600 font-medium hover:underline">
            Enterprise
          </Link>{" "}
          is custom-quoted. See{" "}
          <Link href="/pricing" className="text-brand-600 font-medium hover:underline">
            full pricing &amp; add-ons
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
