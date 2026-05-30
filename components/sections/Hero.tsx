import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const bullets = [
  "Live waiting room — every chair, every status",
  "Treatment plans linked to billing automatically",
  "Multi-branch, one login",
];

const mobilePatients = [
  { name: "Amira K. · In Chair · 42 min", dot: "bg-amber-400", badge: "bg-amber-50 border-amber-200 text-amber-700" },
  { name: "James O. · Ready to Pay", dot: "bg-green-400", badge: "bg-green-50 border-green-200 text-green-700" },
  { name: "Lena M. · Waiting · 8 min", dot: "bg-slate-300", badge: "bg-slate-50 border-slate-200 text-slate-600" },
];

function WaitingRoomMockup() {
  const patients = [
    { name: "Amira Khalil", chair: "Chair 2", elapsed: "45 min", doctor: "Dr. Ahmad Al-Rashid", status: "In Chair", statusColor: "bg-amber-100 text-amber-700", dotColor: "bg-amber-400" },
    { name: "James Osei", chair: "Chair 1", elapsed: "28 min", doctor: "Dr. Sara Ibrahim", status: "Ready to Pay", statusColor: "bg-green-100 text-green-700", dotColor: "bg-green-400" },
    { name: "Lena Mahmoud", chair: "Waiting Area", elapsed: "8 min", doctor: "Appointment 11:30 AM", status: "Waiting", statusColor: "bg-slate-100 text-slate-600", dotColor: "bg-slate-400" },
    { name: "Tariq Al-Farsi", chair: "Chair 3", elapsed: "12 min", doctor: "Dr. Ahmad Al-Rashid", status: "In Chair", statusColor: "bg-amber-100 text-amber-700", dotColor: "bg-amber-400" },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
      <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
          app.cuspflow.co/waiting-room
        </div>
      </div>
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Live Waiting Room</p>
          <p className="text-xs text-slate-400">Main Branch · Updated just now</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">3 In Chair</span>
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5">1 Ready</span>
        </div>
      </div>
      <div className="p-3 space-y-2 bg-slate-50/50">
        {patients.map((p) => (
          <div key={p.name} className="bg-white rounded-xl border border-slate-100 px-3 py-2.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${p.dotColor} shrink-0`} />
              <div>
                <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-400">{p.chair} · {p.doctor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400">{p.elapsed}</span>
              <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${p.statusColor}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-teal-50/20 -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-100/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-sky-100/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16 md:py-20 w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 text-xs font-medium text-teal-700 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Now accepting early-access clinics
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
            Your Clinic,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-500">
              Running in Perfect Sync
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-6 max-w-lg">
            CuspFlow gives every dentist, nurse, and receptionist a real-time view of every patient —
            from the moment they walk in to the moment they pay. No spreadsheets. No sticky notes. No chaos.
          </p>

          {/* Mobile product teaser — visible below lg */}
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
                <CheckCircle size={15} className="text-teal-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="https://app.cuspflow.co/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 text-sm">
              Start Free Trial <ArrowRight size={15} />
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm">
              See Features
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <WaitingRoomMockup />
        </div>
      </div>
    </section>
  );
}
