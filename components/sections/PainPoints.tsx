const pains = [
  {
    quote: '"Where is the patient?"',
    body: "Receptionists call nurses. Nurses walk to the chair. Nobody knows without asking. CuspFlow's live waiting room ends the guessing — every status visible from every screen.",
    icon: "🗂",
  },
  {
    quote: '"Which teeth did we treat?"',
    body: "Scattered paper records, photos on personal phones, X-rays in a folder no one can find. CuspFlow links every treatment plan, X-ray, and lab case directly to the tooth.",
    icon: "🦷",
  },
  {
    quote: '"Did they actually pay?"',
    body: "Billing lives in a spreadsheet. The receptionist checks it manually. CuspFlow auto-generates the invoice the moment the treatment plan is finalized — nothing slips through.",
    icon: "💳",
  },
];

export default function PainPoints() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
            Sound familiar?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Every dental clinic has the same headaches
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {pains.map((p) => (
            <div key={p.quote} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-3xl mb-4">{p.icon}</div>
              <p className="text-base font-semibold text-slate-900 mb-2.5 leading-snug">{p.quote}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
