---
title: Roles & permissions
description: How CuspFlow's eight staff roles work, what each one can access, and how Owners grant custom permission overrides.
category: core-concepts
order: 2
updated: 2026-07-21
---

Everyone who logs in to CuspFlow has a **role** that determines what they can see and do. This keeps clinical, financial and HR data in front of the people who need it and away from those who don't.

## The eight roles

| Role | Typical use | Broad access |
|---|---|---|
| **Owner** | The clinic owner | Everything, including billing and staff access. Never locked out. |
| **Administrator** | Practice manager / operations | Everything, same as Owner. |
| **Finance** | Billing and accounts | Patients, appointments, financials, reports, claims, inventory, lab cases. No HR or settings. |
| **HR** | People management | Staff directory and payroll only. No patient or financial data. |
| **Receptionist** | Front desk | Appointments, waiting room, patients, families, checkout, lab cases; inventory view-only. |
| **Doctor** | Clinician | Patients, appointments, waiting room, treatment plans, lab cases. No billing or HR. |
| **Nurse** | Clinician | Same clinical access as Doctor. |
| **Support Staff** | Stock room | Inventory management only. |

> Pharmacists use the **Receptionist** role.

## How access is decided

When someone opens a page, CuspFlow checks their permissions in order:

1. **Owner and Administrator** have full access to everything.
2. Otherwise, their **base role** is checked against the page.
3. Then any **custom permission overrides** granted to them specifically.
4. If none of those grant access, it's denied.

## Custom permission overrides

Sometimes a person needs a little more than their role gives. An Owner or Administrator can grant granular extras under **Settings → Staff Permissions** — for example, letting a Receptionist manage the price catalog, or giving a Finance user the ability to record clinic expenses.

Available overrides include: viewing and managing patients, editing clinical records, managing treatment items, viewing and managing inventory, managing the price catalog, managing lab cases, viewing salaries and commissions, processing payroll, managing staff attendance, recording clinic expenses, and exporting CSV data.

The **HR** and **Financials** areas are deliberately tied to their base roles and are not handed out through custom overrides.

## Important rules

- Only the **Owner** can change a staff member's role.
- The **Owner is never locked out**, even if a plan change would otherwise reduce available seats — they're the only one who can fix billing.
- Sensitive actions (payroll, billing, staff access) are enforced on the server, not just hidden in the interface.

See [Staff management](/docs/staff-hr/staff-management) to assign roles and grant access.
