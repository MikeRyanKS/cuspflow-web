# CuspFlow Website Content

The human-editable reference for the **marketing website** content — the homepage,
features, pricing and contact pages. **Everything except the help centre.** (The
`/docs` help centre lives in [`DOCUMENTATION_CONTENT.md`](./DOCUMENTATION_CONTENT.md).)

**How to use it:** to change website copy or pricing, edit it here (or point the AI
at the section), and the AI updates the live site. Every section links to the page
it describes — click through to see it live.

*(Build/architecture details live in [`WEBSITE_DOCUMENTATION.md`](./WEBSITE_DOCUMENTATION.md).)*

**Last updated:** 2026-09-03

### Pages
- Home — <https://cuspflow.co>
- Features — <https://cuspflow.co/features>
- Pricing — <https://cuspflow.co/pricing>
- About — <https://cuspflow.co/about>
- Blog — <https://cuspflow.co/blog>
- Contact / book a demo — <https://cuspflow.co/contact>
- Docs (help centre) — <https://cuspflow.co/docs> · Video tutorials — <https://cuspflow.co/docs/tutorials>
- Privacy — <https://cuspflow.co/privacy> · Terms — <https://cuspflow.co/terms> · Sub-processors — <https://cuspflow.co/sub-processors>
- App sign-up (external) — <https://app.cuspflow.co/signup>

> **Legal pages:** the full text of Terms and Privacy is mirrored in plain Markdown
> at [`TERMS.md`](./TERMS.md) and [`PRIVACY.md`](./PRIVACY.md). Edit the live pages in
> `app/terms/page.tsx` / `app/privacy/page.tsx`, then update those mirrors to match.
> Operating entity: **Keplify LLC (Delaware)**. Theme is app brand-blue (`brand-*`
> tokens) with a green accent.

---

## Homepage — <https://cuspflow.co>

**Hero**
- Headline: **"Your Clinic, Running in Perfect Sync"**
- Subtext: "CuspFlow gives every dentist, nurse, and receptionist a real-time view
  of every patient — from the moment they walk in to the moment they pay. No
  spreadsheets. No sticky notes. No chaos."
- Bullets: Live waiting room — every chair, every status · Treatment plans linked
  to billing automatically · Multi-branch, one login · **Free built-in data
  import — switch systems in a day**
- Buttons: **Start Free Trial** (→ app sign-up) · **See Features** (→ /features)
- Trust line: "30-day free trial · no credit card required · every feature included"

**Trust bar** — four proof points: Web-based — no installs · Live patient status
updates · All locations, one login · Encrypted data, isolated per clinic

**Pain points** — three "before CuspFlow" scenarios:
- *"Where is the patient?"* — receptionists call nurses, nobody knows without
  asking; the live waiting room ends the guessing.
- *"Which teeth did we treat?"* — scattered paper/photos/X-rays; CuspFlow links
  every plan, X-ray and lab case to the tooth.
- *"Did they actually pay?"* — billing in a spreadsheet; CuspFlow auto-generates
  the invoice when the plan is finalized.

**Feature grid** ("One platform. The whole picture.") — six cards: Live Waiting
Room · Visual Treatment Plans · Smart Billing · Lab Case Tracking · Multi-Branch
Management · Staff, Payroll & HR.
Plus a highlighted **data-import callout**: *"Switching systems? Bring your data
yourself — free."* — free built-in import tool (column auto-mapping, validation
dry-run, no migration fees, up and running the same day). Links to
[the docs how-to](https://cuspflow.co/docs/getting-started/importing-your-data).

**Deep-dive sections** (headline → gist):
1. *Waiting Room* — "Every patient. Every chair. One screen." Live status from
   check-in to checkout.
2. *Treatment Plans* — "Every tooth, every procedure, perfectly linked." FDI chart;
   procedures, prescriptions, X-rays, lab cases in one view; rolls into the bill.
3. *Billing & Payments* — "From treatment done to invoice sent — automatically."
   Auto invoice on finalization; cash/card/insurance/installments; live balances.
4. *Switch in a day* — **"Bring your data across yourself — for free."** The free,
   built-in import tool (patients, appointments, families, staff, chairs,
   inventory; auto-mapping; validation dry-run). "Assisted onboarding if you want a
   hand — but the tool is yours, free, any time."

**Multi-branch callout** — "One Group, One Dashboard." Unify branches while keeping
each clinic's data private and separate.

**Testimonials** — three named quotes (Dr. Hanan Al-Rashid, Al-Rashid Dental Group;
Dr. Emeka Okonkwo, Okonkwo Family Dentistry; Dr. Sara Mansour, Smile Studio).

**Pricing preview** — teaser linking to [/pricing](https://cuspflow.co/pricing).

**Final CTA** — "Ready to transform your practice?" Start the free trial; no credit
card; up and running in minutes.

---

## Features page — <https://cuspflow.co/features>

Intro: **"Everything your clinic needs, nothing it doesn't."** Feature groups:

Patient Flow · Appointments · Treatment Plans · Billing & Payments · Lab Cases ·
Patient Management · Digital Forms · Multi-Branch · Analytics & Reports · Inventory
· Staff, Payroll & HR · **Data & Migration** · Access & Security · X-rays & Imaging.

The **Data & Migration** group leads with **"Free Built-in Data Import Tool"** —
bring patients, appointments, staff and inventory across yourself with column
auto-mapping and a validation dry-run before anything is saved; "no waiting on us,
no migration fees." Also: Full Data Export (CSV, any time, no lock-in) and a
complete audit trail.

---

## Pricing page — <https://cuspflow.co/pricing>

Header: **"Simple, transparent pricing."** "Every feature is included on every
plan. You only pay for staff seats, storage, and branches. Every plan starts with a
30-day free trial — no credit card required."

**Billing switcher:** a Monthly / Annual toggle sits above the table and
**defaults to Annual**, so the headline per-month figure shown by default is the
annual-billing rate. Annual saves ~20%. Subscriptions are billed in USD.

### Plans

| Plan | Monthly | Annual (per mo) | Annual (per yr) | Seats | Storage | Locations | Tagline |
|---|---|---|---|---|---|---|---|
| **Starter** | $49/mo | $39/mo | $468/yr | Up to 5 | 15 GB | 1 location | For a single-location clinic just getting started. |
| **Growth** *(Most popular)* | $99/mo | $79/mo | $948/yr | Up to 15 | 50 GB | Multi-branch | For established clinics ready to scale their operations. |
| **Clinic Pro** | $199/mo | $159/mo | $1,908/yr | Up to 35 | 120 GB | Multi-branch | For busy, high-volume practices and small groups. |
| **Enterprise** | Custom | — | — | 35+ | Custom | Unlimited | For dental groups running large networks of clinics. |

- Enterprise extra spec: **"Dedicated account manager & assisted onboarding."**
- CTA: Starter/Growth/Clinic Pro → **Start Free Trial**; Enterprise → **Contact Sales**.

### Add-ons

| Add-on | Price | Notes |
|---|---|---|
| Additional staff seat | $12/mo | One extra login on top of the plan's seats. Add/remove any time. |
| Storage block (50 GB) | $10/mo | Adds 50 GB imaging storage. Stack as many as needed. |
| SMS Pack — Bronze | $15 | 500 SMS credits. One-time top-up. |
| SMS Pack — Silver | $30 | 1,200 SMS credits. One-time top-up. |
| SMS Pack — Gold | $55 | 2,500 SMS credits. One-time top-up. |

### "Included on every plan"

Live waiting room & patient journey tracking · Appointment scheduling & multi-chair
calendar · FDI treatment plans, charting & clinical notes · X-ray & imaging storage
· Lab case management · Auto-generated billing, installments & payments · Financial
analytics & reconciliation · Staff directory, payroll, attendance & commissions ·
Family / household groups · **Free built-in data import tool & full data export** ·
Role-based access (8 staff roles) · Multi-branch data isolation.

Footer line under the table: **"Every plan includes assisted onboarding, a free
built-in data import tool, and a full 30-day trial."**

### Pricing-page FAQ

Shows only the pricing-specific questions (free trial · every feature included ·
more seats/storage · change plans · annual billing), then links to the full FAQ at
[/docs/reference/faq](https://cuspflow.co/docs/reference/faq). Full FAQ content is
managed in [`DOCUMENTATION_CONTENT.md`](./DOCUMENTATION_CONTENT.md).

---

## Contact page — <https://cuspflow.co/contact>

**"Book a free demo"** — a 30-minute, no-pressure demo of the live product. Simple
lead form (name, clinic, email, phone, message). Support email used across the site:
**support@cuspflow.co**.

---

## Navigation & footer

- **Top nav:** Features · Pricing · Docs · Contact · **Free Trial** (button).
- **Footer — Product:** Features · Pricing · Free Trial.
- **Footer — Resources:** Documentation · FAQ · Contact.
- **Footer — Company:** Privacy Policy · Terms of Service.
- Tagline: "Practice management software built for modern dental clinics.
  Real-time, multi-branch, and built to scale."

---

## Content rules & positioning (apply to all copy)

1. **Onboarding & migration.** We do **not** offer free, done-for-you onboarding or
   migration. Never write "free onboarding session" or "data migration support."
   Use **assisted onboarding** (we help you get started; details TBD) and the
   **free, built-in data import tool** (self-serve, included on every plan). Mention
   the import tool **often** — it's a key switching incentive.
2. **No feature gating.** Every plan includes every feature; plans differ only by
   seats, storage and branches — say so.
3. **No internal tech-stack in copy.** Don't name the framework, hosting or
   database. Trust language (encryption in transit & at rest, per-clinic isolation,
   HIPAA-aligned, free export) is good; naming vendors is not.
4. **Pricing is a single source of truth.** The figures above must match the app's
   Stripe catalogue and `dental-pms/docs/STRIPE_PAYMENTS.md §2a`. If they change,
   update this file and the pricing page together.
5. **FAQ.** The full FAQ is the docs page; the pricing page keeps only a few
   pricing questions and links out — never duplicate the whole FAQ.
