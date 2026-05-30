import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import {
  MonitorDot,
  ClipboardList,
  Receipt,
  FlaskConical,
  Building2,
  Globe,
  UserRound,
  CalendarDays,
  Image,
  FileText,
  Stethoscope,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — CuspFlow",
  description:
    "A complete feature breakdown: waiting room, treatment plans, billing, lab cases, patient portal, and multi-branch management.",
};

const categories = [
  {
    name: "Patient Flow",
    icon: MonitorDot,
    color: "bg-teal-50 text-teal-600",
    features: [
      { title: "Live Waiting Room", desc: "Real-time patient status board. Every chair, every status visible from every screen in the clinic." },
      { title: "Patient Journey Tracking", desc: "Track every patient through Checked In → In Chair → Treatment Done → Ready to Pay → Checked Out." },
      { title: "Elapsed Time Alerts", desc: "See how long each patient has been at each stage. Spot bottlenecks before they become complaints." },
      { title: "Discharge Billing Gate", desc: "Patients can only be discharged after billing is reviewed — no patient walks out without a finalized invoice." },
    ],
  },
  {
    name: "Appointments",
    icon: CalendarDays,
    color: "bg-sky-50 text-sky-600",
    features: [
      { title: "Appointment Scheduling", desc: "Book, reschedule, and cancel appointments with dentist and chair assignment." },
      { title: "Online Booking via Patient Portal", desc: "Patients can request appointments online 24/7, reducing front-desk call volume." },
      { title: "Availability Management", desc: "Set clinic hours, chair availability, and dentist schedules per branch." },
      { title: "Multi-Chair Support", desc: "Manage multiple dental chairs across multiple rooms — all visible from the same calendar." },
    ],
  },
  {
    name: "Treatment Plans",
    icon: ClipboardList,
    color: "bg-violet-50 text-violet-600",
    features: [
      { title: "FDI Tooth Chart", desc: "Click-to-select teeth using the international FDI numbering system. No manual entry required." },
      { title: "Procedures & Prescriptions", desc: "Add procedures and prescriptions from your clinic catalog or create custom items." },
      { title: "X-ray Attachments", desc: "Upload and attach X-rays directly to the treatment plan for immediate reference." },
      { title: "Clinical Notes", desc: "Rich clinical notes per plan, per appointment. Full audit trail of who wrote what and when." },
      { title: "Plan Status Workflow", desc: "Plans flow through Draft → Active → Completed → Billed. Every stage is timestamped." },
      { title: "Care Team Assignment", desc: "Assign multiple staff members to a treatment plan and track their roles." },
    ],
  },
  {
    name: "Billing & Payments",
    icon: Receipt,
    color: "bg-emerald-50 text-emerald-600",
    features: [
      { title: "Auto-Generated Invoices", desc: "Invoice created automatically when a treatment plan is finalized. Zero double-entry." },
      { title: "Installment Plans", desc: "Split a patient's balance across multiple payment dates. Track every installment automatically." },
      { title: "Multiple Payment Methods", desc: "Cash, card, bank transfer, insurance claims — all recorded and attributed to the correct patient." },
      { title: "Real-Time Balance Tracking", desc: "Know exactly what every patient owes at any moment. No more end-of-day reconciliation surprises." },
      { title: "Discount Management", desc: "Apply percentage or fixed discounts at the line-item or invoice level." },
      { title: "Payment History", desc: "Complete payment history per patient — filterable by date, method, and branch." },
    ],
  },
  {
    name: "Lab Cases",
    icon: FlaskConical,
    color: "bg-amber-50 text-amber-600",
    features: [
      { title: "Lab Case Management", desc: "Create, track, and receive lab work from partner laboratories. Every case has an expected return date." },
      { title: "Status Tracking", desc: "Draft → Sent → In Production → Received → Fitted. Every transition is timestamped." },
      { title: "Cost Roll-Up", desc: "Lab costs automatically appear as line items on the patient's treatment plan and invoice." },
      { title: "Multiple Laboratories", desc: "Manage relationships with multiple labs per branch. Add transport and other costs per case." },
      { title: "FDI Tooth Linking", desc: "Link lab cases to specific teeth — updates the treatment plan's tooth chart automatically." },
    ],
  },
  {
    name: "Patient Management",
    icon: UserRound,
    color: "bg-rose-50 text-rose-600",
    features: [
      { title: "Patient Records", desc: "Complete patient profiles: personal details, medical history, allergies, current medications, and emergency contacts." },
      { title: "Family Groups", desc: "Link patients into family units for easier billing and appointment management." },
      { title: "Insurance Information", desc: "Store insurance provider, policy number, and claim references per patient." },
      { title: "Custom Fields", desc: "Add clinic-specific fields to patient records, appointments, and treatment plans." },
      { title: "Patient Portal Access", desc: "Grant patients a secure login to view their records, book appointments, and sign digital forms." },
    ],
  },
  {
    name: "Digital Forms",
    icon: FileText,
    color: "bg-indigo-50 text-indigo-600",
    features: [
      { title: "Digital Consent Forms", desc: "Patients sign consent forms digitally — from the clinic or via the patient portal before their visit." },
      { title: "Medical History Forms", desc: "Structured medical history collection with full audit trail." },
      { title: "Form History", desc: "All signed forms are stored against the patient record and treatment plan." },
    ],
  },
  {
    name: "Multi-Branch",
    icon: Building2,
    color: "bg-cyan-50 text-cyan-600",
    features: [
      { title: "Branch Isolation", desc: "Every branch's patients, staff, and financials are completely isolated. No cross-contamination." },
      { title: "Group-Level Reporting", desc: "Roll up financial and operational data across all branches for group-level insights." },
      { title: "Staff Assignments", desc: "Assign staff to specific branches. A dentist can work across multiple locations." },
      { title: "Per-Branch Availability", desc: "Set different opening hours, chair counts, and appointment slots per branch." },
    ],
  },
  {
    name: "Analytics & Reports",
    icon: BarChart3,
    color: "bg-orange-50 text-orange-600",
    features: [
      { title: "Revenue Reports", desc: "Total revenue, collected payments, outstanding balances — filterable by branch, date range, and dentist." },
      { title: "Patient Reports", desc: "New patients, returning patients, appointment completion rates." },
      { title: "Lab Case Reports", desc: "Pending lab cases, average turnaround time, lab costs vs. patient charges." },
      { title: "Staff Performance", desc: "Appointments, treatments, and revenue attributable to each dentist or staff member." },
    ],
  },
  {
    name: "Inventory",
    icon: Stethoscope,
    color: "bg-lime-50 text-lime-600",
    features: [
      { title: "Procedure Catalog", desc: "Maintain a global catalog of procedures with standard pricing. Override pricing per treatment item." },
      { title: "Prescription Catalog", desc: "Standard dosages and pricing for prescriptions. Dosage can be overridden per prescription item." },
    ],
  },
  {
    name: "Portal & Access",
    icon: Globe,
    color: "bg-fuchsia-50 text-fuchsia-600",
    features: [
      { title: "Patient Portal", desc: "A branded patient-facing portal for appointment booking, form signing, and record access." },
      { title: "Role-Based Access", desc: "Owner, Dentist, Nurse, Receptionist — each role sees exactly what they need, nothing more." },
      { title: "Secure Authentication", desc: "Staff log in with clinic-scoped credentials. Every action is tied to an authenticated user." },
    ],
  },
  {
    name: "X-rays & Imaging",
    icon: Image,
    color: "bg-teal-50 text-teal-700",
    features: [
      { title: "X-ray Uploads", desc: "Upload X-rays (JPEG, PNG, DICOM) directly to a treatment plan. Tagged by tooth number." },
      { title: "Notes on Images", desc: "Add clinical notes to each X-ray for fast reference during consultations." },
      { title: "Secure Storage", desc: "All images are stored securely in the cloud. No local file management required." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-24">
        {/* Header */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-sky-50/40 to-teal-50/60">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">Features</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              Everything your clinic needs, nothing it doesn&apos;t.
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              CuspFlow is purpose-built for dental practices. Every feature was designed by talking to
              real dentists, nurses, and receptionists about how their clinics actually work.
            </p>
          </div>
        </section>

        {/* Feature categories */}
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 space-y-12 md:space-y-16">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.name}>
                  <div className="flex items-center gap-3 mb-5 sm:mb-7">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                      <Icon size={16} />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">{cat.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {cat.features.map((f) => (
                      <div key={f.title} className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100">
                        <p className="text-sm font-semibold text-slate-900 mb-1.5">{f.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
