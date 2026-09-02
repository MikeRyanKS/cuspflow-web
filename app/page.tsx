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
import BrowserFrame from "@/components/ui/BrowserFrame";

const SITE_URL = "https://cuspflow.co";

/** Structured data for the homepage: the organization, the site, and the product. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CuspFlow",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      description:
        "Cloud dental practice management software for clinics in Asia, South America and Africa.",
      email: "support@cuspflow.co",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "CuspFlow",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "CuspFlow",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Dental Practice Management Software",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "Cloud dental practice management software: live waiting room, appointments, treatment plans, billing, lab cases, inventory, HR/payroll and reporting. Multi-branch, every feature on every plan.",
      offers: {
        "@type": "Offer",
        price: "39",
        priceCurrency: "USD",
        description: "Plans from $39/mo per clinic. 30-day free trial, no card required.",
      },
    },
  ],
};

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <PainPoints />
        <FeatureGrid />

        <DeepDive
          badge="Waiting Room"
          headline="Every patient. Every chair. One screen."
          description="Stop chasing status updates across hallways. The live waiting room gives every team member a real-time view of where each patient is in their journey, from check-in to checkout."
          bullets={[
            "Color-coded patient cards update in real time as staff change statuses",
            "Elapsed time on every card, so you spot delays before they become complaints",
            "Drill into any patient to open their plan, X-rays, or billing",
            "Works across all chairs and branches at once",
          ]}
          visual={
            <BrowserFrame
              src="/screenshots/waiting-room.webp"
              alt="CuspFlow live waiting room board with patients in Waiting, In Treatment and Billing columns"
              url="app.cuspflow.co/waiting-room"
            />
          }
        />

        <DeepDive
          badge="Treatment Plans"
          headline="Every tooth, every procedure, perfectly linked."
          description="Treatment plans use the FDI tooth chart so dentists pinpoint exactly which teeth are being treated. Procedures, prescriptions, X-rays and lab cases all live on the same plan, and roll automatically into the patient's bill."
          bullets={[
            "FDI tooth chart with click-to-select teeth, no manual number entry",
            "Procedures, prescriptions and lab cases on one unified view",
            "X-rays attached directly to the plan for immediate reference",
            "Plan status flows from Draft to Active to Completed to Billed",
          ]}
          visual={
            <BrowserFrame
              src="/screenshots/treatment-plans.webp"
              alt="CuspFlow treatment plans list showing patient plans, procedures and status"
              url="app.cuspflow.co/treatment-plans"
            />
          }
          reversed
        />

        <DeepDive
          badge="Billing & Payments"
          headline="From treatment done to invoice sent, automatically."
          description="The moment a dentist finalizes a treatment plan, CuspFlow generates the invoice. No double-entry, no forgotten line items. Track payments, partial payments and installment plans, and know exactly what every patient owes."
          bullets={[
            "Invoice auto-generated from treatment items on plan finalization",
            "Supports cash, card, mobile money, insurance and installment plans",
            "Real-time balance tracking, so you always know what is outstanding",
            "Full payment history per patient, per visit, per branch",
          ]}
          visual={
            <BrowserFrame
              src="/screenshots/financials.webp"
              alt="CuspFlow financials overview showing revenue, collections and outstanding balances"
              url="app.cuspflow.co/financials"
            />
          }
        />

        <DeepDive
          badge="Switch in a day"
          headline="Bring your data across yourself, for free."
          description="Moving from another system should not cost you weeks or a migration fee. The free, built-in data import tool lets your team bring patients, appointments, staff and inventory across from a spreadsheet, with column auto-mapping and a validation dry-run that catches problems before anything is saved."
          bullets={[
            "Imports patients, appointments, families, staff, chairs and inventory",
            "Column auto-mapping guesses the fields, you confirm",
            "Validation dry-run flags every warning and error, row by row, before import",
            "Assisted onboarding if you want a hand, but the tool is yours, free, any time",
          ]}
          visual={
            <BrowserFrame
              src="/screenshots/data-migration.webp"
              alt="CuspFlow data migration wizard with column mapping and validation dry-run"
              url="app.cuspflow.co/settings/data-migration"
            />
          }
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
