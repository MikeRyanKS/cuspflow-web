---
title: API keys and scopes
description: Creating, scoping, restricting, rotating and revoking a CuspFlow API key, how a key's bound staff role sets a hard ceiling on what it can ever do, and the rate limits that apply to every plan.
category: developers
order: 2
updated: 2026-11-05
---

An Owner or Administrator creates an API key under **Settings → Integrations → API**.

A key looks like this:

```
cfk_live_a3k9m2p7_xTnQ4vL8ZrB2wK7mD9sF1gH5jN0pC6yE3aU
```

The first part is a non-secret lookup prefix, which is what you see listed in Settings and in your activity log. The long part after it is the secret.

**The secret is shown once, at creation.** We store only a hash of it and cannot recover or re-display it. If you lose it, rotate the key.

Send it as a bearer token on every request:

```bash
curl -H "Authorization: Bearer cfk_live_a3k9m2p7_xTnQ..." \
  "https://zwhwryofdsgmzgqbcghl.supabase.co/functions/v1/api/v1/patients?limit=50"
```

## Two layers decide what a key can do

**The role is the ceiling.** Every key is bound to a staff role when you create it, and the database enforces that role on every single query the key makes, exactly as it would for a person logged into the app. A key bound to Receptionist cannot read payroll no matter how you scope it. A key can never be bound to Owner.

**The scopes narrow it from there.** Give a reporting key `patients:read` and nothing else, and that is all it will ever touch, even though its role could do more.

The practical consequence: scope a key to the smallest thing that does its job, and bind it to the least powerful role that holds that permission. A nightly BI extract wants a read-only role and read-only scopes. A migration needs an Administrator, and only for as long as the migration takes.

## The scopes

| Scope | Grants |
|---|---|
| `patients:read` | Patients, families, patient insurance |
| `patients:write` | Create and edit those |
| `clinical:read` | Medical history, patient journey |
| `clinical:write` | Create and edit medical history |
| `appointments:read` | Appointments |
| `appointments:write` | Create and edit appointments |
| `appointments:delete` | Delete an appointment, separate on purpose |
| `treatment:read` | Treatment plans and their items |
| `treatment:write` | Create and edit treatment plans |
| `billing:read` | Invoices, payments, claims, insurance carriers |
| `billing:totals` | Clinic-wide financial aggregates |
| `inventory:read` | Inventory items, batches, stock movements |
| `inventory:write` | Create and edit inventory items |
| `catalog:read` | Services and prices |
| `catalog:write` | Create and edit catalog items and insurance carriers |
| `lab:read` | Lab cases, their procedures, laboratories |
| `lab:write` | Create and edit laboratories |
| `org:read` | Branches, chairs, staff directory |
| `export:read` | Bulk extract endpoints |
| `imports:write` | Start an import and push batches. Administrator only |
| `imports:rollback` | Undo an import. Administrator only |

A key can only hold a scope its bound role already has in the app. Ask for more and creation fails, naming the scopes that were refused, rather than quietly issuing a key that will 403 on its first real call.

`appointments:delete` is deliberately separate from `appointments:write`. An integration that reschedules appointments has no business removing them.

## Restricting a key to branches

A key can be limited to one or more branches. It then returns only rows belonging to those branches.

One subtlety is worth understanding before you rely on it. A branch restriction applies to records of **where something happened**: appointments, treatment plans, payments, lab cases, the patient journey. It does **not** apply to `patients` or `staff`, because `branch_id` on a person is a durable fact (where a patient first registered, where a staff member is based for HR) and not a record of where anything took place. A patient who registered at your first branch and is treated at your second would otherwise disappear from the second branch's key, which is exactly the wrong answer.

So: branch-restrict a key to limit what activity it sees, not to partition your patient list.

## Expiry, rotation and revoking

A key expires after at most 365 days. You get warning emails 30 days, 7 days and 1 day before, so a nightly job does not stop silently.

**Rotate** issues a new secret on the same key, keeping its name, scopes, branch limits and history. The old secret keeps working for **24 hours**, so you can deploy the new one without a window of downtime, and the Settings page tells you whether anything is still calling with the old one.

**Revoke** takes effect immediately, on the next request, not at the end of an hour or a cache window. Revoked keys are kept forever as a record of what existed, and do not count against your limit.

A clinic can hold **10 active keys** at a time. If you are near that, the usual cause is old keys nobody revoked; revoke rather than rotate when an integration is genuinely gone.

## Rate limits

The same for every plan.

| Limit | Value |
|---|---|
| Requests per minute, per key | 60 |
| Burst | 10 per second |
| Requests per day, per key | 10,000 |
| Requests per minute across all your keys | 120 |
| Page size | 50 by default, 200 maximum |
| Request body | 1 MiB, or 4 MiB on an import batch |

Every response tells you where you stand:

```
RateLimit-Limit: 60
RateLimit-Remaining: 47
RateLimit-Reset: 60
RateLimit: limit=60, remaining=47, reset=60
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 47
X-RateLimit-Reset: 60
```

Both the newer `RateLimit-*` names and the older `X-RateLimit-*` aliases are sent, so whichever your HTTP client already understands will work.

Go over and you get `429` with `Retry-After` in seconds. Wait that long. Retrying straight into the limit in a loop just burns the day's allowance.

**Failed requests count.** The request log is the rate-limit counter, so a `403` or a `404` spends allowance exactly like a `200`. A misconfigured job that is quietly erroring is still costing you quota, which is one good reason to look at your [activity log](#your-own-activity-log).

The per-clinic ceiling of 120 a minute exists so one misbehaving key cannot starve the others.

At 60 requests a minute and 200 rows a page, a full extract of a 50,000-patient clinic takes about four minutes. If you need more for a one-off migration, ask us. Both limits are stored per key and we can raise yours without a code change.

## Read-only clinics

If a subscription lapses into read-only, reads keep working at the full rate and writes return `403` with the code `clinic_read_only`. Your data never becomes unreachable because of a billing problem, which is the same policy that keeps CSV export available in the app.

`meta/whoami` reports this as `"writable": false`, so a migration script can check once up front instead of discovering it on row 400.

## Your own activity log

**Settings → Integrations → API → Activity** lists every request made with your keys over the last 90 days: which key, which endpoint, the status code, how long it took. It is the right place to look when a nightly job has quietly stopped working.

We record the endpoint *pattern* rather than the full URL, and never request bodies or filter values, so the log itself holds no patient data.
