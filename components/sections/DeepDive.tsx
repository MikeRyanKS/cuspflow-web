import { CheckCircle } from "lucide-react";
import type { ReactNode } from "react";

interface DeepDiveProps {
  badge: string;
  headline: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reversed?: boolean;
}

export default function DeepDive({
  badge,
  headline,
  description,
  bullets,
  visual,
  reversed = false,
}: DeepDiveProps) {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/*
          Mobile: always copy first, visual second (flex-col = DOM order).
          Desktop: reversed flips to visual | copy via flex-row-reverse.
        */}
        <div
          className={`flex flex-col gap-10 md:gap-14 lg:items-center ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* Copy — always first in DOM → always on top on mobile */}
          <div className="lg:flex-1">
            <p className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3 sm:mb-4">
              {badge}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4 sm:mb-5">
              {headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6 sm:mb-7">{description}</p>
            <ul className="space-y-2.5 sm:space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle size={15} className="text-teal-500 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual — always second in DOM → always below on mobile */}
          <div className="lg:flex-1">{visual}</div>
        </div>
      </div>
    </section>
  );
}
