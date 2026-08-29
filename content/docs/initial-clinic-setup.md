---
title: Initial clinic setup
description: Set up your branches, dental chairs and first staff members so the rest of CuspFlow works the way your clinic does.
category: getting-started
order: 2
updated: 2026-08-29
---

A little setup up front makes everything else run smoothly. This guide covers the essentials to configure before you start seeing patients. You'll do most of this in **Settings**, which is available to Owners and Administrators.

## 1. Clinic details

Open **Settings → General** and set:

- **Clinic name, contact details and logo** — these appear on receipts and printed documents.
- **Currency and locale** — your clinic's own currency symbol and number format. Patient invoices, receipts and payments all use this; nothing is hardcoded, so a clinic in Nairobi and one in Dubai each see their own formatting.
- **Tax rate** — used where tax applies.
- **Print format** — full **A4** or narrow **thermal** (till-roll) receipts, depending on your printer.
- **Invoice and receipt prefixes** — for example `RCP-`, which produces gap-free numbers like `RCP-00001`.

## 2. Branches

If you run more than one location, add each under **Settings → Branches & Chairs**. Each branch keeps its own dental chairs, staff schedules, availability and inventory levels. Single-location clinics simply use the one main branch created at signup.

## 3. Dental chairs

CuspFlow tracks **chairs** rather than rooms, so staff always know which seats are free. Add your chairs per branch (name and optional room). Chairs can be marked active or inactive; inactive chairs are hidden from selectors but never deleted, so historical assignments stay intact. See [Branches & dental chairs](/docs/operations/branches-and-chairs) for detail.

## 4. Staff

Add your team under **HR**. A staff member has two parts:

- A **staff record** — their HR profile (name, role, salary, qualifications). This can exist on its own.
- A **login** — granting system access sends an email invitation. A person can have a full HR record long before (or without) being given a login.

Assign each person a [role](/docs/core-concepts/roles-and-permissions), which controls what they can see and do. See [Staff management](/docs/staff-hr/staff-management) for the full workflow.

## 5. Staff schedules

Set each staff member's weekly working hours per branch under **HR → Staff Schedules**. These hours drive appointment availability, so the booking form only offers slots when a doctor is actually working.

## 6. Patient messaging (optional)

- **WhatsApp** — connect your clinic's WhatsApp Business account under **Settings → WhatsApp** so appointment and balance reminders can go out over WhatsApp (with email as a fallback).
- **Notifications** — under **Settings → Notifications**, choose which reminders are active and when they're sent.
- **Online booking** — under **Settings → Online Booking**, turn on the public booking link if you want patients to request appointments themselves. See [Online booking](/docs/patients-scheduling/online-booking).

## Next steps

- Bring your existing records in with [data migration](/docs/getting-started/importing-your-data).
- Build your [price catalog](/docs/operations/price-catalog) of billable procedures and prescriptions.
- Review your [subscription plan](/docs/account-subscription/choosing-and-managing-your-subscription).
