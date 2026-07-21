# CuspFlow Website — Content Source of Truth

**What this is:** the single, human-editable reference for **all copy and content
data** on the CuspFlow website (`cuspflow.co`) — marketing pages, pricing, and the
full `/docs` help centre.

**How to use it:** when a human wants to change website content, edit **this
document** (or describe the change against it), then hand it to the AI to apply
the change across the actual site files. This doc is the intent; the repo files
are the implementation. Keep them in sync — when the site changes, update this;
when this changes, update the site.

> **Not covered here:** technical/build details (framework, deploy, component
> conventions) live in [`WEBSITE_DOCUMENTATION.md`](./WEBSITE_DOCUMENTATION.md).
> The authoritative *pricing/billing product spec* lives in the app repo at
> `dental-pms/docs/STRIPE_PAYMENTS.md` — the numbers below must always match it.

**Last updated:** 2026-07-21

---

## 1. Where each piece of content lives (file map)

| Content | Where to edit in the repo |
|---|---|
| Homepage copy & sections | `app/page.tsx`, `components/sections/*.tsx` |
| Hero headline / bullets / trust line | `components/sections/Hero.tsx` |
| Feature grid + data-import callout | `components/sections/FeatureGrid.tsx` |
| Homepage deep-dive sections | `app/page.tsx` (`<DeepDive …>` blocks) |
| Features page | `app/features/page.tsx` |
| **Pricing tiers, add-ons, switcher** | `components/pricing/PricingPlans.tsx` (tiers) + `app/pricing/page.tsx` (included-features, add-ons, FAQ) |
| Contact / demo page | `app/contact/page.tsx` |
| Legal | `app/privacy/page.tsx`, `app/terms/page.tsx` |
| Nav & footer links | `components/layout/Nav.tsx`, `components/layout/Footer.tsx` |
| **Docs articles (all 27)** | `content/docs/*.md` — one Markdown file per article, plain frontmatter |
| Docs categories & ordering | `lib/docs.ts` (`DOC_CATEGORIES`) |
| SEO: sitemap / llms.txt | `app/sitemap.ts`, `app/llms.txt/route.ts` (auto-built from the docs, but re-check on renames) |

> The 27 docs articles are already plain Markdown in `content/docs/` — those files
> **are** the editable source for article prose. This document indexes and
> summarises them (§5) so a human can see the whole landscape and request edits;
> for a full rewrite of an article, edit its `.md` file directly.

---

## 2. Pricing (authoritative — must match `STRIPE_PAYMENTS.md §2a`)

The pricing table has a **Monthly / Annual switcher**. It **defaults to Annual**,
so the headline per-month figure shown by default is the annual-billing rate.

### Plans

| Plan | Monthly | Annual (per mo) | Annual (per yr) | Staff seats | Imaging storage | Locations |
|---|---|---|---|---|---|---|
| **Starter** | $49/mo | $39/mo | $468/yr | Up to 5 | 15 GB | 1 location |
| **Growth** *(Most popular)* | $99/mo | $79/mo | $948/yr | Up to 15 | 50 GB | Multi-branch |
| **Clinic Pro** | $199/mo | $159/mo | $1,908/yr | Up to 35 | 120 GB | Multi-branch |
| **Enterprise** | Custom | — | — | 35+ | Custom | Unlimited branches |

- Annual billing saves **~20%** vs monthly.
- Subscriptions are billed in **USD**. (Patient-facing invoices/receipts use the
  clinic's own currency.)
- Taglines: Starter — "For a single-location clinic just getting started." ·
  Growth — "For established clinics ready to scale their operations." · Clinic Pro
  — "For busy, high-volume practices and small groups." · Enterprise — "For dental
  groups running large networks of clinics."
- Enterprise extra spec line: **"Dedicated account manager & assisted onboarding."**
- CTA: Starter/Growth/Clinic Pro → **Start Free Trial** (→ `app.cuspflow.co/signup`);
  Enterprise → **Contact Sales** (→ `/contact`).

### Add-ons

| Add-on | Price | Notes |
|---|---|---|
| Additional staff seat | $12/mo | One extra login on top of the plan's seats. Add/remove any time. |
| Storage block (50 GB) | $10/mo | Adds 50 GB imaging storage. Stack as many as needed. |
| SMS Pack — Bronze | $15 | 500 SMS credits. One-time top-up. |
| SMS Pack — Silver | $30 | 1,200 SMS credits. One-time top-up. |
| SMS Pack — Gold | $55 | 2,500 SMS credits. One-time top-up. |

### Trial & lifecycle

- **30-day free trial**, no credit card required, full platform.
- If payment lapses: quiet retries → **60-day view-only window** (read + full
  export, no new writes) → deletion only if nobody returns. Reactivation restores
  everything instantly.

### "Included on every plan" list (pricing page)

Every plan includes every feature; plans differ only by seats, storage and
branches. The list currently reads:

- Live waiting room & patient journey tracking
- Appointment scheduling & multi-chair calendar
- FDI treatment plans, charting & clinical notes
- X-ray & imaging storage
- Lab case management
- Auto-generated billing, installments & payments
- Financial analytics & reconciliation
- Staff directory, payroll, attendance & commissions
- Family / household groups
- **Free built-in data import tool & full data export**
- Role-based access (8 staff roles)
- Multi-branch data isolation

Footer line under the table: **"Every plan includes assisted onboarding, a free
built-in data import tool, and a full 30-day trial."**

---

## 3. Content rules & positioning decisions

These are standing rules — apply them to any new copy.

1. **Onboarding & migration positioning.** We do **not** offer free, done-for-you
   onboarding or data migration as a service. Never write "free onboarding
   session" or "data migration support." Instead:
   - **Assisted onboarding** — we help you get started (details TBD; no copy
     should over-promise a free full-service migration).
   - **Free, built-in data import tool** — the self-serve import wizard is free,
     included on every plan, and run by the clinic themselves.
   - The import tool should be **mentioned often** across the site (it's a key
     switching incentive).
2. **No feature gating.** Every plan includes every feature — say so. Plans differ
   only by seats, storage and branches.
3. **No internal tech-stack in user-facing copy.** Don't name the framework,
   hosting, database, etc. Security/trust language (encryption in transit & at
   rest, per-clinic data isolation, HIPAA-aligned, free export) is good; naming
   the vendors behind it is not.
4. **FAQ single source of truth.** The full FAQ lives at `/docs/reference/faq`
   (`content/docs/faq.md`). The pricing page keeps only a few pricing-specific
   questions and links to the full FAQ — never duplicate the whole FAQ.
5. **Pricing numbers** must always match `dental-pms/docs/STRIPE_PAYMENTS.md §2a`
   and the app's Stripe catalogue. If they change, update §2 here, the pricing
   page, and the relevant docs articles together.
6. **Cross-surface links.** The in-app help panel (in the `dental-pms` app) links
   to these docs at `cuspflow.co/docs/<category>/<slug>`. If an article is renamed
   or moved, update `dental-pms/src/components/help/guides.ts`.

---

## 4. Key marketing copy (current)

**Hero** (`components/sections/Hero.tsx`)
- Headline area subtext: "CuspFlow gives every dentist, nurse, and receptionist a
  real-time view of every patient — from the moment they walk in to the moment
  they pay. No spreadsheets. No sticky notes. No chaos."
- Bullets: Live waiting room · Treatment plans linked to billing · Multi-branch,
  one login · **"Free built-in data import — switch systems in a day"**
- Trust line: "30-day free trial · no credit card required · every feature included"

**Feature grid** (`components/sections/FeatureGrid.tsx`) — 6 cards: Live Waiting
Room · Visual Treatment Plans · Smart Billing · Lab Case Tracking · Multi-Branch
Management · Staff, Payroll & HR. Plus a highlighted **data-import callout**:
"Switching systems? Bring your data yourself — free." (links to
`/docs/getting-started/importing-your-data`).

**Homepage deep-dives** (`app/page.tsx`): Waiting Room · Treatment Plans · Billing
& Payments · **"Switch in a day — Bring your data across yourself, for free."**

**Features page** (`app/features/page.tsx`) — grouped feature lists; the "Data &
Migration" group leads with **"Free Built-in Data Import Tool"** (self-serve,
column auto-mapping, validation dry-run, "no migration fees").

**Contact page** — "Book a free demo" (30-minute, no-pressure). Support email
across the site: **support@cuspflow.co**.

---

## 5. Docs help centre — full article index

Live at `cuspflow.co/docs`. **9 categories, 27 articles.** URL pattern:
`/docs/<category>/<slug>`. Each row's source file is `content/docs/<slug>.md`.

### Getting Started — *Set up your clinic and learn the essentials.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Getting Started with CuspFlow | `getting-started` | Guided tour / map of the whole system; the patient-journey path; where things live; links out to setup + concepts. |
| 2 | Initial clinic setup | `initial-clinic-setup` | Clinic details (name, currency/locale, tax, print format, prefixes), branches, dental chairs, first staff, schedules. |
| 3 | Importing your existing data | `importing-your-data` | The Data Migration wizard: 7 entity types, CSV upload, column auto-mapping, validation dry-run, up to 5,000 rows. |

### Core Concepts — *The terminology and roles that run through CuspFlow.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Glossary of terms | `glossary` | Definitions of all domain terms (see §6). |
| 2 | Roles & permissions | `roles-and-permissions` | The 8 roles, how access is decided, custom permission overrides, key rules (only Owner changes roles; Owner never locked out). |

### Patients & Scheduling — *Records, families, appointments and the waiting room.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Patient records & medical history | `patient-records` | Demographics, patient code (MRN), instant search, structured medical history (Medical/Dental/Allergy/Medication), phone rule. |
| 2 | Families & household billing | `families` | Family groups, Head of Family, household balance, under-18 phone exemption. |
| 3 | Booking & managing appointments | `appointments` | Pre-booked & walk-in, multi-doctor calendar, statuses (Scheduled→Checked-In→Completed / Cancelled / No-Show), emergencies. |
| 4 | Check-in & the Waiting Room | `waiting-room` | Live Kanban board (Waiting→In Treatment→Billing→Discharged), 30-min wait alerts, emergency priority, discharge gate. |

### Clinical — *Treatment plans, charting, lab cases and templates.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Treatment plans & the teeth chart | `treatment-plans` | The per-visit plan: procedures, prescriptions, FDI teeth chart, notes, X-rays, care team, price-locking, Main Doctor rule. |
| 2 | Lab cases | `lab-cases` | External lab work lifecycle (Draft→Sent→In Production→Received→Fitted), lab & patient costs, auto-billing back to the plan. |
| 3 | Orthodontics tracking | `orthodontics` | Fixed braces & clear aligners, stages, status, progress notes on the patient profile. |
| 4 | Treatment & note templates | `treatment-and-note-templates` | Reusable treatment templates and SOAP note templates for faster charting. |

### Billing & Payments — *Checkout, receipts, balances and insurance claims.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Checkout & taking payment | `checkout-and-taking-payment` | Review invoice, discounts, payment methods (Cash/Card/Mobile Money/Insurance/Waived), finalise & discharge gate, currency. |
| 2 | Installments & receipts | `installments-and-receipts` | Partial payments (Unpaid→Partial→Paid), A4/thermal receipts, gap-free numbering, refunds. |
| 3 | Overdue payments & follow-up | `overdue-payments` | Outstanding-balance list, per-patient & per-family balances, payment reminders (SMS credits). |
| 4 | Insurance claims | `insurance-claims` | Claim lifecycle (Pending→Submitted→Approved/Rejected), carriers & policies, Insurance as a payment method. |

### Operations — *Inventory, price catalog, branches and chairs.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Inventory & stock | `inventory` | Stock-as-ledger, per-branch levels, reorder/low-stock alerts, batch/expiry, Bill of Materials auto-deduction. |
| 2 | Price catalog & Bill of Materials | `price-catalog` | Billable procedures/prescriptions, price-locks-at-checkout, BOM links to inventory. |
| 3 | Branches & dental chairs | `branches-and-chairs` | Multi-location setup, per-branch chairs/schedules/inventory, live chair occupancy. |

### Staff & HR — *Team management, payroll and attendance.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Staff management & roles | `staff-management` | HR profile vs. login split, adding staff, roles, custom permissions, schedules → appointment availability. |
| 2 | Payroll & commissions | `payroll` | Pay runs (salary + commission + tax), payslips, snapshotted commission rates. |
| 3 | Attendance & time tracking | `attendance` | Clock in/out, hours computation, attendance reports feeding hourly pay. |

### Account & Subscription — *Your CuspFlow plan, add-ons, trials and data export.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Choosing & managing your subscription | `choosing-and-managing-your-subscription` | Plans, seats, storage, add-ons, plan changes, Settings → Billing (mirrors §2 pricing). |
| 2 | Billing lifecycle, trials & data export | `billing-lifecycle-trials-and-data-export` | 30-day trial, payment-lapse flow, 60-day view-only window, free full export, security note. |

### Reference — *FAQ, reporting and quick answers.*
| # | Article | Slug | What it covers |
|---|---|---|---|
| 1 | Frequently asked questions | `faq` | Canonical FAQ (see §7). |
| 2 | Reports & analytics | `reports-and-analytics` | Financials dashboard, Reports tabs, load-once-then-refresh behaviour, CSV export. |

---

## 6. Glossary terms (`content/docs/glossary.md`)

Grouped as Clinical / Front-desk & billing / Operations / Account & subscription.
Full term list (edit the article for definitions):

- **Clinical:** FDI notation · Quadrant · Teeth chart · Treatment plan · Procedure
  · Prescription · SOAP note · Care team · Lab case · Ortho case · Implant component
- **Front-desk & billing:** Patient code (MRN) · Head of Family · Walk-in · Patient
  journey · Invoice · Installment · Receipt · Finalised
- **Operations:** Price catalog · Inventory · Bill of Materials (BOM) · Stock
  movement · Reorder level · Batch / expiry
- **Account & subscription:** Seat · Storage · Trial · View-only window · Add-on

---

## 7. FAQ (canonical — `content/docs/faq.md`)

The pricing page shows only the **Getting started & pricing** questions and links
here for the rest.

**Getting started & pricing**
1. Is there a free trial? — Yes, 30 days, full platform, no card.
2. Do all plans really include every feature? — Yes, no feature gating.
3. What if I need more seats or storage than my plan includes? — Add-ons ($12/seat, $10/50 GB), prorated.
4. Can I change plans later? — Yes; upgrades immediate (prorated), downgrades at renewal; data moves with you.
5. How does annual billing work? — ~20% saving, billed once a year.

**Data, security & currencies**
6. Is our patient data secure? — Encrypted in transit & at rest, per-clinic isolation, HIPAA-aligned.
7. Do you support multiple currencies? — Yes for patient-facing money; subscriptions in USD.
8. What happens to our data if we cancel or don't renew? — 60-day view-only window, free export, then deletion.
9. Can I export my data? — Yes, any time, free, complete (Settings → Billing).

**Using CuspFlow**
10. Does CuspFlow work for multiple locations? — Yes, multi-branch with per-branch isolation.
11. Can patients book their own appointments? — Online booking per clinic; fuller portal on the roadmap (optional add-on).
12. How many staff can use CuspFlow at once? — As many as your plan's seats + add-on seats allow.
13. Can I import data from my old system? — Yes, the free built-in Data Migration wizard.

---

## 8. Change log for this document

| Date | Change |
|---|---|
| 2026-07-21 | Created. Captures the docs help centre (27 articles / 9 categories), pricing (with the new Monthly/Annual switcher defaulting to annual), add-ons, FAQ, glossary, and the onboarding/data-import positioning rules. |
