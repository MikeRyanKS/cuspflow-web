import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — CuspFlow",
  description: "CuspFlow's privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="py-12 border-b border-slate-100 mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-400">Last updated: May 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Introduction</h2>
              <p>
                CuspFlow (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting the privacy of dental clinics and
                their patients. This Privacy Policy explains how we collect, use, and safeguard information
                when you use the CuspFlow platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Data We Collect</h2>
              <p>We collect the following categories of data:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Account data:</strong> Name, email address, clinic name, and contact information provided when signing up.</li>
                <li><strong>Patient data:</strong> Patient records entered by clinic staff, including personal details, medical history, and treatment information.</li>
                <li><strong>Usage data:</strong> Anonymized logs of how the platform is used, for the purpose of improving the service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. How We Use Data</h2>
              <p>We use your data solely to provide and improve the CuspFlow service. We do not sell, rent, or share patient data with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Data Security</h2>
              <p>
                All data is encrypted in transit (TLS) and at rest. Each clinic&apos;s data is logically isolated using
                row-level security policies. Access to any clinic&apos;s data requires authenticated credentials scoped
                to that clinic.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Data Retention</h2>
              <p>
                Clinic data is retained for the duration of the subscription and for 90 days after cancellation,
                during which time clinics can export their full data. After this window, data is permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Contact</h2>
              <p>
                For privacy-related questions, contact us at{" "}
                <a href="mailto:privacy@cuspflow.co" className="text-teal-600 hover:underline">
                  privacy@cuspflow.co
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
