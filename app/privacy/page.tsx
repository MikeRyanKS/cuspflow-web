import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CuspFlow Dental Practice Management",
  description:
    "How CuspFlow collects, uses and protects clinic and patient data for dental practices in Asia, South America and Africa.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="py-12 border-b border-slate-100 mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-400">Last updated: September 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Introduction</h2>
              <p>
                CuspFlow (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting the privacy of the dental
                clinics that use our platform and the patients those clinics serve. This Privacy Policy
                explains what information we collect, how we use it, and how we keep it safe when you use
                CuspFlow.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Who this applies to</h2>
              <p>
                CuspFlow is provided to dental clinics located in Asia, South America and Africa, and this
                policy applies to those clinics and their authorized staff. For patient records, the clinic
                is the party that decides what data is collected and why (the controller), and CuspFlow
                processes that data on the clinic&apos;s behalf (the processor). Patients with questions about
                their own records should contact their clinic directly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Data we collect</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Account data:</strong> name, email address, clinic name, country and contact information provided when signing up.</li>
                <li><strong>Patient data:</strong> records entered by clinic staff, which may include personal details, contact information, medical and dental history, treatment plans, images and billing information.</li>
                <li><strong>Billing data:</strong> subscription and payment details, handled by our payment processor. We do not store full card numbers.</li>
                <li><strong>Usage data:</strong> logs of how the platform is used, for security, troubleshooting and improving the service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. How we use data</h2>
              <p>
                We use data only to provide and improve the CuspFlow service: to operate the platform,
                authenticate users, process subscriptions, provide support, keep the service secure, and
                develop new features. We do not sell or rent your data, and we do not share patient data
                with third parties for their own marketing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Service providers</h2>
              <p>
                We rely on a small number of trusted providers to run CuspFlow, including cloud hosting and
                database infrastructure and a payment processor. These providers process data only on our
                instructions and under confidentiality obligations, solely to deliver their part of the
                service. We do not use patient data to train third-party advertising or profiling systems.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Data security</h2>
              <p>
                All data is encrypted in transit (TLS) and at rest. Each clinic&apos;s data is logically
                isolated using row-level security policies, so access to any clinic&apos;s data requires
                authenticated credentials scoped to that clinic. Access within a clinic is further governed
                by staff roles and permissions that the clinic controls. Each login is limited to a small
                number of simultaneously active devices.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Data retention</h2>
              <p>
                Clinic data is retained for the duration of the subscription. If a subscription lapses or
                is cancelled, the clinic enters a 60-day view-only window during which all records remain
                readable and can be exported in full at any time. If the subscription is not reactivated
                within that window, the clinic&apos;s data is permanently deleted.
              </p>
              <p className="mt-3">
                Individual records that clinic staff delete within the platform (for example a patient,
                appointment or catalogue item) are removed from active use immediately and kept in a
                recoverable state for 30 days, during which the clinic can restore them. After that period
                they are moved to archival storage and are eventually erased in line with the
                record-keeping requirements that apply in the clinic&apos;s country. This per-record process
                is separate from, and additional to, the clinic-wide deletion described above.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">8. Patient and minor data</h2>
              <p>
                Dental records often include minors and sensitive health information. Clinics are
                responsible for collecting any consent required under the laws of their country before
                entering such data, and for handling it in line with those laws. CuspFlow provides the
                security, access controls and deletion tools that let clinics meet those obligations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">9. Your choices and rights</h2>
              <p>
                Clinics can access, correct, export and delete the data they hold in CuspFlow directly
                within the platform, and can request account closure at any time. Patients who wish to
                access, correct or delete their records should contact their clinic, which can act on the
                request using the tools we provide. Where local law grants additional rights, we will
                support clinics in meeting them.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">10. Cookies</h2>
              <p>
                We use only the cookies and local storage needed to keep you signed in and to remember
                basic preferences. We do not use third-party advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">11. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. When we make material changes, we will update
                the date above and, where appropriate, notify clinics through the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">12. Contact</h2>
              <p>
                For privacy-related questions, contact us at{" "}
                <a href="mailto:privacy@cuspflow.co" className="text-brand-600 hover:underline">
                  privacy@cuspflow.co
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
