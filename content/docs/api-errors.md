---
title: API errors
description: Every error code the CuspFlow API returns, what causes it, and whether retrying will help. Errors are RFC 9457 problem documents, and the type link in each one points at its own entry on this page.
category: developers
order: 6
updated: 2026-11-05
---

Errors come back as RFC 9457 problem documents, with the content type `application/problem+json`, so you can tell an error from a result without parsing the body:

```json
{
  "type": "https://cuspflow.co/docs/developers/api-errors#insufficient_scope",
  "title": "Insufficient scope",
  "status": 403,
  "code": "insufficient_scope",
  "detail": "This key does not hold 'appointments:read'.",
  "request_id": "0f3a9c2e-7b41-4e2a-9c88-1d4f0a6b2e55"
}
```

**Branch on `code`.** Not on `title`, which we may reword, and not on `status` alone, since several codes share one. The `type` link lands on that code's own section on this page.

**`request_id`** is on every response, success or failure, in the body and in the `X-Request-Id` header. Quote it when you ask us about something; it is in our logs and on your own activity log in Settings. If you send your own `X-Request-Id`, we echo it back rather than inventing one, so you can correlate with your side.

**Validation errors carry an `errors` array** naming each offending field:

```json
{
  "status": 422,
  "code": "validation_failed",
  "errors": [
    { "field": "last_name", "code": "required", "message": "Required when creating this record." }
  ]
}
```

## Two rules we hold to

**A record belonging to another clinic returns 404, never 403.** A 403 would confirm that the id is real somewhere, which is itself a leak across clinics. So "no such record" and "not yours" are deliberately indistinguishable, and you cannot use this API to probe whether an id exists elsewhere.

**No field value ever appears in an error message.** An error names the *field* that was wrong, never what you put in it. That holds for `title`, `detail` and every entry in `errors`, because those strings end up in logs, and the values flowing through this API are patients' names, phone numbers and dates of birth.

## What to retry

Retry `429`, `500` and `503`, with backoff, honouring `Retry-After` when it is present. Retry `409 idempotency_request_in_progress` after a short pause.

Everything else in the 400s will keep failing identically until the request itself changes. A retry loop on a `403` just spends your rate limit, and failed requests count against it.

## 400 — the request was wrong

### malformed_request

A parameter is unusable: a `limit` that is not a positive whole number, an unknown filter operator, an `Idempotency-Key` over 255 characters, an `include_deleted=true` on a resource with no soft delete, or a missing `Idempotency-Key` on an import batch. `detail` says which.

### invalid_json

The request body is not valid JSON, or is not a JSON object. Check your serialiser and your `Content-Type`.

### unknown_field

A field name was not accepted. On a read this means `fields=`, `sort=` or a filter named something unavailable, and `detail` lists what is allowed. On a write it means the body named a field that cannot be written, and `errors` gives a per-field reason: `unknown_field`, `server_managed`, `legacy_read_only`, `not_writable` or `create_only`. [Writing data](/docs/developers/api-writing-data) explains each.

### invalid_cursor

The `cursor` value is not one we issued. Cursors are opaque: pass back `meta.next_cursor` exactly as given, and do not construct, decode or edit one. Start the listing again from the beginning.

## 401 — the key did not work

### unauthorized

No `Authorization` header, a header that is not `Bearer <key>`, a malformed key, or a secret that does not match. The commonest causes are a truncated copy-paste and a shell that dropped part of the key; check with `GET /v1/meta/whoami`.

### key_expired

The key is past its expiry date. Keys last at most 365 days, with warning emails at 30, 7 and 1 day. Expired keys do not come back: create a new one.

### key_revoked

Someone revoked the key in Settings. Revocation is immediate and permanent. If this appeared unexpectedly, ask whoever administers your clinic before creating another.

## 403 — the key is real but not allowed

### insufficient_scope

The key does not hold the scope this endpoint needs. `detail` names the scope. Check `GET /v1/meta/whoami` for what the key actually holds; you cannot add a scope to an existing key, so create a new one with the right set. See [keys and scopes](/docs/developers/api-keys-and-scopes).

### forbidden_role

The key holds the scope, but the staff role it is bound to is not permitted to do this. Rollback is the usual case: it requires a key bound to an Administrator. The role is enforced by the database rather than by the gateway, so this is a hard limit and not a setting.

### branch_not_allowed

The key is restricted to specific branches and the request named a different one, either in a filter or as `branch_id` in a write body. `GET /v1/meta/whoami` lists the key's `branch_ids`; `null` there means every branch.

### clinic_read_only

The clinic's subscription is read-only, so writes are refused while reads keep working at the full rate. Your data is never locked away over a billing problem. `GET /v1/meta/whoami` reports this as `"writable": false`, which a migration script should check before it starts rather than on row 400.

### clinic_seat_locked

The principal this key is bound to has been locked by a seat limit. Rare, and it means something is wrong on our side rather than yours, because API principals are exempt from seat counting. Send us the `request_id`.

## 404 — no such thing

### not_found

No such endpoint, or no such record visible to this key. Also what you get for a record in another clinic, and for a malformed record id. Remember that a soft-deleted record is invisible by default: add `?include_deleted=true` if you are expecting one.

### unsupported_version

The path named an API version that does not exist. `detail` lists the versions that do. Today that is `v1`.

## 405 — wrong verb

### method_not_allowed

The endpoint exists but not with this method, and the `Allow` header lists what it does accept. A `POST` to a read-only resource gives `Allow: GET`, which distinguishes "this resource is not writable in v1" from "this resource does not exist".

A CORS preflight `OPTIONS` also lands here. That is deliberate: this API is not callable from a browser, because a key in browser-reachable code is a leaked key.

## 409 — a conflict with current state

### conflict

The request clashes with something already in progress or already settled. Starting an import when your clinic started another in the last 6 hours, or rolling back an import whose 7-day window has closed. `detail` says which.

### idempotency_request_in_progress

An identical request with the same `Idempotency-Key` is still running. Wait for `Retry-After` seconds and try again; do not start a second one in parallel.

## 412 — the record moved underneath you

### precondition_failed

You sent `If-Match` and the record changed since you read it, so nothing was written. Re-read the record, decide what the new state means for your change, and retry with the fresh `ETag`.

This is the error you want. Without `If-Match` the same situation silently overwrites somebody else's edit and nobody finds out.

## 422 — the request was understood but not valid

### validation_failed

A required field is missing on create, or a value is not acceptable. `errors` names each field with a reason code. Note the split from `unknown_field`: a field you **may not write** is a 400, a required field you **left out** is a 422.

### idempotency_key_reuse

This `Idempotency-Key` was already used with a **different** request body. We refuse rather than replay, because replaying someone else's response for a different request is how data gets quietly corrupted. Use a key that identifies the operation, and a fresh key for a genuinely different write.

## 429 — too many requests

### rate_limited

You are over a limit: 60 requests a minute or 10,000 a day per key, 120 a minute across all your clinic's keys, or the separate import-batch bucket. `Retry-After` gives the seconds to wait, and every response carries `RateLimit-Remaining` so you can pace yourself before reaching this.

Failed requests count too, so a job stuck in a `403` loop will eventually also be rate-limited.

## 500 and 503 — our problem

### internal_error

Something broke on our side. Retry with backoff. If it persists, send us the `request_id`: it leads straight to the failure in our logs.

### upstream_unavailable

A service the API depends on is temporarily unavailable. Retry with backoff, honouring `Retry-After`.
