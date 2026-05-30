import {
  MonitorDot,
  ClipboardList,
  Receipt,
  FlaskConical,
  Building2,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: MonitorDot,
    title: "Live Waiting Room",
    description: "Real-time patient status from check-in to discharge. Every chair, every status, one screen — visible to the whole team instantly.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: ClipboardList,
    title: "Visual Treatment Plans",
    description: "FDI tooth chart, procedures, prescriptions, and lab cases in a single linked view. No more hunting across systems.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Receipt,
    title: "Smart Billing",
    description: "Auto-generated invoices from treatment items. Track payments, installments, and outstanding balances — all in one place.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: FlaskConical,
    title: "Lab Case Tracking",
    description: "Send, track, and receive lab work from partner laboratories. Lab costs roll up into the patient bill automatically.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Building2,
    title: "Multi-Branch Management",
    description: "One account for all your locations. Staff, inventory, and financials stay properly isolated per branch.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Globe,
    title: "Patient Portal",
    description: "Online appointment booking and digital intake forms reduce front-desk load before the patient even arrives.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-14 md:py-24 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
            Everything you need
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            One platform. The whole picture.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            CuspFlow replaces the patchwork of spreadsheets, WhatsApp groups, and paper records with a single, real-time system your whole team can trust.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5 ${f.color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1.5 leading-snug">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
