---
title: Importing your existing data
description: Use the Data Migration wizard to bring patients, appointments, staff and inventory into CuspFlow from a spreadsheet or another system.
category: getting-started
order: 3
updated: 2026-07-21
---

When you're moving to CuspFlow, you don't have to re-enter everything by hand. The **Data Migration** wizard imports your existing records from a spreadsheet — including exports from systems like Dentrix, Eaglesoft or Open Dental. It's a guided, one-time-at-onboarding tool available to Owners and Administrators under **Settings → Data Migration**.

## What you can import

Seven entity types, with recommended import order so records link up correctly:

1. **Branches**
2. **Dental Chairs**
3. **Staff**
4. **Patients**
5. **Families**
6. **Appointments**
7. **Inventory / Services**

Each import handles up to **5,000 rows** at a time.

## How the wizard works

1. **Choose the entity type** you want to import.
2. **Upload your CSV.** A template is provided for each type.
3. **Map your columns.** CuspFlow auto-maps columns by name; you can adjust any mapping it didn't get right.
4. **Run the validation dry-run.** Before anything is saved, the wizard checks every row and shows it as **valid**, **warning** or **error**, with the reason. It also flags likely duplicates.
5. **Fix and re-upload** any rows that errored, or download the error report to work through offline.
6. **Import.** Once the dry-run looks right, run the import and review the summary of rows added.

## Tips

- Import in the order above — patients reference families, appointments reference patients and staff, and so on.
- Adult patients need a phone number (it's how CuspFlow avoids duplicate records). Children under 18 can be imported without one **if** they belong to a family.
- Keep the downloadable error report — it's the fastest way to clean up a messy source file.

Once your data is in, head to the [Waiting Room](/docs/patients-scheduling/waiting-room) and [Appointments](/docs/patients-scheduling/appointments) to start your first day.
