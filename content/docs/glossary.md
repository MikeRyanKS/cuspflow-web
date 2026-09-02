---
title: Glossary of terms
description: Plain-English definitions of the dental and practice-management terms used throughout CuspFlow, FDI notation, treatment plans, Bill of Materials, view-only window and more.
category: core-concepts
order: 1
updated: 2026-08-29
---

A quick reference for the terminology you'll see across CuspFlow.

## Clinical terms

- **FDI notation**, the international tooth-numbering system CuspFlow uses on the teeth chart. Each quadrant is numbered: upper-right teeth are 11–18, upper-left 21–28, lower-left 31–38, lower-right 41–48.
- **Quadrant**, one of the four sections of the mouth: Q1 (upper right), Q2 (upper left), Q3 (lower left), Q4 (lower right).
- **Teeth chart**, the interactive FDI diagram in a treatment plan where the clinician marks which teeth are involved.
- **Treatment plan**, the complete record of a single visit: procedures, prescriptions, clinical notes, X-rays, the invoice, consent forms, the care team and the patient's journey timings.
- **Procedure**, a billable clinical action (filling, extraction, cleaning, crown prep).
- **Prescription**, a medicine, gel or product issued during a visit; appears as a line item.
- **SOAP note**, a standard clinical-note format (Subjective, Objective, Assessment, Plan). Note templates help you write these faster.
- **Care team**, the staff who worked on a plan. A **Main Doctor** is required before checkout; anyone who adds an item, changes status or takes payment is recorded automatically.
- **Lab case**, external laboratory work (crown, bridge, denture, aligner) tracked through its lifecycle and linked to a treatment plan.
- **Ortho case**, an orthodontic course of treatment (fixed braces or clear aligners) tracked on the patient's profile over time.
- **Implant component**, a tracked implant part (implant body, abutment, crown, screw) recorded per tooth.

## Front-desk & billing terms

- **Patient code (MRN)**, a unique code per patient for quick lookup, e.g. `PT-00123`.
- **Head of Family**, the billing/contact anchor for a household group. A family's outstanding balance can be viewed as a whole.
- **Walk-in**, a patient who arrives without a booking; CuspFlow creates the appointment, checks them in and adds them to the queue in one step.
- **Booking request**, an appointment a patient asked for through the clinic's online booking link. A request from a recognised patient is confirmed automatically; an unrecognised one waits in the Reception dashboard's Booking Requests card for staff to Confirm or Decline.
- **Patient journey**, the four tracked stages a patient moves through in the Waiting Room: Waiting → In Treatment → Billing → Discharged.
- **Invoice**, the single billing record attached to a treatment plan; tracks items, discount, amount paid and balance.
- **Installment**, a partial payment toward a balance; the invoice moves Unpaid → Partial → Paid as money comes in.
- **Receipt**, proof of payment, printed in A4 or thermal format with a gap-free number per clinic (e.g. `RCP-00001`).
- **Finalised**, an invoice whose balance is cleared; finalising is what allows a patient to be discharged.

## Multi-branch terms

- **Home branch**, the branch on a staff member's HR profile: where they're permanently based. Used for payroll.
- **Working branch**, the branch a staff member is *actually operating in today*, set from the dropdown at the top of the app. Someone can cover another branch for a shift without their HR record changing. Day-to-day records (check-ins, appointments, treatment plans, attendance) are attributed to the working branch.

## Operations terms

- **Price catalog**, the list of procedures and prescriptions your clinic bills for. Separate from inventory. (Shown as "Price Catalog" in the app; renamed from just "Catalog" to make the distinction from physical stock clear.)
- **Trash**, the last 30 days of anything deleted in the app. Deleting removes a record from normal use but keeps the data; anything in Trash can be restored for 30 days (Settings → Trash), after which it ages out to archival storage.
- **Migrated data**, records brought in through the Data Migration wizard. They stay tagged as migrated, and reports have an "exclude migrated data" toggle so a big historical import doesn't distort trend figures.
- **Rejects report**, the CSV the Data Migration wizard hands back listing every row it couldn't import, each with a reason, in your original file's shape, so you fix just those rows and re-upload.
- **Inventory**, the physical stock the clinic owns and consumes (medicines, consumables, equipment).
- **Bill of Materials (BOM)**, the link between a catalog item and the physical stock it uses up. Billing a catalog item automatically deducts the linked inventory.
- **Stock movement**, a recorded arrival ("Stock In") or use ("Stock Out"). Current stock is always the sum of movements, a ledger, not a single editable number.
- **Reorder level**, the threshold at which an item shows a red Low Stock badge.
- **Batch / expiry**, inventory can be tracked by batch with expiry dates and near-expiry alerts.

## Account & subscription terms

- **Seat**, one staff login. Your plan includes a number of seats; extra seats can be added. A single login can be active on at most two devices at once.
- **Storage**, your imaging/document storage quota. You can't drop below what you're already using.
- **Trial**, a 30-day free period for a new clinic, with no card required.
- **View-only window**, if a subscription lapses, the clinic enters a 60-day period where all data stays readable and fully exportable, but new changes pause until billing is fixed. See [Billing lifecycle](/docs/account-subscription/billing-lifecycle-trials-and-data-export).
- **Add-on**, extra capacity billed alongside your plan: recurring staff seats and storage blocks.
