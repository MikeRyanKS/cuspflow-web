"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

type Tier = {
  name: string;
  /** Monthly rate in USD. null = custom/enterprise. */
  monthly: number | null;
  /** Per-month rate when billed annually. null = custom/enterprise. */
  annualMonthly: number | null;
  tagline: string;
  highlight: boolean;
  badge: string | null;
  specs: string[];
};

const tiers: Tier[] = [
  {
    name: "Starter",
    monthly: 49,
    annualMonthly: 39,
    tagline: "For a clinic just getting started.",
    highlight: false,
    badge: null,
    specs: ["Up to 5 staff seats", "15 GB imaging storage", "Unlimited branches"],
  },
  {
    name: "Growth",
    monthly: 99,
    annualMonthly: 79,
    tagline: "For established clinics ready to scale their operations.",
    highlight: true,
    badge: "Most popular",
    specs: ["Up to 15 staff seats", "50 GB imaging storage", "Unlimited branches"],
  },
  {
    name: "Clinic Pro",
    monthly: 199,
    annualMonthly: 159,
    tagline: "For busy, high-volume practices and small groups.",
    highlight: false,
    badge: null,
    specs: ["Up to 35 staff seats", "120 GB imaging storage", "Unlimited branches"],
  },
  {
    name: "Enterprise",
    monthly: null,
    annualMonthly: null,
    tagline: "For dental groups running large networks of clinics.",
    highlight: false,
    badge: null,
    specs: [
      "35+ staff seats",
      "Custom storage",
      "Unlimited branches",
      "Dedicated account manager & assisted onboarding",
    ],
  },
];

type Period = "annual" | "monthly";

export default function PricingPlans() {
  const [period, setPeriod] = useState<Period>("annual");

  return (
    <>
      {/* Billing period switcher */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {(["monthly", "annual"] as Period[]).map((p) => {
            const active = period === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                aria-pressed={active}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {p === "monthly" ? "Monthly" : "Annual"}
                {p === "annual" && (
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold align-middle ${
                      active ? "bg-white/20 text-white" : "bg-brand-50 text-brand-600"
                    }`}
                  >
                    Save ~20%
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400">
          {period === "annual"
            ? "Showing per-month rates billed annually."
            : "Showing month-to-month rates."}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {tiers.map((tier) => {
          const isCustom = tier.monthly === null;
          const shown = period === "annual" ? tier.annualMonthly : tier.monthly;
          return (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 border flex flex-col ${
                tier.highlight
                  ? "bg-brand-600 border-brand-600 shadow-2xl shadow-brand-600/20 lg:scale-[1.03]"
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
              <p className={`text-xs mb-5 leading-relaxed min-h-[2.5rem] ${tier.highlight ? "text-brand-100" : "text-slate-500"}`}>
                {tier.tagline}
              </p>
              <div className="mb-6">
                <span className={`text-3xl font-bold ${tier.highlight ? "text-white" : "text-slate-900"}`}>
                  {isCustom ? "Custom" : `$${shown}`}
                </span>
                {!isCustom && (
                  <span className={`text-sm font-medium ${tier.highlight ? "text-brand-100" : "text-slate-400"}`}>/mo</span>
                )}
                <p className={`text-xs mt-1 ${tier.highlight ? "text-brand-100" : "text-slate-400"}`}>
                  {isCustom
                    ? "Tailored to your network"
                    : period === "annual"
                      ? `billed annually — $${(tier.annualMonthly as number) * 12}/yr`
                      : `or $${tier.annualMonthly}/mo billed annually`}
                </p>
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {tier.specs.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle size={14} className={`shrink-0 mt-0.5 ${tier.highlight ? "text-brand-200" : "text-brand-500"}`} />
                    <span className={tier.highlight ? "text-brand-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              {isCustom ? (
                <Link
                  href="/contact"
                  className="text-center py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50"
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
                      ? "bg-white text-brand-700 hover:bg-brand-50"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Start Free Trial <ArrowRight size={14} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-slate-400">
        Every plan includes assisted onboarding, a free built-in data import tool, and a full 30-day trial.
      </p>
    </>
  );
}
