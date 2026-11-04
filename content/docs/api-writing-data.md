---
title: Writing data through the API
description: Creating, updating and deleting records over the CuspFlow API, which fields each resource accepts and why some are refused, retrying safely with an idempotency key, and using ETags so a concurrent edit cannot be silently overwritten.
category: developers
order: 4
updated: 2026-11-05
---

Ten resources accept writes: patients, families, patient insurance, medical history, appointments, treatment plans, catalog items, inventory items, laboratories and insurance carriers. Everything else is read-only in v1, and asking for `POST` on one returns a `405` with an `Allow: GET` header so you can tell "wrong verb" from "no such endpoint".

If you are moving a lot of records in at once, use [bulk import](/docs/developers/api-bulk-import) instead of a loop of creates. It is the only path that can be rolled back.

## Creating a record

```bash
curl -X POST "$BASE/patients" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{"first_name":"Ada","last_name":"Lovelace","phone":"0700000000"}'
```

You get `201`, a `Location` header pointing at the new record, an `ETag`, and the created row under `data`:

```json
{ "data": { "id": "9f1c...", "patient_code": "ADA-00419", "first_name": "Ada", "...": "..." } }
```

Note `patient_code` in that response. You did not send it, and you cannot: codes come from your clinic's own sequence, so the API generates one and sending your own is refused.

## Only declared fields are accepted

Send a field the resource does not accept and the write is refused, with an `errors` array naming each offending field. **The error never echoes the value you sent**, because values are patient data and errors get logged.

Five different reasons get five different codes, because "unknown field" would be actively misleading for four of them:

| Field code | Status | What it means |
|---|---|---|
| `unknown_field` | 400 | No such field on this resource. Check the spelling. |
| `server_managed` | 400 | We set it: `id`, `clinic_id`, `created_at`, `updated_at`, `deleted_at`, `import_report_id`. |
| `legacy_read_only` | 400 | Returned on old records but not accepted on a write. On appointments, `dentist_id` and `doctor_id`; use `staff_id`. |
| `not_writable` | 400 | A real field, deliberately not writable. `patient_code` is generated; commission and payroll fields are exposed in neither direction. |
| `create_only` | 400 | Settable when creating, not when changing. See below. |
| `required` | 422 | A required field was missing on create. |

Note the split: a field you **may not write** is a `400`, a required field you **left out** is a `422`.

```json
{
  "status": 400,
  "code": "unknown_field",
  "detail": "1 field(s) cannot be written.",
  "errors": [
    { "field": "patient_code", "code": "not_writable", "message": "Not writable through the API." }
  ]
}
```

**`clinic_id` always comes from your key, never from your body.** Sending one is an error rather than an override, and even if the gateway let it through the database would reject the row.

## Appointments and treatment plans need a branch

Records of things that *happen* carry the branch they happened at, and the API cannot guess it. Creating an appointment or a treatment plan without `branch_id` is a `422`.

This is not a formality we could default away. A key is bound to a service principal rather than a person, so it has no "branch I am working at today", and borrowing one from somewhere else would quietly file a visit at the wrong site. Send the branch you mean. `GET /v1/branches` lists them.

## Status is create-only, on purpose

`status` on an appointment or a treatment plan can be set when you **create** the record, but not changed afterwards. A `PATCH` that includes it returns `400` with the field code `create_only`.

That asymmetry is deliberate, and it is the one part of this API most likely to look like a bug:

- **Creating** an already-Completed appointment states a historical fact. A migration from another system has to be able to do that, and nothing follows from it.
- **Changing** a live appointment's status is an event, not a fact. In the app it moves the patient through the waiting-room pipeline, closes the previous stage, records how long it lasted, and stamps the branch the operator is physically working in. The API has no operator and no working branch, so it would record the status and skip the consequences, and your waiting room would drift away from reality one check-in at a time.

So: load history through the API, run the day in the app. We will open this up once that transition moves into the database where both paths can share it.

## Updating a record

```bash
curl -X PATCH "$BASE/patients/$ID" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"phone":"0711111111"}'
```

A `PATCH` is partial: send only what changes. It returns `200` and the updated row under `data`. An empty body is a `422`, so a bug that sends `{}` fails loudly instead of looking like a successful no-op.

## Not overwriting someone else's edit

Single-record `GET` returns an `ETag`. Send it back as `If-Match` and the write applies **only** if nothing changed in between. If it did, you get `412` and nothing is written.

```bash
ETAG=$(curl -sD- -o/dev/null -H "Authorization: Bearer $KEY" \
  "$BASE/patients/$ID" | grep -i '^etag:' | cut -d' ' -f2- | tr -d '\r')

curl -X PATCH "$BASE/patients/$ID" \
  -H "Authorization: Bearer $KEY" -H "If-Match: $ETAG" \
  -H "Content-Type: application/json" -d '{"phone":"0711111111"}'
```

Without `If-Match`, the last writer wins and nobody finds out. With it, you find out and can re-read and retry. Use it for anything that reads a value, computes from it and writes it back.

The `ETag` changes on every successful write, so a stale one is a stale one: reusing the token you just used will correctly fail.

`insurance_carriers` has no modification timestamp and so cannot be versioned this way. Sending `If-Match` there returns `400` rather than silently ignoring it, so you are never under the impression you have protection you do not have.

## Deleting

```bash
curl -X DELETE "$BASE/patients/$ID" -H "Authorization: Bearer $KEY"
```

`204`, no body. It is a **soft** delete: the record stops appearing in the API, but it still exists and staff can restore it from Trash in the app. You can see it again with `?include_deleted=true`. There is no way to hard-delete anything through this API, and no way to restore through it either.

`If-Match` works on a delete too.

## Retrying safely

Send an `Idempotency-Key` header on any write. Any unique string up to 255 characters works; a UUID per logical operation is the easy choice.

- **Same key, same body** returns the first response instead of acting twice, for 24 hours, with `Idempotency-Replayed: true` on the replay. This is what makes a timeout safe to retry.
- **Same key, different body** is a `422`. That is how a key-reuse bug surfaces loudly rather than corrupting data.
- **Same key while the first call is still running** is a `409`, with `Retry-After`.
- **A write that failed** releases its key immediately, so you can fix the body and retry with the same key rather than being locked out of it for a day.

The key should identify the operation, not the attempt. Generating a fresh UUID on each retry gives you exactly no protection, which is the most common way to get this wrong.

Idempotency is optional everywhere except import batches, where it is required.
