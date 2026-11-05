---
title: The CuspFlow REST API
description: A REST API over your clinic's own data, for pulling it into Excel, Power BI or a reporting tool and for migrating records in from another practice management system. Base URL, a working quickstart, the response shape and how versioning works.
category: developers
order: 1
updated: 2026-11-05
---

CuspFlow has a REST API over your clinic's own records. It exists for two jobs:

1. **Getting your data out.** Into Excel, Power BI, Metabase, a data warehouse, or whatever your accountant asks for.
2. **Getting your data in.** Migrating patients, appointments, families and your price catalog from another practice management system, with a rollback if it goes wrong.

It is not a public partner platform. Keys are issued per clinic, there is no self-serve signup, and the audience is your own IT or BI person, or the consultant doing your migration.

Everything the API can see, your clinic can already see. A key is scoped to one clinic and bound to a staff role, and it cannot do anything that role could not do by logging in.

> **Looking for a specific endpoint?** These pages are the narrative: how keys work, how paging works, what the errors mean. For the per-endpoint detail, with every parameter, the scope each call needs, an example response and a console you can run the request from, go to the **[API Reference](/docs/api-reference)**.

## Base URL

```
https://zwhwryofdsgmzgqbcghl.supabase.co/functions/v1/api/v1
```

Put that in a config value rather than hardcoding it. The host is not a secret (it already ships in the web app your staff load every day), but it may move behind a branded domain later.

## Quickstart

Create a key under **Settings → Integrations → API** as an Owner or Administrator, copy the secret (you only see it once), and:

```bash
KEY='cfk_live_a3k9m2p7_xTnQ...'
BASE='https://zwhwryofdsgmzgqbcghl.supabase.co/functions/v1/api/v1'

# What is this key allowed to do?
curl -s -H "Authorization: Bearer $KEY" "$BASE/meta/whoami" | jq

# A handful of patients
curl -s -H "Authorization: Bearer $KEY" \
  "$BASE/patients?limit=5&fields=id,first_name,last_name,phone" | jq
```

And the shape of nearly every real integration, a full extract that pages to the end:

```bash
CURSOR=''
while :; do
  PAGE=$(curl -s -H "Authorization: Bearer $KEY" "$BASE/patients?limit=200&cursor=$CURSOR")
  echo "$PAGE" | jq -c '.data[]'
  CURSOR=$(echo "$PAGE" | jq -r '.meta.next_cursor // empty')
  [ -z "$CURSOR" ] && break
done
```

Start with `meta/whoami`. It needs no scope of its own, and it is the fastest way to tell a wrong key from a missing permission.

## The response shape

Every successful response is `{ "data": ... }`. A list and an import batch add `meta` next to it. A delete returns `204` with no body at all.

```json
{ "data": [ { "id": "..." } ], "meta": { "limit": 200, "next_cursor": "eyJ2..." } }
```

```json
{ "data": { "id": "..." } }
```

There is no other shape on any endpoint or any verb, so you can write one unwrapping helper and forget about it. Errors are the exception, and they arrive as a different content type (`application/problem+json`) so you never have to guess. See [Errors](/docs/developers/api-errors).

## Never put a key in a browser

The API deliberately sends no CORS headers, and a preflight request is answered with a `405`. That is not a gap to work around. An API key in front-end JavaScript, a mobile app bundle or a public repository is a leaked key, and it carries the full access of the role it is bound to.

Call it from a server, a scheduled job, or a desktop BI tool's credential store. If you need a browser to show CuspFlow data, have your own backend hold the key and talk to it.

## The machine-readable spec

```
https://cuspflow.co/api/openapi.json
```

OpenAPI 3.1, covering all 49 endpoints. Import it into Postman or Insomnia, or point a client generator at it. It is generated from the API's own route table and column registry, and the build fails if it drifts, so it cannot describe an endpoint that does not exist.

## Versioning

The version is in the path. We add fields, resources, optional parameters and new status values to `/v1` without warning, so **write your client to ignore fields it does not recognise and to tolerate a status value it has not seen before.** That is the only thing we ask of you.

Anything that would break an existing client ships as `/v2`, with `/v1` kept alive for at least 12 months and `Deprecation` and `Sunset` headers on every response along the way. Everyone holding an active key gets an email.

## What the API cannot do

Worth knowing up front, so you do not design around something that is not there:

- **No money writes.** You can read invoices, payments and insurance claims. You cannot record a payment, run a checkout or issue a refund. That logic currently lives in the app, and exposing a second path to it would let the API and the screen disagree about a total.
- **No live status changes.** You can create an appointment that is already Completed, which is what a migration needs. You cannot move a live appointment through the waiting room, because that is a patient-journey event tied to the branch an operator is standing in. Do it in the app.
- **No payroll, cash reconciliation, expenses or ortho cases.**
- **No treatment item writes.** Reading them is fine. Writing one would also need to recalculate the commission snapshot that payroll pays against.
- **No file content.** X-rays and documents are not available over the API.
- **No webhooks.** Poll with an `updated_at[gte]` filter instead; [Reading data](/docs/developers/api-reading-data) shows the pattern.
- **No restore.** Deleting through the API is a soft delete and the record stays restorable from Trash, but undeleting it is something you do in the app.

## Where to go next

- [API keys and scopes](/docs/developers/api-keys-and-scopes), including the rate limits
- [Reading data](/docs/developers/api-reading-data): pagination, filtering, sorting
- [Writing data](/docs/developers/api-writing-data): idempotency and safe updates
- [Bulk import](/docs/developers/api-bulk-import)
- [Errors](/docs/developers/api-errors)
- [Resource reference](/docs/developers/api-resources)
