import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import BrowserFrame from "../ui/BrowserFrame";

const bullets = [
  "Live waiting room, every chair and every status",
  "Treatment plans linked to billing automatically",
  "Multi-branch, one login",
  "Free built-in data import, switch systems in a day",
];

const mobilePatients = [
  { name: "Amira K. · In Chair · 42 min", dot: "bg-amber-400", badge: "bg-amber-50 border-amber-200 text-amber-700" },
  { name: "James O. · Ready to Pay", dot: "bg-green-400", badge: "bg-green-50 border-green-200 text-green-700" },
  { name: "Lena M. · Waiting · 8 min", dot: "bg-slate-300", badge: "bg-slate-50 border-slate-200 text-slate-600" },
];

export default function Hero() {
  return (
    <section className="relative flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-brand-50/20 -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-100/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand-100/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16 md:py-20 w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-3 py-1 text-xs font-medium text-brand-700 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Now accepting early-access clinics
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
            Your Clinic,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">
              Running in Perfect Sync
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-6 max-w-lg">
            CuspFlow gives every dentist, nurse, and receptionist a real-time view of every
            patient, from the moment they walk in to the moment they pay. No spreadsheets, no
            sticky notes, no chaos.
          </p>

          {/* Mobile product teaser, visible below lg */}
          <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
            {mobilePatients.map((p) => (
              <span key={p.name} className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-xs font-medium ${p.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`} />
                {p.name}
              </span>
            ))}
          </div>

          <ul className="space-y-2 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-slate-600">
                <CheckCircle size={15} className="text-brand-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="https://app.cuspflow.co/signup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20 text-sm">
              Start Free Trial <ArrowRight size={15} />
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm">
              See Features
            </Link>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            30-day free trial · no credit card required · every feature included
          </p>
        </div>

        <div className="hidden lg:block">
          <BrowserFrame
            src="/screenshots/waiting-room.webp"
            alt="CuspFlow live waiting room board showing patients across Waiting, In Treatment and Billing columns"
            url="app.cuspflow.co/waiting-room"
            priority
          />
        </div>
      </div>
    </section>
  );
}
