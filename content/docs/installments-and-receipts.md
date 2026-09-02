---
title: Installments & receipts
description: Let patients pay across multiple visits, and print receipts in A4 or thermal format with gap-free numbering.
category: billing-payments
order: 2
updated: 2026-07-21
---

Not every patient pays in one go, and different clinics print receipts differently. CuspFlow handles both.

## Installments

Patients can pay across multiple visits. Each payment is recorded separately with its own method and date, and the invoice's paid total and status update cumulatively. The invoice moves through:

**Unpaid → Partial → Paid**

automatically as money comes in. You take each installment through the normal [checkout](/docs/billing-payments/checkout-and-taking-payment) flow, just enter the amount being paid this time.

## Receipts

Receipts print in two formats depending on your printer, set in **Settings → General**:

- **A4**, a full-page receipt.
- **Thermal**, a narrow till-roll receipt.

Receipt numbers are assigned by the system in a **gap-free sequence per clinic** (for example `RCP-00001`), so your records stay complete and auditable.

## Refunds

Where a refund is needed, it's recorded against the payment with a full audit trail, so your financial history stays accurate.

To chase unpaid balances, see [Overdue payments](/docs/billing-payments/overdue-payments).
