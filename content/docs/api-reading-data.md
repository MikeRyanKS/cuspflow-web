---
title: Reading data from the API
description: Cursor pagination, choosing fields, sorting, filtering with comparison and list operators, polling for changes, deleted and imported records, and how date-only parameters resolve in your clinic's own timezone.
category: developers
order: 3
updated: 2026-11-05
---

Every list endpoint works the same way, so once you have written one extract you have written all of them. Examples below assume:

```bash
KEY='cfk_live_...'
BASE='https://zwhwryofdsgmzgqbcghl.supabase.co/functions/v1/api/v1'
```

## Pagination

Paging is **cursor-based**. Read a page, then follow `meta.next_cursor` until it comes back `null`.

```bash
curl -H "Authorization: Bearer $KEY" "$BASE/patients?limit=200"
```

```json
{
  "data": [ { "id": "...", "first_name": "..." } ],
  "meta": { "limit": 200, "next_cursor": "eyJ2IjoiMjAyNi0xMS0wNC..." }
}
```

```bash
curl -H "Authorization: Bearer $KEY" "$BASE/patients?limit=200&cursor=eyJ2IjoiMjAyNi0xMS0wNC..."
```

A `Link: <...>; rel="next"` header carries the same cursor if your client prefers to follow those.

Three rules, and the first is the one that trips people up:

**Keep going until `next_cursor` is `null`.** A cursor is returned whenever the page came back full, which means the last full page gives you a cursor and the next request returns an empty `data` array and a null cursor. That is normal. Do not stop early because a page "looked like the end".

**Treat the cursor as opaque.** It encodes the sort position of the last row you saw. Pass it back byte for byte and do not try to construct or edit one.

**There is no `offset` or `page` parameter**, and that is deliberate rather than missing. Offset paging silently skips and duplicates rows when records are being created while you page, which during a long nightly extract is guaranteed to happen. It also hits a hard ceiling in the underlying data layer at 1,000 rows, so an offset API would stop dead partway through a large table without ever returning an error. A cursor has neither problem.

`limit` above 200 is **clamped** to 200 rather than rejected, so asking for 1,000 gets you 200 rows and a cursor to carry on with instead of a failure in the middle of a migration. A `limit` that is not a positive whole number is a `400`.

### Counting

Add `include_total=true` and read `meta.total`:

```bash
curl -H "Authorization: Bearer $KEY" "$BASE/patients?limit=1&include_total=true"
```

It runs a second query, so use it once at the start of a job to size a progress bar, not on every page.

## Choosing fields

```
?fields=id,first_name,last_name,phone
```

Smaller payloads, faster extracts, and a smaller surface if the key is ever mishandled. `id` is always returned, because it is the cursor's tiebreak and the only stable handle on a row.

Asking for a field that is not available is a `400` naming it, rather than being silently dropped, so a typo shows up on your first call instead of as a mysteriously empty column three months later.

## Sorting

```
?sort=-created_at     # newest first
?sort=last_name       # A to Z
```

A leading `-` means descending. Each resource declares which columns it can be sorted by; anything else is a `400` whose message lists the ones that work. The [resource reference](/docs/developers/api-resources) has them per resource.

## Filtering

```
?branch_id=<uuid>
?status=Scheduled
?scheduled_time[gte]=2026-11-01&scheduled_time[lte]=2026-11-30
?status[in]=Scheduled,Checked-In
?is_active=true
```

| Operator | Meaning |
|---|---|
| none | equals |
| `[gte]` `[lte]` | greater or equal, less or equal |
| `[gt]` `[lt]` | strictly greater, strictly less |
| `[in]` | one of a comma-separated list |
| `[is]` | `null` checks |

Raw database filter syntax is not passed through, and a query parameter we do not recognise is an **error rather than ignored**. That matters more than it sounds: a quietly ignored filter returns far more rows than you asked for, and nothing about the response tells you so.

## Polling for changes

There are no webhooks. Poll with a timestamp filter and keep the high-water mark yourself:

```bash
curl -H "Authorization: Bearer $KEY" \
  "$BASE/patients?updated_at[gte]=2026-11-04T00:00:00Z&sort=updated_at&limit=200"
```

Sort **ascending** on the same column you are filtering on. If you sort descending, a row updated while your run is in progress can be inserted ahead of your cursor and never seen.

Store the highest `updated_at` you actually processed, not the time you started, and overlap by a minute on the next run. Records are cheap to re-process and expensive to miss.

## Deleted records

Deleting through the API is a **soft** delete: the record is marked and stops being returned, but it still exists and is still restorable from Trash in the app. Nothing in this API hard-deletes anything.

Deleted records are excluded from every read by default, and the deletion timestamp itself is never returned as a field. Add `include_deleted=true` on a resource that supports soft delete to see them. Sending it to the one resource that does not is a `400` rather than being quietly ignored.

## Leaving imported data out

If you have migrated historical records in, `exclude_migrated=true` leaves them out, exactly like the toggle in the app does:

```bash
curl -H "Authorization: Bearer $KEY" "$BASE/patients?exclude_migrated=true"
```

Useful when you want "patients we actually registered" rather than "every row in the table". It applies to the resources that carry an import stamp; the [resource reference](/docs/developers/api-resources) marks which.

## Dates and times

Timestamps come back as full ISO-8601 with an offset, for example `2026-11-05T14:30:00+03:00`.

Date-only values resolve in **your clinic's timezone**, not our server's and not your laptop's. That is the whole point: "today's appointments" means the same thing through the API as it does on the screen in your clinic, even if the person running the script is in another country. `meta/whoami` returns that timezone as an IANA name, so a script can line its own date arithmetic up with it:

```json
{ "data": { "clinic_timezone": "Africa/Kampala" } }
```

If you build day boundaries yourself, build them in that zone. Taking the UTC date of a local timestamp is the classic way to lose the last few hours of every day for a clinic east of Greenwich.
