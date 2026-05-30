import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-6">
          <Calendar size={24} className="text-teal-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight">
          Ready to transform your practice?
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
          Start your free trial today and see CuspFlow running with your clinic&apos;s actual workflow.
          No credit card required — up and running in minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="https://app.cuspflow.co/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/25 text-sm"
          >
            Start Free Trial
            <ArrowRight size={15} />
          </Link>
          <Link href="/features" className="text-sm text-slate-400 hover:text-white transition-colors">
            Explore all features
          </Link>
        </div>
      </div>
    </section>
  );
}
