# Website Updates From App Dev

**Purpose:** the `dental-pms` app repo and this marketing site (`cuspflow-web`) are worked on in separate sessions so they don't get mixed together. Whenever a change in the app affects what the marketing site should say — pricing, plan features/limits, anything customer-facing — the app-dev session logs an actionable instruction here instead of touching this repo directly. A session working on `cuspflow-web` should check this file for open items before/while making pricing or feature-copy changes, and mark an item done (with the commit/date) once handled.

Format: newest entries at the top. Each entry states what changed in the app, why it matters for the website, and what the website copy should say instead.

---

## 2026-11-02 — Re-pricing: new prices on all three plans, bigger seat allowances, and the annual discount is now per-plan

**What changed in the app:** All three paid plans were re-priced and every tier gained seats. Storage allowances are unchanged.

| Plan | Monthly | Annual | Annual /mo | Annual saving | Seats (was) | Storage |
|---|---|---|---|---|---|---|
| **Starter** | $26.90 | $297/yr | $24.75 | ~8% | 7 (was 5) | 15 GB |
| **Growth** | $54.90 | $560/yr | $46.67 | 15% | 20 (was 15) | 50 GB |
| **Clinic Pro** | $99.90 | $960/yr | $80.00 | ~20% | 45 (was 35) | 120 GB |

The **additional staff seat** add-on dropped from **$12/mo to $5/mo**. The storage block stays at $10/mo per 50 GB. Enterprise stays custom-quoted, but its threshold language moves from "35+ seats" to "45+ seats" to sit above the new Clinic Pro ceiling.

**Why it matters for the website:** the single biggest copy change is that **the annual discount is no longer one number**. It used to be a flat ~20% on every plan; it is now ~8% / 15% / ~20%. Every "saves roughly 20%" line was therefore wrong for two of the three plans. The product owner's instruction was to keep the **"up to 20%"** framing, which stays truthful because 20% is the real saving on Clinic Pro, and to state the per-plan figure wherever a specific plan is being discussed. Also: prices now carry cents, so every figure needs two decimals ($26.90, not $26.9), and the annual totals no longer divide evenly into twelve, so a per-month rate must be derived from the yearly total rather than the yearly total being derived from a rounded monthly rate ($560/yr is $46.67/mo, and $46.67 × 12 is $560.04 — a price we don't charge).

**What to update:** *(this session handled it directly, by explicit request — see Status below.)*

**Status:** ✅ Done 2026-11-02, directly in this repo (app-dev session, by explicit request). Changes:

- `components/pricing/PricingPlans.tsx` — new prices and seat counts; `annualMonthly` replaced by `annualTotal` (the real yearly charge) with the per-month rate and the saving percentage both *derived* from it; switcher badge now "Save up to 20%" computed from the tiers rather than hardcoded; each annual card footnote states its own saving; Enterprise "35+" → "45+".
- `components/sections/PricingPreview.tsx` — homepage card figures and seat counts; "Running a group of 35+ seats?" → "45+".
- `app/pricing/page.tsx` — additional-seat add-on $12 → $5 (both the add-on card and the FAQ answer); annual-billing FAQ rewritten to "up to 20%" with the per-plan breakdown.
- `app/page.tsx` — JSON-LD `SoftwareApplication.offers.price` was `"39"` (the old Starter annual per-month rate) → `"24.75"`, with the description updated. A structured-data price that undercuts the real one risks the rich result being flagged.
- `content/docs/choosing-and-managing-your-subscription.md` — plans table rebuilt with an **Annual saving** column; add-on seat price; "up to 20%" wording. Also fixed a pre-existing broken table cell on the Enterprise row (`| Custom |, |`).
- `content/docs/faq.md` — annual-billing answer and the add-on seat price.

Built clean (`npm run build`). **Not yet committed or pushed** — the app-side migration and edge-function deploy land first so the site never advertises a price the checkout can't honour.

**One thing to watch:** figures are hardcoded in three separate places on this site (`PricingPlans.tsx`, `PricingPreview.tsx`, and the two help-centre articles) plus the JSON-LD offer. They are not derived from the app's `subscription_plans` table, so the next re-pricing has to touch all of them. `app/pricing/page.tsx`'s add-on prices are a fourth copy.

---

## 2026-10-09 — Print settings moved to their own "Print & Receipts" page + configurable receipt header/footer

**What changed in the app:** The print paper-format controls (Receipts, Medical Forms, Prescriptions, Payroll Paystubs) and the "Enable Offline Record Printing" toggle were **moved out of Settings → General into a new dedicated Settings sub-page, "Print & Receipts"** (`/settings/receipts`). That page also adds **clinic-configurable receipt branding** with a **live preview**: a header (toggle logo/branch name/branch address, one extra address line, up to 4 phone numbers, up to 2 emails) and a footer (thank-you note, other-branches contact info, opening hours, a promotional/info note, a boxed legal disclaimer, and a "Printed by" toggle). The receipt itself was redesigned — clearer header/footer rules, a horizontally-distributed header, the invoice number shown in brackets after the word INVOICE/RECEIPT, and the invoice number + patient name + patient ID emphasised in the brand colour. Config is stored clinic-wide; the branch name/address on a given receipt still comes from the branch where the payment was taken. (Other printable documents — Medical Form, Prescriptions, Paystub, Patient Record — will adopt the same header/footer in a follow-up.)

**Why it matters for the website:** any help-centre article that tells users the print/paper-size settings live under **Settings → General** is now wrong — they live under **Settings → Print & Receipts**. Likely spots: `initial-clinic-setup.md`, `installments-and-receipts.md`, and anything describing where to set A4/A5/Thermal. There is also now a genuinely new, documentable feature (customising what appears on the printed receipt header/footer) worth a short section.

**What to update:** (1) repoint any "Settings → General → Print" references to "Settings → Print & Receipts". (2) Optionally add a short help section describing the new receipt header/footer customisation (logo/phones/emails/address line; footer other-branches/opening-hours/promo/legal-disclaimer; live preview). No pricing or plan-limit impact — available to all plans.

**Status:** ✅ Done 2026-10-09, directly in this repo (the app-dev session handled the site this time, by explicit request, instead of leaving it as a handoff). Prescriptions & Medical Form now carry the same configurable header/footer too (that follow-up shipped). Changes: new article `content/docs/customizing-receipts-and-printing.md` (billing-payments, order 3; `overdue-payments`/`insurance-claims` bumped to 4/5); repointed every "Settings → General"/"Settings → General → Print" print reference to **Settings → Print & Receipts** in `installments-and-receipts.md`, `initial-clinic-setup.md`, `payroll.md`, `treatment-plans.md`; added branding/email mentions; `DOCUMENTATION_CONTENT.md` re-synced (new row + the two edited rows). Built (`npm run build`) clean; committed + pushed to `main` → live via GitHub Actions → Cloudflare Pages.

---

## 2026-09-16 — Session of app changes affecting help docs (RBAC, invites, treatment plan printing/history, patient search)

**What changed in the app:** A full day of live-tested changes (ADR-049 through ADR-061 in `dental-pms/docs/ARCHITECTURE_DECISIONS.md`): Receptionist/Doctor/Nurse gained real clinical-editing and appointment-management parity; **Administrator can now assign/change staff roles day-to-day** (except granting Owner itself, still Owner-only) — previously Owner-only entirely; a staff member's **login email can now only be changed by that person, self-service, from their own profile** (a real change-email flow, not previously possible for anyone); the Treatment Plan drawer gained a printable **Medical Form** now respecting the clinic's print format, plus a collapsed **Edit History** (who/when, full diff for Owner/Administrator); patient search (name/phone/email/ID) was extended to several previously-incomplete search boxes across the app, most notably the Appointments list; and **A5 was added as a third print-format option** alongside A4 and Thermal, for clinics printing on half sheets.

**Why it matters for the website:** the help centre directly described the old, now-wrong behaviour in three places — "Only Owner can change a staff member's role" (roles-and-permissions.md, staff-management.md) and "A4 or thermal" as the only print formats (initial-clinic-setup.md, installments-and-receipts.md). Also found and fixed in passing: `docs/DOCUMENTATION_CONTENT.md`'s FAQ summary line still said "HIPAA-aligned" even though the live FAQ article itself was already corrected in an earlier pass (2026-08-29) — the summary doc just hadn't been re-synced since.

**What to update:** *(this session handled it directly, not left pending — see Status below.)*

**Status:** ✅ Done 2026-09-16, same session. Edited directly: `content/docs/roles-and-permissions.md` (role-assignment rule, Receptionist's clinical access, self-service email-change rule), `content/docs/staff-management.md` (role-assignment rule, new "Changing a login email" section, branded-invite mention), `content/docs/treatment-plans.md` (new "Printing from the plan" and "Edit history" sections), `content/docs/installments-and-receipts.md` + `content/docs/initial-clinic-setup.md` (A5 added to print-format copy), `content/docs/appointments.md` (new "Finding an appointment" search section). `docs/DOCUMENTATION_CONTENT.md` re-synced to match all of the above, including the stale HIPAA line fix. Built (`npm run build`), committed, pushed to `main` — live via GitHub Actions → Cloudflare Pages.

---

## 2026-08-23 — Terms/Privacy should describe the real "delete" lifecycle (soft-delete → 30-day Trash → cold archive), not immediate permanent deletion

**What changed in the app:** In-app "Delete" (patients, appointments, lab cases, medical history, catalog items, etc.) has always been a soft-delete (`deleted_at` set, row kept). We're now building a **Settings → Trash** page (30-day recently-deleted view, restore-to-undo) on top of that existing soft-delete, and a later phase will cold-archive anything that ages out of Trash (export to cheap storage) rather than keeping it in the primary database forever, or genuinely erase it once a jurisdiction's retention-law minimum has passed. None of this is about the existing **whole-clinic purge** (60-day view-only window after subscription cancellation, `fn_purge_clinic`) — that one is a real, immediate, irreversible wipe and its existing "permanently deleted" copy on `/privacy`, `/terms`, and the FAQ is accurate and should NOT change.

**Why it matters for the website:** Per-record deletion (a patient, an appointment, a lab case, etc., independent of any clinic-level subscription event) is a separate lifecycle from the clinic purge, and the site currently doesn't describe it at all. If Terms/Privacy imply or are read as "deleting a record erases it immediately," that overpromises versus what actually happens (soft-delete → 30-day recoverable window → later cold-archive → eventual real deletion once retention-law minimums are satisfied). Note: CuspFlow does not serve the US, Canada, or EU markets, so this should NOT be framed around HIPAA or GDPR — retention language should stay generic ("applicable data-retention requirements," "your jurisdiction's retention laws") rather than naming a specific regulatory regime.

**What to update:** Add or adjust a Terms/Privacy clause (and FAQ if relevant) describing per-record deletion accurately: deleting a record within the app removes it from normal use immediately, but the underlying data is retained for a period (recoverable via the app's own Trash, then subject to retention-driven archival) rather than erased on the spot — distinct from, and in addition to, the existing whole-clinic-purge language which stays as-is.

**Status:** ✅ Done 2026-08-29 (in the same session as the docs sync). Added a per-record deletion paragraph to `app/privacy/page.tsx` §5 Data Retention (generic "retention requirements applicable in the clinic's jurisdiction", no HIPAA/GDPR), a "Deleting individual records" section to `content/docs/billing-lifecycle-trials-and-data-export.md`, and a "What happens when I delete a patient or an appointment?" Q to the FAQ. The whole-clinic-purge "permanently deleted" copy on `/privacy`, `/terms` and the FAQ was left unchanged as instructed. Also removed the stale "HIPAA-aligned security practices" line from the FAQ and the billing-lifecycle doc (CuspFlow doesn't serve US/CA/EU).

---

## 2026-08-18 — Branch count is unlimited on every plan, including Starter

**What changed in the app:** Branch count is **not enforced anywhere in the app** — a clinic on any plan, including Starter, can create as many branches as it wants. This was confirmed while auditing plan-limit enforcement (session-cap work) and is a **deliberate product decision**, not a bug being tracked for a future fix. Reasoning from the product owner: seats (staff logins) are the real monetization lever, not location count — letting branches stay unlimited on every tier removes friction and encourages clinics to add more staff/users, which is what actually drives revenue.

**Why it matters for the website:** `docs/STRIPE_PAYMENTS.md` in the `dental-pms` repo (and, following from it, this site's pricing/features copy) currently describes branches as a tier differentiator, e.g. "Starter: 1 active location" with multi-branch positioned as a Growth/Clinic Pro/Enterprise upsell.

**What to update:** Remove or rewrite any pricing/features copy that gates branch/location count by plan tier (this includes the pricing page's plan comparison table and any features page copy). Branches should read as unlimited on every plan. Seats/staff-login limits remain the real per-tier differentiator and should stay as-is — only the branch-count language needs to change.

**Status:** ✅ Done 2026-08-29 (docs-sync session). Removed all "1 location" / "Multi-branch" tier language and reframed as "Unlimited branches" on every plan across: `components/pricing/PricingPlans.tsx`, `components/sections/PricingPreview.tsx`, `app/pricing/page.tsx` (meta, feature list, FAQ, hero), plus the subscription and FAQ help articles. Seats + storage remain the only per-tier differentiators. Pricing figures were not touched.
