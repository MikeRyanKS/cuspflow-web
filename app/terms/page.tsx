import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | CuspFlow Dental Practice Management",
  description:
    "The terms of service for CuspFlow, the dental practice management platform for clinics in Asia, South America and Africa.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="py-12 border-b border-slate-100 mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-slate-400">Last updated: September 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Acceptance</h2>
              <p>
                By accessing or using CuspFlow, you agree to be bound by these Terms of Service. If you
                are using CuspFlow on behalf of a clinic or organization, you represent that you have the
                authority to bind that entity to these terms. If you do not agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Eligibility and geographic availability</h2>
              <p>
                CuspFlow is offered exclusively to dental clinics located and operating in Asia, South
                America and Africa. The service is built for the currencies, tax settings, print formats
                and connectivity conditions common to clinics in these regions, from single-chair
                practices to multi-branch groups.
              </p>
              <p className="mt-3">
                CuspFlow is <strong>not</strong> offered to, and may not be used by, clinics located in
                Europe, the United States or Canada. We do not market the service in these regions and do
                not intend it for use there. By signing up, you confirm that your clinic operates in a
                supported region. We may suspend or terminate any account that does not meet this
                eligibility requirement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Service description</h2>
              <p>
                CuspFlow is a cloud-based dental practice management platform. It provides tools for
                patient records, appointment scheduling, a live waiting room, treatment planning, billing
                and payments, insurance claims, lab cases, inventory, staff and payroll, analytics, and
                related clinic workflows. Features may be added, changed or removed over time as the
                product evolves.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Accounts and security</h2>
              <p>
                Each clinic is provisioned as an isolated tenant. You are responsible for maintaining the
                confidentiality of every login, for all activity that occurs under your accounts, and for
                promptly notifying us of any unauthorized use. Each login is limited to a small number of
                simultaneously active devices. You must provide accurate account information and keep it
                up to date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Subscriptions, trials and fees</h2>
              <p>
                New clinics start with a 30-day free trial that includes every feature. No card is
                required to begin the trial. After the trial, continued use requires a paid subscription.
                Plans differ only by the number of staff seats and the amount of imaging storage included;
                every plan includes every feature and unlimited branches. Additional seats and storage can
                be added at any time and are billed as add-ons.
              </p>
              <p className="mt-3">
                Subscriptions may be billed monthly or annually and renew automatically until cancelled.
                Upgrades take effect immediately and are prorated; downgrades take effect at the next
                renewal. Fees are exclusive of any local taxes that may apply. Payments are handled by our
                third-party payment processor.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Clinic responsibilities</h2>
              <p>Clinics using CuspFlow are responsible for:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Maintaining the confidentiality of login credentials and managing staff access appropriately</li>
                <li>Obtaining any patient consent required to record and process patient information</li>
                <li>Ensuring that patient data entered into the platform complies with the privacy, health and record-keeping laws that apply in the clinic&apos;s own country</li>
                <li>The accuracy of the clinical, financial and patient data entered by their staff</li>
                <li>Keeping contact and billing information current</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Acceptable use</h2>
              <p>You may not use CuspFlow to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Store data unrelated to dental practice management</li>
                <li>Access, or attempt to access, another clinic&apos;s data</li>
                <li>Reverse-engineer, copy, resell or sublicense the platform</li>
                <li>Interfere with or disrupt the integrity or performance of the service</li>
                <li>Violate any law or regulation that applies to you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">8. Data ownership and export</h2>
              <p>
                Your clinic&apos;s data belongs to your clinic. We claim no ownership over the patient,
                clinical or financial records you enter. You can export your complete clinic data at any
                time, free of charge, in a portable format. We act as a processor of that data on your
                behalf and use it only to provide and improve the service, as described in our Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">9. Intellectual property</h2>
              <p>
                CuspFlow, including its software, design, trademarks and documentation, is and remains our
                property. These terms grant you a limited, non-exclusive, non-transferable right to use the
                service during your subscription. No other rights are granted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">10. Availability and support</h2>
              <p>
                We aim for high availability but do not guarantee that the service will be uninterrupted or
                error-free. Planned maintenance will be communicated in advance where practical. Support is
                provided by email and through the in-app help centre.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">11. Disclaimers and limitation of liability</h2>
              <p>
                CuspFlow is a record-keeping and workflow tool. It does not provide clinical, medical,
                legal, tax or accounting advice, and it is not a substitute for professional judgment. The
                service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any
                kind, to the fullest extent permitted by law. To the extent permitted by law, our total
                liability arising out of or relating to the service is limited to the fees you paid for the
                service in the twelve months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">12. Termination and data deletion</h2>
              <p>
                Either party may end the subscription at any time. Upon cancellation or lapse of the
                subscription, the clinic enters a 60-day view-only window during which its data remains
                readable and can be exported in full. If the subscription is not reactivated within that
                window, the clinic&apos;s data is permanently deleted. We may suspend or terminate accounts
                that breach these terms or the eligibility requirement in section 2.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">13. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. When we make material changes, we will update
                the date above and, where appropriate, notify clinics through the platform. Continued use
                after a change takes effect constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">14. Contact</h2>
              <p>
                For questions about these terms, contact us at{" "}
                <a href="mailto:legal@cuspflow.co" className="text-brand-600 hover:underline">
                  legal@cuspflow.co
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
