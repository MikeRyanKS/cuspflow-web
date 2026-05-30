const stats = [
  { value: "100%", label: "Web-based — no installs" },
  { value: "Real-time", label: "Live patient status updates" },
  { value: "Multi-branch", label: "All locations, one login" },
  { value: "Secure", label: "Encrypted data, isolated per clinic" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6 md:mb-8">
          Built for dental teams that take quality seriously
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-2">
              <p className="text-xl sm:text-2xl font-bold text-teal-600 mb-1">{s.value}</p>
              <p className="text-xs text-slate-500 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
