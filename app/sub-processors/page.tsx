import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sub-processors | CuspFlow",
  description:
    "The third-party sub-processors CuspFlow uses to provide its dental practice management platform, what they do, and the data they process.",
  alternates: { canonical: "https://cuspflow.co/sub-processors" },
};

const subProcessors = [
  {
    name: "Supabase",
    purpose: "Cloud database, authentication and file storage that host the application and Clinic Data.",
    data: "Account data, all Clinic Data (including patient records and images), and security logs.",
    location: "European Union (Ireland)",
  },
  {
    name: "Cloudflare",
    purpose: "Hosting and content delivery for the CuspFlow website and application.",
    data: "Technical and usage data such as IP address and request logs.",
    location: "Global edge network",
  },
  {
    name: "Stripe",
    purpose: "Subscription billing and payment processing.",
    data: "Clinic billing contact details and payment information. Full card numbers are not stored by CuspFlow.",
    location: "United States and global",
  },
  {
    name: "Resend",
    purpose: "Delivery of transactional email such as appointment reminders, receipts and booking confirmations.",
    data: "Recipient email address and the content of the message being sent.",
    location: "United States",
  },
  {
    name: "WhatsApp Business Platform (Meta)",
    purpose: "Delivery of patient reminders and messages a clinic chooses to send over WhatsApp.",
    data: "Recipient phone number and the content of the message being sent.",
    location: "Global",
  },
];

export default function SubProcessorsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="py-12 border-b border-slate-100 mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Sub-processors</h1>
            <p className="text-sm text-slate-400">Last updated: September 2026</p>
          </div>

          <div className="max-w-none text-sm text-slate-600 leading-relaxed space-y-6">
            <p>
              To provide the CuspFlow platform, we rely on a small number of trusted third-party
              providers (sub-processors). Each processes data only on our instructions, under
              confidentiality and data-protection obligations, and solely to deliver its part of the
              service. This page lists our current sub-processors and is part of our{" "}
              <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Sub-processor</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Data processed</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subProcessors.map((s) => (
                    <tr key={s.name} className="align-top">
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{s.name}</td>
                      <td className="px-4 py-3 text-slate-600 min-w-[220px]">{s.purpose}</td>
                      <td className="px-4 py-3 text-slate-600 min-w-[220px]">{s.data}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              We may update this list as our providers change. When we add a sub-processor that handles
              personal information, we will update this page and, where appropriate, notify clinics through
              the platform.
            </p>
            <p>
              Questions? Contact us at{" "}
              <a href="mailto:privacy@cuspflow.co" className="text-brand-600 hover:underline">
                privacy@cuspflow.co
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
