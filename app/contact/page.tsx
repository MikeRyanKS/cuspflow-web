"use client";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const branchOptions = ["1 branch", "2–3 branches", "4–10 branches", "10+ branches"];

const benefits = [
  { icon: "🎯", title: "Tailored to your clinic", desc: "We'll set up the demo around your branch count, team size, and workflows." },
  { icon: "⚡", title: "Live product — no slides", desc: "You'll see the actual CuspFlow app, not a deck of screenshots." },
  { icon: "🔒", title: "No commitment", desc: "A demo is just a conversation. We'll answer every question you have." },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-24 min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-teal-50/40">
        <section className="py-10 sm:py-16">
          <div className="max-w-5xl mx-auto px-5 sm:px-6">

            {/* Page header */}
            <div className="mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">Contact</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
                Book a free demo
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg">
                See CuspFlow running with your clinic&apos;s actual workflow — 30 minutes, no sales pressure, no commitment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-start">
              {/* Benefits — shown above form on mobile, beside it on desktop */}
              <div className="order-2 md:order-1 space-y-5">
                {benefits.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    We typically reply within one business day. Prefer email?{" "}
                    <a href="mailto:hello@cuspflow.co" className="text-teal-600 hover:underline">hello@cuspflow.co</a>
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="order-1 md:order-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="flex justify-center mb-4">
                      <CheckCircle size={48} className="text-teal-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Message received!</h2>
                    <p className="text-slate-500 text-sm">
                      We&apos;ll be in touch within one business day to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                    <input type="hidden" name="subject" value="New CuspFlow Demo Request" />
                    <input type="hidden" name="from_name" value="CuspFlow Website" />
                    <input type="checkbox" name="botcheck" className="hidden" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Full name *</label>
                        <input
                          name="name"
                          required
                          placeholder="Dr. Sara Ibrahim"
                          className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Clinic name *</label>
                        <input
                          name="clinic_name"
                          required
                          placeholder="Smile Studio"
                          className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Email address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="sara@smilestudio.co"
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Phone number</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+971 50 123 4567"
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Number of branches</label>
                      <select
                        name="branches"
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 bg-white"
                      >
                        <option value="">Select…</option>
                        {branchOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Anything you&apos;d like us to know?</label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Current software, main pain points, specific features you're curious about…"
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors disabled:opacity-60"
                    >
                      {loading ? "Sending…" : <><Send size={14} /> Book My Demo</>}
                    </button>

                    <p className="text-xs text-slate-400 text-center">
                      We&apos;ll reply within one business day.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
