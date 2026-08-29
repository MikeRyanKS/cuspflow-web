# CuspFlow Documentation Content

The human-editable reference for the content of the **help centre** at
**<https://cuspflow.co/docs>** — nothing else. Purely content: the articles, the
glossary and the FAQ.

**How to use it:** to change a help article, edit it here (or point the AI at the
row), and the AI updates the live docs. Every entry links to the page it
describes — click through to see it live.

*(Marketing / non-docs website copy lives in [`WEBSITE_CONTENT.md`](./WEBSITE_CONTENT.md).
Build/architecture details live in [`WEBSITE_DOCUMENTATION.md`](./WEBSITE_DOCUMENTATION.md).)*

**Last updated:** 2026-08-29

---

## Help centre — 9 categories, 29 articles

Home: **<https://cuspflow.co/docs>**

### Getting Started
*Set up your clinic and learn the essentials.* — <https://cuspflow.co/docs/getting-started>

| Article | What it covers |
|---|---|
| [Getting Started with CuspFlow](https://cuspflow.co/docs/getting-started/getting-started) | Guided tour / map of the whole system; the patient-journey path (register → book/check-in → waiting room → treatment plan → payment → discharge); "where things live" table. |
| [Initial clinic setup](https://cuspflow.co/docs/getting-started/initial-clinic-setup) | Clinic details (name, currency/locale, tax, print format A4/thermal, invoice/receipt prefixes), branches, dental chairs, first staff, weekly schedules. |
| [Importing your existing data](https://cuspflow.co/docs/getting-started/importing-your-data) | Data Migration wizard v2: template-first, 7 entities in dependency order, fuzzy header matching, validation dry-run, **rejects rather than guesses** + re-uploadable rejects report, per-import Reports tab, 7-day rollback, migrated-data tagging, up to 5,000 rows. |

### Core Concepts
*The terminology and roles that run through CuspFlow.* — <https://cuspflow.co/docs/core-concepts>

| Article | What it covers |
|---|---|
| [Glossary of terms](https://cuspflow.co/docs/core-concepts/glossary) | Definitions of all domain terms (full list below). |
| [Roles & permissions](https://cuspflow.co/docs/core-concepts/roles-and-permissions) | The 8 roles, how access is decided, custom permission overrides; **per-page Financials access** (front-desk = Overdue + Reconciliation only; summary totals gated by "view financial summaries"); key rules (only Owner changes roles; Owner is never locked out). |

### Patients & Scheduling
*Records, families, appointments and the waiting room.* — <https://cuspflow.co/docs/patients-scheduling>

| Article | What it covers |
|---|---|
| [Patient records & medical history](https://cuspflow.co/docs/patients-scheduling/patient-records) | Demographics, patient code (MRN), instant search, structured medical history (Medical/Dental/Allergy/Medication), adult phone rule. |
| [Families & household billing](https://cuspflow.co/docs/patients-scheduling/families) | Family groups, Head of Family, household balance, under-18 phone exemption. |
| [Booking & managing appointments](https://cuspflow.co/docs/patients-scheduling/appointments) | Pre-booked & walk-in, online-booking summary, multi-doctor calendar, statuses (Scheduled → Checked-In → Completed / Cancelled / No-Show), emergencies, availability. |
| [Online booking & the request queue](https://cuspflow.co/docs/patients-scheduling/online-booking) | Public booking link (Settings → Online Booking), auto-confirm for recognised patients (phone/email match), Booking Requests review card on the Reception dashboard, no auto-created patient records. |
| [Patient reminders](https://cuspflow.co/docs/patients-scheduling/patient-reminders) | Appointment + overdue-balance reminders over WhatsApp (BYO WhatsApp Business, billed by Meta) with email fallback, Settings → Notifications config, per-patient exclusion. SMS retired. |
| [Check-in & the Waiting Room](https://cuspflow.co/docs/patients-scheduling/waiting-room) | Live Kanban board scoped to your working branch (Waiting → In Treatment → Billing → Discharged), 30-min wait alerts, emergency priority, discharge-until-finalised gate. |

### Clinical
*Treatment plans, charting, lab cases and templates.* — <https://cuspflow.co/docs/clinical>

| Article | What it covers |
|---|---|
| [Treatment plans & the teeth chart](https://cuspflow.co/docs/clinical/treatment-plans) | Per-visit plan: procedures, prescriptions, FDI teeth chart, notes, X-rays, care team, price-locking, required Main Doctor. |
| [Lab cases](https://cuspflow.co/docs/clinical/lab-cases) | External lab work lifecycle (Draft → Sent → In Production → Received → Fitted), lab & patient costs, auto-billing back to the plan. |
| [Orthodontics tracking](https://cuspflow.co/docs/clinical/orthodontics) | Fixed braces & clear aligners, stages, status, progress notes on the patient profile. |
| [Treatment & note templates](https://cuspflow.co/docs/clinical/treatment-and-note-templates) | Reusable treatment templates and SOAP note templates for faster charting. |

### Billing & Payments
*Checkout, receipts, balances and insurance claims.* — <https://cuspflow.co/docs/billing-payments>

| Article | What it covers |
|---|---|
| [Checkout & taking payment](https://cuspflow.co/docs/billing-payments/checkout-and-taking-payment) | Review invoice, discounts, payment methods (Cash/Card/Mobile Money/Insurance/Waived), finalise & discharge gate, clinic currency. |
| [Installments & receipts](https://cuspflow.co/docs/billing-payments/installments-and-receipts) | Partial payments (Unpaid → Partial → Paid), A4/thermal receipts, gap-free numbering, refunds. |
| [Overdue payments & follow-up](https://cuspflow.co/docs/billing-payments/overdue-payments) | Outstanding-balance list, per-patient & per-family balances, WhatsApp/email payment reminders. |
| [Insurance claims](https://cuspflow.co/docs/billing-payments/insurance-claims) | Claim lifecycle (Draft → Submitted → Approved/Rejected → Paid), amount claimed vs approved + shortfall, carriers & policies, printable/exportable claims report, Insurance as a payment method. |

### Operations
*Inventory, price catalog, branches and chairs.* — <https://cuspflow.co/docs/operations>

| Article | What it covers |
|---|---|
| [Inventory & stock](https://cuspflow.co/docs/operations/inventory) | Stock-as-ledger, per-branch levels, reorder/low-stock alerts, batch/expiry, Bill of Materials auto-deduction. |
| [Price catalog & Bill of Materials](https://cuspflow.co/docs/operations/price-catalog) | Billable procedures/prescriptions, price-locks-at-checkout, BOM links to inventory. |
| [Branches & dental chairs](https://cuspflow.co/docs/operations/branches-and-chairs) | Multi-location setup, per-branch chairs/schedules/inventory, live chair occupancy. |

### Staff & HR
*Team management, payroll and attendance.* — <https://cuspflow.co/docs/staff-hr>

| Article | What it covers |
|---|---|
| [Staff management & roles](https://cuspflow.co/docs/staff-hr/staff-management) | HR profile vs. login split, adding staff, roles, custom permissions, schedules → appointment availability. |
| [Payroll & commissions](https://cuspflow.co/docs/staff-hr/payroll) | Pay runs (salary + commission + tax), payslips, snapshotted commission rates. |
| [Attendance & time tracking](https://cuspflow.co/docs/staff-hr/attendance) | Clock in/out, hours computation, attendance reports feeding hourly pay. |

### Account & Subscription
*Your CuspFlow plan, add-ons, trials and data export.* — <https://cuspflow.co/docs/account-subscription>

| Article | What it covers |
|---|---|
| [Choosing & managing your subscription](https://cuspflow.co/docs/account-subscription/choosing-and-managing-your-subscription) | Plans, seats, storage, add-ons, plan changes, Settings → Billing. **Unlimited branches on every plan**; two-devices-per-login cap. Pricing figures mirror the pricing page. |
| [Billing lifecycle, trials & data export](https://cuspflow.co/docs/account-subscription/billing-lifecycle-trials-and-data-export) | 30-day trial, payment-lapse flow, 60-day view-only window, free full export, **per-record deletion lifecycle** (soft-delete → 30-day Trash → archival → retention-driven erasure), security note. |

### Reference
*FAQ, reporting and quick answers.* — <https://cuspflow.co/docs/reference>

| Article | What it covers |
|---|---|
| [Frequently asked questions](https://cuspflow.co/docs/reference/faq) | Canonical FAQ (full list below). |
| [Reports & analytics](https://cuspflow.co/docs/reference/reports-and-analytics) | Financials dashboard, Reports tabs, load-once-then-refresh behaviour, "exclude migrated data" toggle, per-page Financials access, CSV export. |

---

## Glossary terms

Full definitions live in the article: **<https://cuspflow.co/docs/core-concepts/glossary>**

- **Clinical:** FDI notation · Quadrant · Teeth chart · Treatment plan · Procedure · Prescription · SOAP note · Care team · Lab case · Ortho case · Implant component
- **Front-desk & billing:** Patient code (MRN) · Head of Family · Walk-in · Patient journey · Invoice · Installment · Receipt · Finalised
- **Operations:** Price catalog · Inventory · Bill of Materials (BOM) · Stock movement · Reorder level · Batch / expiry
- **Account & subscription:** Seat · Storage · Trial · View-only window · Add-on

---

## FAQ (canonical)

Full text lives in the article: **<https://cuspflow.co/docs/reference/faq>**. The
pricing page shows only the *Getting started & pricing* questions and links here
for the rest — don't duplicate the whole FAQ.

**Getting started & pricing**
1. **Is there a free trial?** — Yes, 30 days, full platform, no card.
2. **Do all plans really include every feature?** — Yes, no feature gating.
3. **What if I need more seats or storage than my plan includes?** — Add-ons ($12/seat, $10 per 50 GB), prorated.
4. **Can I change plans later?** — Yes; upgrades immediate (prorated), downgrades at renewal; data moves with you.
5. **How does annual billing work?** — ~20% saving, billed once a year.

**Data, security & currencies**
6. **Is our patient data secure?** — Encrypted in transit & at rest, per-clinic isolation, HIPAA-aligned.
7. **Do you support multiple currencies?** — Yes for patient-facing money; subscriptions in USD.
8. **What happens to our data if we cancel or don't renew?** — 60-day view-only window, free export, then deletion.
9. **Can I export my data?** — Yes, any time, free, complete (Settings → Billing).

**Using CuspFlow**
10. **Does CuspFlow work for multiple locations?** — Yes, multi-branch with per-branch isolation.
11. **Can patients book their own appointments?** — Online booking per clinic; fuller portal on the roadmap (optional add-on).
12. **How many staff can use CuspFlow at once?** — As many as your plan's seats + add-on seats allow.
13. **Can I import data from my old system?** — Yes, the free built-in Data Migration wizard.
