---
title: Inventory & stock
description: Track medicines, consumables and equipment as a movement ledger, with per-branch levels, reorder alerts and batch/expiry tracking.
category: operations
order: 1
updated: 2026-07-21
video: https://youtu.be/mlvzW-zejbQ
---

The Inventory module tracks the physical items your clinic owns and consumes — medicines, consumables and equipment. Find it under **Inventory**.

## Stock is a ledger, not a counter

Every arrival (**Stock In**) and every use (**Stock Out**) is recorded as a permanent movement, and current stock is always calculated by summing those movements. Nothing is ever deleted, so you get a full audit trail and there's no single number that can drift out of sync.

## Recording movements

- **Stock In** — record an arrival, with an optional batch and expiry.
- **Stock Out** — record usage. This can be manual, or written automatically when a linked catalog item is billed (see below).

## Low-stock alerts

Each item has a **reorder level**. At or below it, the item shows a red **Low Stock** badge so nothing runs out unnoticed.

## Per branch

Stock is tracked **per branch** — each location has its own independent levels, so a busy branch running low doesn't hide healthy stock elsewhere.

## Batches and expiry

Items can carry **batch and expiry** information, with alerts for stock nearing expiry — important for medicines.

## Bill of Materials (BOM)

The **Bill of Materials** links the [price catalog](/docs/operations/price-catalog) to physical inventory. It answers: "when I bill this catalog item to a patient, what stock gets used up?" For example, billing "Amoxicillin 500mg" deducts one unit of the Amoxicillin inventory item; a whitening procedure might consume a gel sachet *and* a pair of gloves. When a catalog item with a BOM is added to a [treatment plan](/docs/clinical/treatment-plans), CuspFlow automatically writes the matching stock-out movements.

> The **price catalog** (what patients are billed) is a separate list from **inventory** (physical stock). The BOM is the bridge between them.
