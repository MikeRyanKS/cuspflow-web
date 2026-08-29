---
title: Online booking & the request queue
description: Share a public booking link so patients can request appointments; recognised patients are confirmed automatically, and unrecognised ones queue for staff to Confirm or Decline.
category: patients-scheduling
order: 5
updated: 2026-08-29
---

Online booking lets patients request an appointment themselves, from a link you share — without anyone at the front desk having to pick up the phone. It's off until you turn it on.

## Turning it on

Go to **Settings → Online Booking**. From there you control:

- Whether the public booking page is **live**.
- What the form asks for.
- How far ahead patients are allowed to book.

You get a **public link** to share on your website, your Google listing, social media, or a WhatsApp auto-reply.

## What the patient sees

The patient opens the link, enters their details and what they need, and picks a time. The form only offers slots when a doctor is actually working — it reads the same [schedules](/docs/getting-started/initial-clinic-setup) the internal booking form uses, so patients can never request an impossible time.

## What happens next

CuspFlow checks whether it already knows the patient, by **phone number or email**:

- **Recognised** (matches an existing patient record) → the appointment is **confirmed automatically** and shows up on the [calendar](/docs/patients-scheduling/appointments) straight away. The patient gets a confirmation email.
- **Not recognised** → the request goes into a **Booking Requests** card on the Reception dashboard. It is **not** on the calendar and **no patient record is created** yet.

## The request queue

On the Reception dashboard, the **Booking Requests** card lists every pending request. For each one, staff can:

- **Confirm** — CuspFlow creates the patient record (if needed) and the appointment, and emails the patient the confirmed details.
- **Decline** — the request is cleared with no record created.

This keeps spam and mistyped bookings out of your patient list. A real person always reviews a new patient before they're added.

## Related

- [Booking & managing appointments](/docs/patients-scheduling/appointments)
- [Patient records](/docs/patients-scheduling/patient-records)
