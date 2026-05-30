const testimonials = [
  {
    quote: "We used to spend the first 20 minutes of every morning figuring out who was where. With CuspFlow, the receptionist just opens the waiting room screen and everything is there.",
    name: "Dr. Hanan Al-Rashid",
    title: "Principal Dentist, Al-Rashid Dental Group",
    initials: "HR",
    color: "bg-teal-600",
  },
  {
    quote: "Lab cases used to fall through the cracks. Now every case is tracked, every cost is on the patient's bill, and my nurses always know the expected return date.",
    name: "Dr. Emeka Okonkwo",
    title: "Owner, Okonkwo Family Dentistry",
    initials: "EO",
    color: "bg-sky-600",
  },
  {
    quote: "Having the treatment plan, billing, and payments in one screen is a game-changer. Patients trust us more because we can show them exactly what they owe and why.",
    name: "Dr. Sara Mansour",
    title: "Co-founder, Smile Studio",
    initials: "SM",
    color: "bg-violet-600",
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 md:py-24 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
            What clinics say
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Trusted by dental teams
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
