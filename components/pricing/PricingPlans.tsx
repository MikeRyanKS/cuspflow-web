"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

type Tier = {
  name: string;
  /** Monthly rate in USD. null = custom/enterprise. */
  monthly: number | null;
  /**
   * TOTAL charged once a year, not the per-month equivalent. The per-month
   * figure on the card is derived from this, never multiplied back out of it:
   * the annual prices don't divide evenly into twelve ($560/yr is $46.67/mo,
   * and 46.67 x 12 is $560.04), so deriving the yearly total from a rounded
   * monthly rate quoted a price we don't actually charge.
   */
  annualTotal: number | null;
  tagline: string;
  highlight: boolean;
  badge: string | null;
  specs: string[];
};

const tiers: Tier[] = [
  {
    name: "Starter",
    monthly: 26.9,
    annualTotal: 297,
    tagline: "For a clinic just getting started.",
    highlight: false,
    badge: null,
    specs: ["Up to 7 staff seats", "15 GB imaging storage", "Unlimited branches"],
  },
  {
    name: "Growth",
    monthly: 54.9,
    annualTotal: 560,
    tagline: "For established clinics ready to scale their operations.",
    highlight: true,
    badge: "Most popular",
    specs: ["Up to 20 staff seats", "50 GB imaging storage", "Unlimited branches"],
  },
  {
    name: "Clinic Pro",
    monthly: 99.9,
    annualTotal: 960,
    tagline: "For busy, high-volume practices and small groups.",
    highlight: false,
    badge: null,
    specs: ["Up to 45 staff seats", "120 GB imaging storage", "Unlimited branches"],
  },
  {
    name: "Enterprise",
    monthly: null,
    annualTotal: null,
    tagline: "For dental groups running large networks of clinics.",
    highlight: false,
    badge: null,
    specs: [
      "45+ staff seats",
      "Custom storage",
      "Unlimited branches",
      "Dedicated account manager & assisted onboarding",
    ],
  },
];

/** Prices now carry cents, so every figure is shown to two decimals. */
const money = (n: number) => n.toFixed(2);

/** Per-month equivalent of the annual plan. */
const annualMonthly = (tier: Tier) =>
  tier.annualTotal === null ? null : tier.annualTotal / 12;

/**
 * Annual saving against twelve monthly payments. This is no longer one number
 * for the whole table: it is ~8% on Starter, 15% on Growth and ~20% on Clinic
 * Pro. Each card states its own, and the switcher says "up to", which stays
 * truthful because 20% is the real saving on the top paid plan.
 */
const annualSavingPct = (tier: Tier) =>
  tier.monthly === null || tier.annualTotal === null
    ? null
    : Math.round((1 - tier.annualTotal / (tier.monthly * 12)) * 100);

const maxAnnualSavingPct = Math.max(
  ...tiers.map((t) => annualSavingPct(t) ?? 0),
);

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
                    Save up to {maxAnnualSavingPct}%
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
          const perMonthAnnual = annualMonthly(tier);
          const shown = period === "annual" ? perMonthAnnual : tier.monthly;
          const savingPct = annualSavingPct(tier);
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
                  {isCustom ? "Custom" : `$${money(shown as number)}`}
                </span>
                {!isCustom && (
                  <span className={`text-sm font-medium ${tier.highlight ? "text-brand-100" : "text-slate-400"}`}>/mo</span>
                )}
                <p className={`text-xs mt-1 ${tier.highlight ? "text-brand-100" : "text-slate-400"}`}>
                  {isCustom
                    ? "Tailored to your network"
                    : period === "annual"
                      ? `billed annually, $${money(tier.annualTotal as number)}/yr · save ${savingPct}%`
                      : `or $${money(perMonthAnnual as number)}/mo billed annually`}
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
