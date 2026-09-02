import { Clock, FlaskConical, CreditCard } from "lucide-react";

/**
 * Honest "what CuspFlow fixes" section. This replaced a set of fabricated
 * customer testimonials: the product is in early access, so attributed quotes
 * from named dentists would have been misleading. When real, verifiable
 * customer quotes exist, they can be added here (with the customer's consent).
 */
const outcomes = [
  {
    icon: Clock,
    title: "The morning scramble, gone",
    body: "No more spending the first part of every day working out who is where. The receptionist opens the live waiting room and the whole clinic is on one screen.",
  },
  {
    icon: FlaskConical,
    title: "Nothing falls through the cracks",
    body: "Lab cases, follow-ups and balances are tracked, not remembered. Every case has an expected return date, and every cost lands on the patient's bill.",
  },
  {
    icon: CreditCard,
    title: "Treatment to payment on one screen",
    body: "The treatment plan, the invoice and the payment live together, so patients see exactly what they owe and why, and checkout is a confirmation, not a scramble.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 md:py-24 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Why clinics choose CuspFlow
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Built for the daily realities of a busy clinic
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {outcomes.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.title} className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{o.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{o.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
