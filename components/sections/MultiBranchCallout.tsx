import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function MultiBranchCallout() {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-teal-600 to-sky-600">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 mb-5 sm:mb-6">
          <Building2 size={24} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          One Group, One Dashboard
        </h2>
        <p className="text-teal-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Managing two locations shouldn&apos;t mean double the admin. CuspFlow unifies your branches
          while keeping each clinic&apos;s data private, compliant, and completely separate.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-teal-700 font-semibold hover:bg-teal-50 transition-colors shadow-lg text-sm"
          >
            Talk to Us About Your Group
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/features"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Learn more about multi-branch
          </Link>
        </div>
      </div>
    </section>
  );
}
