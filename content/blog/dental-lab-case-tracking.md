---
title: "Dental Lab Case Tracking: How Crowns Stop Going Missing"
description: "Dental lab case tracking that holds up in a busy clinic: the four dates worth recording, why cases go quiet, and keeping the lab bill and patient charge in step."
date: "2026-11-28"
author: "The CuspFlow Team"
readingTime: "3 min read"
cluster: "B. Operational how-to"
market: "Global"
primaryKeyword: "dental lab case tracking"
tags:
  - dental lab case tracking
  - dental laboratory workflow
  - crown and denture cases
---

A case goes missing because nothing in the clinic is watching the gap between sending it and getting it back. Dental lab case tracking closes that gap with four dates rather than a new filing habit: when the case left, when it is due, when it arrived, and when it was fitted. The due date is the one doing the actual work.

![The five stages of a lab case from draft to fitted, with the date each stage records](/blog/dental-lab-case-tracking/lab-case-lifecycle-dates.svg "Cancelled belongs on this picture too. A case the patient abandoned is not the same as one the lab still has.")

## Why do lab cases go missing in the first place?

Because nobody owns the case between the courier and the fitting appointment.

Think about where the information actually sits in a small clinic. The impression goes off with a rider. The lab slip is handwritten and photographed. The expected return date lives in the doctor's head, or in a WhatsApp thread with the lab that has forty other messages in it. The receptionist, who is also doing checkout and the stock count, has no reason to think about that case again until the patient is in the chair asking where their crown is.

The cost is not the crown. It's the chair time, the apology, and a patient who now tells people your clinic lost their tooth. One missed fitting undoes a fortnight of running on time, which is why this sits in the same family of problems as [patients waiting too long](/blog/reduce-patient-wait-times-dental-clinic).

## Which dates actually need recording?

Four, kept apart, because a single "lab date" field destroys the only thing you can chase on.

Record the day it was sent, the day the lab says it will be back, the day it physically arrived, and the day it went in the patient's mouth. The second of those is the only one that can generate a warning, and the third is the only one that proves the case is in the building. Collapse them into one and you have a log, not a system.

Alongside the dates, each case wants the assigned lab, the doctor who needs it, the case type and the teeth in FDI codes. Ours moves through Draft, Sent, In Production, Received and Fitted, or Cancelled, and can be opened straight from the [treatment plan](/docs/clinical/treatment-plans) so the teeth on the case and the teeth on the chart are the same set.

![The CuspFlow treatment plan with its FDI teeth chart and line items](/screenshots/treatment-plans.webp "A lab case opened from a plan merges its teeth into the chart, so the chart is not quietly out of date.")

One honest limitation. We do not send anything to your lab and your lab has no login, so this is a record for the clinic and not a shared workflow with the technician. Somebody still has to pick up the phone on Thursday. What changes is that they know on Thursday rather than on the following Tuesday with a patient in the waiting room.

## How do you keep the lab bill and the patient charge in step?

Record them as two separate numbers on the same case, from the start.

A [lab case record](/docs/clinical/lab-cases) should hold what the laboratory invoices you, including transport, with its own payment status of pending, partial or paid, and separately what the patient is being charged as line items on their plan. Keep only the second and you cannot tell a profitable zirconia crown from one where the courier and a remake ate the margin. Keep only the first and the work never reaches the invoice at all, which is the quieter and more expensive failure.

Linking the case to the plan is what prevents double entry. The charge becomes a billing line on that plan's invoice automatically, so reception is not retyping a figure from a lab slip at checkout.

## Common questions

### How long should a case sit before somebody chases it?

One day past the date the lab gave you. Not a week, because the fitting appointment is usually already booked, and a lab that is running late will almost always tell you if asked directly.

### What happens when a case comes back wrong?

Treat the remake as its own case against the same teeth, rather than editing the original. You keep the real cost of the remake visible, which is the figure you need when deciding whether to keep using that lab. The same reasoning applies to [tracking stock and expiry dates](/blog/dental-inventory-expiry-tracking).

Lab work is where a small clinic's margin is easiest to lose without noticing. To set up your own labs and run a case end to end, [start a free trial](https://app.cuspflow.co/signup).
