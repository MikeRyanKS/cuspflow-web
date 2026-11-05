---
title: "End-of-Day Cash Reconciliation for a Dental Clinic"
description: "A simple end-of-day routine for dental clinic cash reconciliation: count the drawer against what each cashier took, and find the gap the same day."
date: "2026-11-09"
author: "The CuspFlow Team"
readingTime: "3 min read"
publishAt: "2026-11-09T12:50"
cluster: "B. Operational how-to"
market: "All markets"
primaryKeyword: "dental clinic cash reconciliation"
tags:
  - dental clinic cash reconciliation
  - dental clinic cash handling
  - clinic end of day till count
---

Dental clinic cash reconciliation is one subtraction done every evening: what the system says each cashier took in cash, minus what is actually in their drawer. If the two match, you close up. If they do not, you have one day of transactions to look through and one person to ask, which is a five-minute conversation. Leave it to month end and it becomes nobody's fault.

![End-of-day cash reconciliation: what the system says the cashier took, minus what is actually in the drawer, equals a difference you find the same day](/blog/dental-clinic-cash-reconciliation/end-of-day-till-count-variance.svg "The gap is only useful while it is still small enough to explain.")

## What makes the subtraction possible?

Every payment has to carry two things: how it was paid, and who took it.

This sounds obvious and it is where most clinics come unstuck. If your records show a day's total takings without separating cash from card from mobile money, you cannot reconcile a drawer, because you do not know how much of that total was ever supposed to be in it. And if payments are not attributed to the person who accepted them, a shortfall belongs to the whole front desk, which in practice means it belongs to nobody.

So the first fix is not a spreadsheet. It is making sure that at the moment of [taking the payment](/docs/billing-payments/checkout-and-taking-payment), the method and the cashier are both recorded. Once that is true, the expected cash figure computes itself and the evening routine takes a few minutes.

## What does the routine look like?

Five steps, the same every day, in the same order.

1. Stop taking payments on that till.
2. Print or open the day's cash total for that cashier.
3. Count the drawer, including the opening float, and write the number down before looking at the expected figure.
4. Compare. Record the difference even when it is zero, because a run of zeros is the evidence that the routine is being followed.
5. Bank or lock the cash, and set tomorrow's float.

Step three is the one people skip. Counting after you have seen the expected number is not a count, it is a confirmation, and it is how a small persistent shortfall survives for months.

![The CuspFlow dashboard showing the day's takings, outstanding balances and clinic activity](/screenshots/dashboard.webp "Today's takings, split by method, so the expected cash figure is not something anyone has to work out.")

## What do you do when there is a gap?

Look at the day, not the person, at least to begin with.

Most differences have dull explanations. A payment was recorded as cash but actually came by mobile money. A patient [paid part now and part later](/docs/billing-payments/installments-and-receipts) and only one half was entered. A refund went out of the drawer without being recorded. Someone took the float figure from yesterday. The genuinely worrying cases are the rare ones, and they only become visible because the dull explanations get cleared the same day and stop adding noise.

Keep a short written record of each day's variance and its reason. Three months of that record tells you something a single evening never can, which is whether you have a process problem on one till or a recurring one everywhere.

## Common questions

### Who should do the counting?

Not the only person who handled the cash, if you can avoid it. A second pair of eyes at close is worth more than any software feature here.

### Do we need to reconcile mobile money and card too?

Not against a drawer, because the money never sat in one. Reconcile those against the provider or bank statement on a weekly rhythm instead, and keep the daily count for physical cash.

### What about a clinic with several branches?

Each branch counts its own drawers, and the clinic owner wants both the branch view and the combined one. Running several locations brings a few other wrinkles, which [multi-branch management](/blog/multi-branch-dental-practice-management) covers in more detail.

A tight evening count is the cheapest financial control a clinic has, and it mostly depends on recording the method and the cashier at checkout. To see the cash view and the per-cashier totals against your own numbers, [start a free trial](https://app.cuspflow.co/signup).
