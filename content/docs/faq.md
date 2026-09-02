---
title: Frequently asked questions
description: Answers to common questions about CuspFlow, trials, pricing, plans, seats, storage, data security, currencies and what happens if you cancel.
category: reference
order: 1
updated: 2026-08-29
---

The most common questions about CuspFlow, in one place. For anything else, [email support](mailto:support@cuspflow.co).

## Getting started & pricing

### Is there a free trial?

Yes, every new clinic starts with a fully-featured 30-day free trial. No credit card required. You get the entire platform during the trial, and only add payment details when you're ready to subscribe.

### Do all plans really include every feature?

Yes. There's no feature gating in CuspFlow. Every plan unlocks the full product, waiting room, treatment plans, billing, lab cases, payroll, analytics, online booking, everything, with **unlimited branches**. Plans differ only by how many staff seats and how much imaging storage they include. See [plans & pricing](/docs/account-subscription/choosing-and-managing-your-subscription).

### What if I need more seats or storage than my plan includes?

Add them without changing plans. Additional staff seats are $12/mo each and storage blocks are $10/mo per 50 GB. Add or remove them any time, changes are prorated automatically.

### Can I change plans later?

Absolutely. You can upgrade or downgrade at any time and your data moves with you, nothing is lost when you switch. Upgrades apply immediately (prorated); downgrades take effect at your next renewal.

### How does annual billing work?

Annual billing saves you roughly 20% versus paying monthly. You're billed once per year at the discounted rate shown on each plan.

## Data, security & currencies

### Is our patient data secure?

All data is encrypted in transit (TLS) and at rest. Each clinic's data is completely isolated from every other clinic, enforced by row-level security policies at the database, access to any clinic's data requires authenticated credentials scoped to that clinic.

### What happens when I delete a patient or an appointment?

It's removed from normal use straight away, but not wiped. Deleted records sit in **Settings → Trash** for 30 days, where any Owner or Administrator can restore them with one click. After 30 days they age out to archival storage and are eventually erased in line with the retention rules that apply where your clinic operates. (The only immediate, irreversible deletion is the whole-clinic purge at the end of the 60-day window after a subscription is abandoned.)

### Do you support multiple currencies?

Yes, your clinic's patient-facing invoices, receipts and payments use your own currency and locale, set during onboarding. (CuspFlow subscriptions themselves are billed in USD.)

### What happens to our data if we cancel or don't renew?

Your clinic enters a 60-day view-only window. Every record stays readable and fully exportable the whole time, you can download your complete data at any point, free. Reactivating restores full access instantly. Only if no one returns within those 60 days is the data permanently deleted. See [Billing lifecycle](/docs/account-subscription/billing-lifecycle-trials-and-data-export).

### Can I export my data?

Yes, any time and for free. **Settings → Billing** offers a complete export of everything, patients, medical history, appointments, treatment plans, billing and payments, with no restrictions.

## Using CuspFlow

### Does CuspFlow work for multiple locations?

Yes. CuspFlow is multi-branch: each location keeps its own dental chairs, staff schedules, availability and inventory, while the clinic's data stays unified. See [Branches & dental chairs](/docs/operations/branches-and-chairs).

### Can patients book their own appointments?

Yes. Each clinic can turn on a public [online booking](/docs/patients-scheduling/online-booking) link to share anywhere. A request from a patient CuspFlow already recognises is confirmed automatically; an unrecognised one queues for the front desk to Confirm or Decline, so nothing lands on the calendar or in your patient list unreviewed. A fuller patient-facing portal, where patients view their records and sign forms, is on the roadmap and will be an optional, separately-billable add-on when it launches.

### How many staff can use CuspFlow at once?

As many as your plan's seats allow, plus any extra seats you add. A seat is one staff login; see [Roles & permissions](/docs/core-concepts/roles-and-permissions) for what each person can access. Note that a single login can be signed in on at most **two devices at once**, a third sign-in signs the oldest one out.

### Can I import data from my old system?

Yes. The [Data Migration wizard](/docs/getting-started/importing-your-data) imports branches, staff, patients, families, appointments and your price catalogue from CSV. You fill in CuspFlow's own template, it fuzzy-matches your headers and dry-runs every row, rejects (rather than guesses) anything it can't link, and gives you a re-uploadable report of the failures. Every import can be rolled back within 7 days.
