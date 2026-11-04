---
title: API resource reference
description: The 22 resources the CuspFlow API exposes, which verbs and scopes each one takes, where to get the full field list, and the handful of things about the data model that will save you a wasted afternoon.
category: developers
order: 7
updated: 2026-11-05
---

## The machine-readable spec

```
https://cuspflow.co/api/openapi.json
```

OpenAPI 3.1, covering all 49 endpoints with every field, type, filter, sort key and response. Import it into Postman or Insomnia, or generate a client from it.

Use it as the authority rather than this page. It is generated from the API's own route table and column registry, and our build fails if the two disagree, so it cannot describe a field that does not exist or miss one that does. This page is the human summary.

## Resources

| Resource | Verbs | Scope to read |
|---|---|---|
| `patients` | GET POST PATCH DELETE | `patients:read` |
| `families` | GET POST PATCH DELETE | `patients:read` |
| `patient_insurance` | GET POST PATCH DELETE | `patients:read` |
| `medical_history` | GET POST PATCH DELETE | `clinical:read` |
| `patient_journey` | GET | `clinical:read` |
| `appointments` | GET POST PATCH DELETE | `appointments:read` |
| `treatment_plans` | GET POST PATCH DELETE | `treatment:read` |
| `treatment_items` | GET | `treatment:read` |
| `billing` | GET | `billing:read` |
| `payments` | GET | `billing:read` |
| `insurance_claims` | GET | `billing:read` |
| `insurance_carriers` | GET POST PATCH DELETE | `billing:read` |
| `lab_cases` | GET | `lab:read` |
| `lab_case_procedures` | GET | `lab:read` |
| `laboratories` | GET POST PATCH DELETE | `lab:read` |
| `inventory_items` | GET POST PATCH DELETE | `inventory:read` |
| `inventory_batches` | GET | `inventory:read` |
| `inventory_transactions` | GET | `inventory:read` |
| `catalog_items` | GET POST PATCH DELETE | `catalog:read` |
| `branches` | GET | `org:read` |
| `dental_chairs` | GET | `org:read` |
| `staff` | GET | `org:read` |

Writing needs the matching `:write` scope. Deleting an appointment needs `appointments:delete` specifically. Writing a catalog item or an insurance carrier both need `catalog:write`, since carriers are a reference list maintained in Settings exactly like the catalog.

A resource listed with only `GET` is read-only in v1. `POST` to one returns `405` with `Allow: GET`.

## Meta endpoints

| Endpoint | Scope | What it does |
|---|---|---|
| `GET /v1/meta/whoami` | none | Describes the calling key: clinic, bound role, scopes, branch restriction, clinic timezone, whether writes are allowed, and the rate limits |

Start every integration here. It needs no scope, so it works even when nothing else does, which makes it the right first call when you are debugging a key.

## Import endpoints

| Endpoint | Scope |
|---|---|
| `POST /v1/imports` | `imports:write` |
| `POST /v1/imports/{id}/batches` | `imports:write` |
| `GET /v1/imports/{id}` | `imports:write` |
| `POST /v1/imports/{id}/rollback` | `imports:rollback` |

Both import scopes require a key bound to an Administrator. See [Bulk import](/docs/developers/api-bulk-import).

## Five things about the data model

These are the ones that cost people time. None of them is guessable from the field names, which is exactly why they are here.

### Invoices live in `billing`

The schema also contains an older `invoices` table. It is not exposed through the API and must not be used. Everything about money comes through `billing` (the invoice) and `payments` (what was actually received against it).

### An appointment's assignee is `staff_id`, and it is text

Not `uuid`, and it carries no foreign key, which is a historical quirk rather than a design choice. Every value in it is a staff id, but the column will not stop something else being stored there, so resolve it defensively instead of casting it.

Appointments also carry `dentist_id` and `doctor_id`. Those are returned so that old records stay readable and are **rejected** in a request body. Do not build anything on them.

Treatment plans are different, and the similar-looking field means something real there: `dentist_id` on a treatment plan is the lead clinician, and the wider care team is recorded separately.

### `branch_id` answers two different questions

On an appointment, treatment plan, payment, lab case or journey entry, `branch_id` records **where it happened**. That is the one a branch-restricted key filters on, and the one a write has to supply.

On a patient or a staff member, `branch_id` is a **durable fact about a person**: where the patient first registered, where the staff member is based for HR. It says nothing about where any given visit took place, since patients can be seen at any branch and staff cover for each other. A branch-restricted key deliberately does **not** filter patients or staff by it.

If you need to know which branch a patient was treated at, read it off the appointment or the treatment plan, never off the patient.

### `staff` is a directory, not an HR feed

It returns working identity only: name, role, job roles, work email and phone, branch, active flag, hire date. Salary, hourly rate, commission rates, permissions, personal contact details, home address, date of birth and emergency contacts are not exposed in either direction. The endpoint exists so you can turn an assignee id into a name, not so you can replicate HR.

Service accounts (the invisible principals API keys are bound to) are filtered out of it, so everyone you see is a person.

### Money and commission fields are withheld

`treatment_items` is readable but its commission snapshot is not returned, and `catalog_items` does not expose its commission overrides. Those fields configure staff pay, and payroll is out of v1 in both directions.

This is also why `treatment_items` is read-only. Changing one in the app recalculates that commission snapshot from the plan's clinician and the catalog entry, and that snapshot is what payroll pays against. A write that skipped the recalculation would leave it stale and quietly pay the wrong amount.

## Fields the API never returns

- The soft-deletion timestamp. Deleted records are filtered out instead; `?include_deleted=true` brings them back as ordinary rows.
- Anything to do with pay, permissions or authentication.
- Patients' portal login linkage and raw file storage paths. A bare storage path is useless without a signed URL, and exposing one only invites guessing.
- Free-form metadata blobs with no documented shape. Publishing one would freeze an undocumented structure into the contract permanently.
