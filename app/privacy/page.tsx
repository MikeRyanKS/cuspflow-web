import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CuspFlow Dental Practice Management",
  description:
    "How CuspFlow collects, uses, shares and protects clinic and patient data for dental practices in Asia, South America and Africa.",
  alternates: { canonical: "https://cuspflow.co/privacy" },
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

          <div className="max-w-none text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <p className="text-slate-500">
                CuspFlow, operated by Keplify LLC, a Delaware limited liability company
                (&quot;Keplify&quot;, &quot;CuspFlow&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;),
                provides cloud dental practice management software to dental clinics in Asia, South America
                and Africa. This Privacy Policy explains what information we collect, how we use, share and
                protect it, and the choices available to clinics and their patients. It forms part of our{" "}
                <a href="/terms" className="text-brand-600 hover:underline">Terms of Service</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Our role: controller and processor</h2>
              <p>
                We handle personal information in two capacities:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>As a processor (or operator)</strong> for the clinic data your staff enter, including patient records. The clinic decides what is collected and why and is the controller, responsible party or data fiduciary under its local law; we process that data on the clinic&apos;s behalf and instructions to provide the Service. Patients who want to access, correct or delete their records should contact their clinic.</li>
                <li><strong>As a controller</strong> for the limited data we collect to run our business, such as the account and billing details of the clinic staff who sign up, and usage and security logs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Information we collect</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Account data:</strong> name, email address, password (stored only as a secure hash), clinic name, country, phone and role of the staff who register and use the Service.</li>
                <li><strong>Patient and clinical data</strong> entered by clinic staff, which may include patient names, contact details, date of birth, medical and dental history, allergies and medications, treatment plans and clinical notes, images and X-rays, appointments, lab cases, and consent or intake forms.</li>
                <li><strong>Billing data:</strong> subscription plan, seat and storage usage, invoices, and payment details processed by our payment processor. We do not store full card numbers.</li>
                <li><strong>Communications data:</strong> patient reminders and confirmations sent over WhatsApp and email on the clinic&apos;s behalf, and messages you send us for support.</li>
                <li><strong>Usage and technical data:</strong> log data, device and browser information, IP address, and actions taken in the Service, used for security, troubleshooting and improvement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">3. How we collect it</h2>
              <p>
                We collect information directly from clinic staff when they register and use the Service,
                from data your staff enter about patients and operations, automatically through use of the
                Service (logs and cookies), and from our service providers (for example a payment or
                delivery status from the payment or messaging provider). Where a patient books through an
                optional online booking page, we collect the contact and appointment details they submit,
                on behalf of the clinic.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">4. How we use information</h2>
              <p>We use information to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide, operate and maintain the Service and its features.</li>
                <li>Authenticate users, enforce roles, permissions and device limits, and keep the Service and its data secure.</li>
                <li>Process subscriptions, payments and invoices.</li>
                <li>Send transactional messages the clinic configures, such as appointment reminders, confirmations and receipts, and to provide support.</li>
                <li>Monitor, troubleshoot, analyze and improve the Service and develop new features.</li>
                <li>Comply with law and enforce our Terms.</li>
              </ul>
              <p className="mt-3">
                We do not sell or rent personal information, we do not share patient data with third
                parties for their own marketing, and we do not use patient data to train third-party
                advertising or profiling systems.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Lawful basis</h2>
              <p>
                For account and business data we act as controller and rely on the performance of our
                contract with the clinic, our legitimate interest in running and securing the Service, and
                compliance with law. For patient data we act on the clinic&apos;s documented instructions;
                the clinic is responsible for having a valid lawful basis and any required consent under
                the law that applies to it before entering patient data into the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Service providers and sharing</h2>
              <p>
                We rely on a small number of trusted providers (sub-processors) to run CuspFlow. They
                process data only on our instructions, under confidentiality and data-protection
                obligations, and solely to deliver their part of the Service:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Supabase</strong>: cloud database, authentication and file storage that host the Service and Clinic Data.</li>
                <li><strong>Cloudflare</strong>: hosting and content delivery for our websites and application.</li>
                <li><strong>Stripe</strong>: subscription billing and payment processing.</li>
                <li><strong>Resend</strong>: delivery of transactional emails such as reminders, receipts and confirmations.</li>
                <li><strong>WhatsApp Business Platform (Meta)</strong>: delivery of patient reminders and messages the clinic chooses to send over WhatsApp.</li>
              </ul>
              <p className="mt-3">
                We may also disclose information if required by law or valid legal process, to protect the
                rights, safety and security of clinics, patients, the public or CuspFlow, or in connection
                with a merger, acquisition or sale of assets, in which case we will require the recipient
                to honor this Policy. We will update this list as our providers change.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Where data is stored and processed</h2>
              <p>
                Clinic Data is hosted on cloud infrastructure operated by our providers, and may be stored
                and processed in data centers located outside the clinic&apos;s own country. Where data is
                transferred across borders, we rely on our providers&apos; contractual and technical
                safeguards to protect it. Clinics remain responsible for any data-localization or
                cross-border transfer requirements that apply to them under their local law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">8. Security</h2>
              <p>
                We use reasonable technical and organizational measures to protect information, including
                encryption in transit (TLS) and at rest, per-clinic isolation enforced by row-level
                security so access to any clinic&apos;s data requires credentials scoped to that clinic,
                role-based and per-user permissions the clinic controls, a limit on the number of active
                devices per login, and access logging. No method of transmission or storage is completely
                secure, and clinics are responsible for safeguarding their own credentials and devices. If
                we become aware of a security incident affecting personal information, we will notify
                affected clinics without undue delay and as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">9. Data retention and deletion</h2>
              <p>
                Clinic Data is retained for the duration of the subscription. If a subscription lapses or
                is cancelled, the clinic enters a 60-day view-only window during which all records remain
                readable and can be exported in full. If the subscription is not reactivated within that
                window, the Clinic Data is permanently deleted from active systems, and backup copies are
                overwritten in the ordinary backup cycle.
              </p>
              <p className="mt-3">
                Individual records that clinic staff delete inside the Service (for example a patient,
                appointment or catalogue item) are removed from active use immediately and kept
                recoverable for 30 days, after which they move to archival storage and are eventually
                erased in line with the record-keeping requirements that apply in the clinic&apos;s
                country. We retain limited account and billing records for as long as needed to meet our
                own legal, tax and accounting obligations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">10. Your rights and choices</h2>
              <p>
                Clinics can access, correct, export and delete the data they hold in CuspFlow directly
                within the Service, and can request account closure at any time. Patients who wish to
                exercise rights over their records (such as access, correction or deletion) should contact
                their clinic, which controls that data and can act on the request using the tools we
                provide; we will support clinics in responding. Where your local law grants additional
                rights, such as the right to object to or restrict processing or to lodge a complaint with
                a data-protection authority, those rights continue to apply.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">11. Patient and minor data</h2>
              <p>
                Dental records often include minors and sensitive health information. Clinics are
                responsible for collecting any consent required under their local law before entering such
                data and for handling it lawfully. CuspFlow provides the security, access controls,
                export and deletion tools that help clinics meet those obligations. We do not knowingly
                collect data directly from patients except through features a clinic enables, such as
                online booking or digital forms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">12. Cookies and local storage</h2>
              <p>
                We use only the cookies and browser storage needed to keep users signed in, maintain
                security, and remember basic preferences. We do not use third-party advertising cookies
                or cross-site tracking.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">13. Marketing and automated decisions</h2>
              <p>
                We may send clinic staff service and product updates related to their account; you can opt
                out of non-essential messages. We do not make decisions producing legal or similarly
                significant effects about patients through solely automated processing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">14. Local data protection laws</h2>
              <p>
                CuspFlow is designed for clinics in Asia, South America and Africa, and our handling of
                personal information is intended to support clinics in meeting the data-protection laws
                that apply to them, such as POPIA in South Africa, the NDPA in Nigeria, the Data
                Protection Act in Kenya, the LGPD in Brazil, and the DPDP Act in India, among others. The
                clinic remains the party responsible to its patients and regulators for lawful processing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">15. Changes to this Policy</h2>
              <p>
                We may update this Policy from time to time. When we make material changes we will update
                the date above and, where appropriate, notify clinics through the Service. Your continued
                use after a change takes effect constitutes acceptance of the updated Policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">16. Contact</h2>
              <p>
                For privacy questions or requests, contact us at{" "}
                <a href="mailto:privacy@cuspflow.co" className="text-brand-600 hover:underline">
                  privacy@cuspflow.co
                </a>
                . Patients should contact their clinic in the first instance for questions about their own
                records.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
