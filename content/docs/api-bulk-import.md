---
title: Bulk import over the API
description: Migrating patients, appointments, families and your price catalog into CuspFlow over HTTP in batches of up to 500 rows, with per-row results, a required idempotency key and a 7-day rollback that refuses to delete anything already in use.
category: developers
order: 5
updated: 2026-11-05
---

If you are moving data in from another practice management system, use this rather than a loop of creates. It is the only path that can be **rolled back**, and the only one that reports each row's outcome separately.

If you would rather not write code at all, the app has a CSV wizard under **Settings → Data Migration** that does the same job from a spreadsheet. See [Importing your existing data](/docs/getting-started/importing-your-data). The API exists for migrations too large or too repetitive for a wizard, and for tools that are generating rows rather than reading a file.

## Three calls

```bash
# 1. Open an import
IMPORT=$(curl -sX POST "$BASE/imports" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"entity":"patients","source_label":"Dentrix export 2026-11"}' | jq -r .data.id)

# 2. Push batches of up to 500 rows. Idempotency-Key is REQUIRED here
curl -X POST "$BASE/imports/$IMPORT/batches" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -H "Idempotency-Key: batch-0001" \
  -d '{"rows":[{"first_name":"Ada","last_name":"Lovelace"}]}'

# 3. Check how it went
curl -H "Authorization: Bearer $KEY" "$BASE/imports/$IMPORT"

# ...or undo the whole thing, within 7 days
curl -X POST "$BASE/imports/$IMPORT/rollback" -H "Authorization: Bearer $KEY"
```

`source_label` is free text and shows up in the app's Import Reports tab, so put something a human will recognise in six months.

## What you can import

`patients`, `appointments`, `families` and `catalog_items`. Those are the entities that are both writable over the API and covered by rollback, and we will not let you import under an entity that rollback does not understand, because an import you cannot undo is the one kind you should not attempt.

Import in dependency order: families before patients if you are linking them, patients before appointments.

## Batches and per-row results

A batch holds **1 to 500 rows** and at most **4 MiB**. The response is `200` with a result per row, not a 207:

```json
{
  "data": [
    { "index": 0, "status": "inserted", "id": "9f1c..." },
    { "index": 1, "status": "failed", "error": "duplicate key value violates..." }
  ],
  "meta": { "inserted": 1, "failed": 1, "batch_size": 2 }
}
```

`index` is the position in the array you sent, so you can line failures up against your source rows.

**One bad row fails only itself.** That is worth spelling out, because it is not what the database does by default. A batch is a single multi-row insert, and in Postgres that is all or nothing: one duplicate phone number would fail all 500 rows. When a batch fails as a whole we retry it row by row, so you get 499 inserted and 1 failed at a known index rather than a batch that "did not work" and 500 rows you now have to reconcile by hand.

The cost of that safety net is up to one round trip per row on a bad batch, which is why batches are capped at 500. Rows are also validated for shape **before** any are inserted, so a batch with a malformed row costs one round trip rather than 500.

## The idempotency key is required here

Everywhere else in the API an `Idempotency-Key` is optional. On a batch it is required, and a batch without one is a `400`.

The reason is arithmetic. A batch inserts up to 500 people. If the connection drops after the server committed but before you read the response, you have no way to know whether it worked, and retrying without a key would create 500 duplicate patients. During a migration, retrying on a timeout is the normal case rather than the exceptional one.

Use a stable key per batch, like `batch-0001`, derived from your position in the source file rather than from a random value per attempt. Resending the same key with the same rows replays the original response, so a retry is safe and a duplicate is impossible.

## Checking progress

```bash
curl -H "Authorization: Bearer $KEY" "$BASE/imports/$IMPORT"
```

```json
{
  "data": {
    "id": "...",
    "entity": "patients",
    "summary": { "inserted": 4820, "failed": 12 },
    "rows_present": 4820,
    "rollback_available": true
  }
}
```

`summary` is the running total of what the batches reported. `rows_present` is how many of those rows are **still there now**, which is what a rollback would actually act on, and the two drift apart if anyone has deleted records since. `rollback_available` tells you whether the 7-day window is still open.

These are the same numbers the app shows under **Settings → Data Migration → Import Reports**, so your migration tool and the clinic's own screen agree.

## Rolling back

```bash
curl -X POST "$BASE/imports/$IMPORT/rollback" -H "Authorization: Bearer $KEY"
```

```json
{ "data": { "deleted": 4818, "skipped": 2 } }
```

Three things to know:

**It needs an Administrator.** Rollback deletes across several tables, so both `imports:write` and `imports:rollback` are restricted to a key bound to an Administrator role.

**It is conservative, and that is the point.** A row that anything now references, or that anyone has edited since the import, is **skipped** rather than deleted, and counted in `skipped`. It will never remove a patient who has since had an appointment booked, or a catalog item already used on a treatment plan. A rollback is for undoing a bad import on the day, not for erasing history after the clinic has started working with the data.

**The window is 7 days.** After that the endpoint returns `409` and you unpick it in the app.

## Limits

| | |
|---|---|
| Rows per batch | 500 |
| Bytes per batch | 4 MiB |
| Rows per import | 500,000 |
| Concurrent imports | one per clinic |
| Rollback window | 7 days |

Starting an import is refused with a `409` if your clinic started another one in the **last 6 hours**. Two migrations running into the same tables at once make per-row failures impossible to attribute and rollback ambiguous about which rows it owns, so we refuse rather than let you find that out afterwards.

Batches are also rate-limited like any other request, so pace the loop at 60 a minute. At 500 rows a batch that is 30,000 rows a minute, which is faster than most source systems can export.
