---
title: "Dental Inventory Expiry Tracking That Actually Catches Things"
description: "Dental inventory expiry tracking fails for one reason: stock arrives without a date on it. What to record at goods-in, when to alert, and how to write off properly."
date: "2026-11-19"
author: "The CuspFlow Team"
readingTime: "3 min read"
cluster: "B. Operational how-to"
market: "Global"
primaryKeyword: "dental inventory expiry tracking"
tags:
  - dental inventory expiry tracking
  - dental clinic stock control
  - dental consumables management
---

Dental inventory expiry tracking fails for one reason almost every time: stock is put on the shelf without its expiry date being recorded anywhere. Once that happens, no alert can fire and no report can warn you, so the first time anyone notices is when a nurse reads the tube in the surgery. The fix is at goods-in, not at the point of use.

![Stock booked in with a batch and expiry date, nearest date used first, an alert window, then a recorded write-off](/blog/dental-inventory-expiry-tracking/batch-expiry-first-out-flow.svg "A clinic that writes off properly orders better next quarter, because the waste is visible in a figure rather than a bin.")

## Where does expired stock actually come from?

From the back of the shelf, almost always, and from the box that arrived while reception was busy.

Three ordinary habits produce nearly all of it. Someone reaches for the front item rather than the one expiring soonest. A delivery is signed for and shelved without being entered, so the system thinks you have less than you do and you order more. And a product bought for one case, a specific shade or a particular suture, sits there for two years because nobody has a reason to look at it.

None of those are discipline problems you can lecture your way out of. They are all consequences of stock being tracked as a single number per item rather than as dated batches.

## What should the system record when stock arrives?

The batch number, the expiry date, the quantity, the unit cost and the branch. Five fields, at the moment the box is opened.

Recording cost at goods-in is the one people skip, and it is the one that makes the rest of it useful. Without it you can see that eleven boxes expired, which is annoying. With it you can see what those boxes cost you, which changes next quarter's order. It is the same argument as [invoicing everything you actually did](/blog/dental-billing-get-paid-faster), only pointing at the shelf instead of the chair. Branch matters for the same reason: stock at your second site is a separate pile with its own dates, and treating it as one shared total guarantees that one surgery runs out while the other throws things away.

Expiry dates are worth entering even for items you are sure will move quickly. The ones that catch clinics out are rarely the obvious short-dated materials.

![The CuspFlow inventory screen showing stock items with batches and quantities for a clinic](/screenshots/inventory.webp "Each batch carries its own expiry date, so the alert knows which pack to warn you about rather than just which product.")

## How far ahead should the alert fire?

Far enough ahead that you can still do something, which for most consumables means somewhere between 60 and 90 days.

A warning that arrives two weeks out is a write-off notice with extra steps. At two or three months you have real options: move the pack to whichever surgery uses the most of it, use it for the next suitable case rather than opening a fresh one, or stop reordering that line until it clears. Set the window per product if the system allows it, because a composite and a box of gloves do not need the same notice.

The alert also has to reach someone whose job it is to act. In most small clinics that is whoever does the ordering, often the same person who runs reception and the till. Our [stock ledger with batch and expiry alerts](/docs/operations/inventory) is built for that person rather than for a stores department.

## What do you do with stock that expires anyway?

Write it off in the system, with a reason, on the day you bin it.

Clinics hate this step because it feels like recording a failure. It is the opposite: an unwritten-off expired batch sits in your stock figures forever, which means your stock valuation is wrong, your reorder suggestions are wrong, and the shortage you hit next month arrives without warning. Writing it off with a reason gives you a number you can act on, in the same spirit as [counting the till the same evening rather than at month end](/blog/dental-clinic-cash-reconciliation).

One honest limit. No stock ledger knows what is physically on your shelf, only what it was told. A quick count once a month, against the system, is still yours to do.

## Common questions

### Does the stock come off automatically when we treat a patient?

It can, if each service is linked to the materials it consumes. [Linking a service to its materials](/docs/operations/price-catalog) means billing a composite filling deducts the composite, the matrix band and the gloves from the ledger without anyone typing it in.

### Should we track every item or only the expensive ones?

Start with anything that expires, anything that costs real money, and anything whose absence cancels a procedure. Cotton rolls can wait.

Expiry tracking is one of those jobs that takes a fortnight to set up and then runs quietly for years. To try it on your own stock list, [start a free trial](https://app.cuspflow.co/signup).
