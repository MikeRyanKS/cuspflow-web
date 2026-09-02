import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import BrowserFrame from "@/components/ui/BrowserFrame";
import { HeartPulse, Globe2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About CuspFlow | Dental Practice Management for Growing Clinics",
  description:
    "CuspFlow is dental practice management software built for clinics in Asia, South America and Africa. Learn who we build for and what we believe.",
  alternates: { canonical: "https://cuspflow.co/about" },
};

const values = [
  {
    icon: HeartPulse,
    title: "Built with clinicians, not just for them",
    body: "Every screen was shaped by talking to real dentists, nurses and receptionists about how their clinic actually runs on a busy day.",
  },
  {
    icon: Globe2,
    title: "Made for our markets",
    body: "Local currencies, tax settings, thermal and A4 receipts, and performance on slower connections are first-class, not afterthoughts.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is yours",
    body: "Every clinic is fully isolated, and you can export all of your data for free at any time. No lock-in, no hostage backups.",
  },
  {
    icon: Zap,
    title: "One product, every feature",
    body: "No feature gating. Every plan includes the whole platform and unlimited branches. Plans differ only by seats and storage.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-24">
        {/* Header */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-brand-50/40 to-brand-50/60">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4">About CuspFlow</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              Software for the clinics the big vendors overlook.
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              CuspFlow is a modern dental practice management platform built for clinics in Asia, South
              America and Africa. From a single chair to a multi-branch group, it keeps the whole clinic
              running in sync, from the moment a patient walks in to the moment they pay.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Why we built it</h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-500 leading-relaxed">
                <p>
                  Most dental software is priced and designed for large practices in North America and
                  Europe. Clinics across Asia, South America and Africa were left choosing between clunky
                  spreadsheets, paper files, and tools that never quite fit their currency, their receipts
                  or their connection.
                </p>
                <p>
                  CuspFlow was built to close that gap. It brings the live waiting room, treatment plans,
                  billing, inventory, staff and reporting into one place that a receptionist can learn in
                  an afternoon and an owner can trust with the numbers.
                </p>
                <p>
                  We keep it simple on purpose. One product, every feature, unlimited branches, and a free
                  built-in import tool so switching from your old system takes a day, not a quarter.
                </p>
              </div>
            </div>
            <div>
              <BrowserFrame
                src="/screenshots/dashboard.webp"
                alt="CuspFlow reception dashboard showing today's appointments, waiting room and checkout queue"
                url="app.cuspflow.co"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 md:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">What we believe</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The principles behind the product</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{v.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission strip */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our mission</h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              To give every dental clinic in our markets the same calm, connected, real-time control over
              their practice that the best-run clinics in the world take for granted, at a price that makes
              sense where they work.
            </p>
            <div className="mt-8">
              <Link
                href="https://app.cuspflow.co/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors text-sm"
              >
                Start your free trial
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
