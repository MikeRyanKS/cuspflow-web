import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — CuspFlow",
  description: "CuspFlow's terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="py-12 border-b border-slate-100 mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-slate-400">Last updated: May 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Acceptance</h2>
              <p>
                By accessing or using CuspFlow, you agree to be bound by these Terms of Service. If you are
                using CuspFlow on behalf of a clinic or organization, you represent that you have authority
                to bind that entity to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Service Description</h2>
              <p>
                CuspFlow is a cloud-based dental practice management platform. We provide tools for patient
                management, appointment scheduling, treatment planning, billing, and related workflows.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Clinic Responsibilities</h2>
              <p>Clinics using CuspFlow are responsible for:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Maintaining the confidentiality of login credentials</li>
                <li>Ensuring that patient data entered into the platform complies with applicable privacy and health regulations</li>
                <li>Keeping contact and billing information up to date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Prohibited Use</h2>
              <p>You may not use CuspFlow to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Store data unrelated to dental practice management</li>
                <li>Attempt to access another clinic&apos;s data</li>
                <li>Reverse-engineer or resell the platform</li>
                <li>Violate any applicable law or regulation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Availability</h2>
              <p>
                We aim for 99.9% uptime but do not guarantee uninterrupted availability. Scheduled maintenance
                windows will be communicated in advance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Termination</h2>
              <p>
                Either party may terminate the service agreement with 30 days written notice. Upon termination,
                clinic data is retained for 90 days for export, then permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Contact</h2>
              <p>
                For questions about these terms, contact us at{" "}
                <a href="mailto:legal@cuspflow.co" className="text-teal-600 hover:underline">
                  legal@cuspflow.co
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
