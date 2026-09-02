import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PainPoints from "@/components/sections/PainPoints";
import FeatureGrid from "@/components/sections/FeatureGrid";
import DeepDive from "@/components/sections/DeepDive";
import MultiBranchCallout from "@/components/sections/MultiBranchCallout";
import Testimonials from "@/components/sections/Testimonials";
import PricingPreview from "@/components/sections/PricingPreview";
import FinalCTA from "@/components/sections/FinalCTA";

/* ── Waiting Room Visual ─────────────────────────────────────────────────── */
function WaitingRoomVisual() {
  const patients = [
    { name: "Amira K.", status: "In Chair", elapsed: "42 min", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700" },
    { name: "James O.", status: "Ready to Pay", elapsed: "28 min", dot: "bg-green-400", badge: "bg-green-50 text-green-700" },
    { name: "Lena M.", status: "Checked In", elapsed: "4 min", dot: "bg-slate-300", badge: "bg-slate-50 text-slate-600" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-brand-600 px-5 py-4">
        <p className="text-white font-semibold text-sm">Live Waiting Room</p>
        <p className="text-brand-200 text-xs mt-0.5">Main Branch · 3 patients active</p>
      </div>
      <div className="px-5 pt-4 pb-2 border-b border-slate-100">
        <p className="text-xs text-slate-400 mb-2 font-medium">Patient journey stages</p>
        <div className="flex gap-1.5 flex-wrap">
          {["Checked In", "In Chair", "Treatment Done", "Ready to Pay"].map((s, i) => (
            <span key={s} className={`text-xs font-medium rounded-full px-2.5 py-1 ${i === 1 ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-500"}`}>{s}</span>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-2 bg-slate-50/60">
        {patients.map((p) => (
          <div key={p.name} className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${p.dot}`} />
              <div>
                <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-400">{p.elapsed} elapsed</p>
              </div>
            </div>
            <span className={`text-xs font-medium rounded-full px-2.5 py-0.5 border ${p.badge} border-current/20`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Treatment Plan Visual ───────────────────────────────────────────────── */
function TreatmentPlanVisual() {
  const rows = [
    [18, 17, 16, 15, 14, 13, 12, 11],
    [21, 22, 23, 24, 25, 26, 27, 28],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [41, 42, 43, 44, 45, 46, 47, 48],
  ];
  const highlighted = new Set([16, 17, 26]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Treatment Plan</p>
          <p className="text-xs text-slate-400">Amira Khalil · FDI: 16, 17, 26</p>
        </div>
        <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1">Active</span>
      </div>
      <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100">
        <p className="text-xs text-slate-400 mb-3 font-medium">FDI Tooth Chart</p>
        <div className="space-y-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((t) => (
                <div key={t} className={`w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-medium border ${highlighted.has(t) ? "bg-brand-500 border-brand-600 text-white" : "bg-white border-slate-200 text-slate-500"}`}>
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        {[["Crown — Tooth 16", "AED 1,200"], ["Crown — Tooth 17", "AED 1,200"], ["Root Canal — Tooth 26", "AED 800"]].map(([n, p]) => (
          <div key={n} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 text-xs">
            <span className="text-slate-600">{n}</span>
            <span className="font-semibold text-slate-900">{p}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-3 mt-1">
          <span className="text-xs font-semibold text-slate-700">Total</span>
          <span className="text-sm font-bold text-brand-600">AED 3,200</span>
        </div>
      </div>
    </div>
  );
}

/* ── Billing Visual ──────────────────────────────────────────────────────── */
function BillingVisual() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Invoice #CF-2024-0847</p>
          <p className="text-xs text-slate-400">Amira Khalil · 15 May 2024</p>
        </div>
        <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1">Partial</span>
      </div>
      <div className="px-5 py-3 border-b border-slate-100 space-y-2">
        {[["Crown — Tooth 16", "AED 1,200"], ["Crown — Tooth 17", "AED 1,200"], ["Root Canal — Tooth 26", "AED 800"]].map(([l, v]) => (
          <div key={l} className="flex justify-between text-xs">
            <span className="text-slate-500">{l}</span>
            <span className="text-slate-700 font-medium">{v}</span>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-b border-slate-100 space-y-1.5 bg-slate-50/60">
        {[["Subtotal", "AED 3,200", false], ["Discount (10%)", "−AED 320", false], ["Total Due", "AED 2,880", true]].map(([l, v, b]) => (
          <div key={l as string} className="flex justify-between text-xs">
            <span className={b ? "font-semibold text-slate-700" : "text-slate-400"}>{l}</span>
            <span className={b ? "font-bold text-slate-900" : "text-slate-500"}>{v}</span>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 space-y-2">
        <div className="flex justify-between text-xs"><span className="text-slate-400">Amount Paid</span><span className="text-green-600 font-medium">AED 1,440</span></div>
        <div className="flex justify-between text-xs"><span className="font-semibold text-slate-700">Balance Due</span><span className="font-bold text-rose-600">AED 1,440</span></div>
        <div className="flex gap-2 pt-2">
          <button className="flex-1 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold">Pay Remaining</button>
          <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium">Installment Plan</button>
        </div>
      </div>
    </div>
  );
}

/* ── Data Import Visual ──────────────────────────────────────────────────── */
function DataImportVisual() {
  const mappings = [
    ["First Name", "first_name", "ok"],
    ["Mobile", "phone", "ok"],
    ["DOB", "date_of_birth", "ok"],
    ["Notes", "— skip —", "skip"],
  ] as const;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Import patients</p>
          <p className="text-xs text-slate-400">patients-export.csv · 486 rows</p>
        </div>
        <span className="text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 rounded-full px-2.5 py-1">Step 2 of 4</span>
      </div>
      <div className="px-5 py-4 bg-slate-50/60 border-b border-slate-100">
        <p className="text-xs text-slate-400 mb-3 font-medium">Column mapping (auto-detected)</p>
        <div className="space-y-1.5">
          {mappings.map(([from, to, state]) => (
            <div key={from} className="flex items-center gap-2 text-xs">
              <span className="flex-1 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-600 truncate">{from}</span>
              <span className="text-slate-300">→</span>
              <span className={`flex-1 rounded-md px-2.5 py-1.5 truncate border ${state === "skip" ? "bg-slate-50 border-slate-200 text-slate-400" : "bg-brand-50 border-brand-200 text-brand-700 font-medium"}`}>{to}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-400 mb-3 font-medium">Validation dry-run</p>
        <div className="grid grid-cols-3 gap-2">
          {[["482", "Valid", "text-green-600 bg-green-50"], ["3", "Warnings", "text-amber-600 bg-amber-50"], ["1", "Error", "text-rose-600 bg-rose-50"]].map(([n, l, c]) => (
            <div key={l} className={`rounded-xl px-3 py-2.5 text-center ${c.split(" ")[1]}`}>
              <p className={`text-lg font-bold ${c.split(" ")[0]}`}>{n}</p>
              <p className="text-[11px] text-slate-500">{l}</p>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold">Import 482 patients</button>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <PainPoints />
        <FeatureGrid />

        <DeepDive
          badge="Waiting Room"
          headline="Every patient. Every chair. One screen."
          description="Stop chasing status updates across hallways. CuspFlow's live waiting room gives every team member a real-time view of where every patient is in their journey, from check-in to checkout."
          bullets={[
            "Color-coded patient cards update in real time as staff change statuses",
            "Elapsed time on every card — spot delays before they become complaints",
            "Drill into any patient to open their plan, X-rays, or billing",
            "Works across all chairs and branches simultaneously",
          ]}
          visual={<WaitingRoomVisual />}
        />

        <DeepDive
          badge="Treatment Plans"
          headline="Every tooth, every procedure, perfectly linked."
          description="Treatment plans in CuspFlow use the FDI tooth chart so dentists can pinpoint exactly which teeth are being treated. Procedures, prescriptions, X-rays, and lab cases all live on the same plan — and roll automatically into the patient's bill."
          bullets={[
            "FDI tooth chart with click-to-select teeth — no manual number entry",
            "Procedures, prescriptions, and lab cases on one unified view",
            "X-rays attached directly to the plan for immediate reference",
            "Plan status flows from Draft → Active → Completed → Billed",
          ]}
          visual={<TreatmentPlanVisual />}
          reversed
        />

        <DeepDive
          badge="Billing & Payments"
          headline="From treatment done to invoice sent — automatically."
          description="The moment a dentist finalizes a treatment plan, CuspFlow generates the invoice. No double-entry, no forgotten line items. Track payments, partial payments, and installment plans — and know exactly what every patient owes."
          bullets={[
            "Invoice auto-generated from treatment items on plan finalization",
            "Supports cash, card, insurance, and installment plans",
            "Real-time balance tracking — always know what's outstanding",
            "Full payment history per patient, per visit, per branch",
          ]}
          visual={<BillingVisual />}
        />

        <DeepDive
          badge="Switch in a day"
          headline="Bring your data across yourself — for free."
          description="Moving from another system shouldn't cost you weeks or a migration fee. CuspFlow's free, built-in data import tool lets your team bring patients, appointments, staff and inventory across from a spreadsheet — with column auto-mapping and a validation dry-run that catches problems before anything is saved."
          bullets={[
            "Imports patients, appointments, families, staff, chairs and inventory",
            "Column auto-mapping — CuspFlow guesses the fields, you confirm",
            "Validation dry-run flags every warning and error, row by row, before import",
            "Assisted onboarding if you want a hand — but the tool is yours, free, any time",
          ]}
          visual={<DataImportVisual />}
          reversed
        />

        <MultiBranchCallout />
        <Testimonials />
        <PricingPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
