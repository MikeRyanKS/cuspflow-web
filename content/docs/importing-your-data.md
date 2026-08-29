---
title: Importing your existing data
description: Use the Data Migration wizard to bring branches, staff, patients, families, appointments and your price catalog into CuspFlow from CSV — with a validation dry-run, a re-uploadable rejects report, per-import reports and a 7-day rollback.
category: getting-started
order: 3
updated: 2026-08-29
---

When you're moving to CuspFlow you don't have to re-enter everything by hand. The **Data Migration** wizard imports your existing records from CSV. It's a guided tool for Owners and Administrators under **Settings → Data Migration**, and each import can handle up to **5,000 rows**.

## Template-first

You always start from **CuspFlow's own downloadable template** for the entity you're importing — one column per field. Export your data from your old system (or your spreadsheets), line the columns up with the template, and fill it in one entity at a time. The wizard is built around this template rather than trying to read an arbitrary export format, which is what makes the rest of the process reliable.

## What you can import, and in what order

Seven entity types. Import them in this order so records link up correctly:

1. **Branches**
2. **Dental Chairs**
3. **Staff**
4. **Patients**
5. **Families**
6. **Appointments**
7. **Price Catalog** (procedures & prescriptions — can be imported any time)

Patients reference families, appointments reference patients and staff, and so on — importing out of order leaves records that can't be linked.

## How the wizard works

1. **Choose the entity type** and download its template.
2. **Upload your filled-in CSV.** CuspFlow **fuzzy-matches** your column headers to the template, so a typo, extra spacing or slightly different wording still maps to the right field. Adjust anything it didn't get.
3. **Run the dry-run.** Before a single row is saved, the wizard checks every row and marks it **valid**, **warning** or **error**, with the reason, and flags likely duplicates.
4. **It rejects rather than guesses.** Any row that points at a branch, patient or dentist CuspFlow can't resolve is rejected with an explicit reason — it's never imported half-linked or with a blank reference. Patients on Families and Appointments rows are matched by **phone or email only**, never by name (two people in a family often share a surname).
5. **Fix the rejects and re-upload.** Everything that didn't make it downloads as a single **rejects report** — a CSV in your original file's shape, with a `Reason` column. Fix just those rows and upload that file again; round two is only the failures, not the whole import.
6. **Review the Report.** Every import produces a report (the **Reports** tab in the wizard): a summary, per-entity counts and a table of anomalies to look over. The clinic owner also gets an email when one lands.

## Rolling an import back

An Owner can **roll back an entire import within 7 days** from its report. This is a real, permanent delete of that import's rows — with a safety scan that skips anything you've edited or built on since (so a patient who's already had an appointment booked won't be removed). After 7 days the rollback option closes.

## Migrated data stays tagged

Imported records are tagged as migrated. Reports that show trends over time (Financial Reports, the Financials and Reports dashboards, Staff Commissions, Overdue Payments) have an **"exclude migrated data"** toggle, so a big one-off historical import doesn't distort your month-on-month figures.

## Tips

- Adult patients need a phone number — it's how CuspFlow avoids duplicate records. Children under 18 can be imported without one **if** they belong to a family.
- Open your CSV in a plain-text editor before uploading if you can — spreadsheet apps sometimes turn long phone numbers into scientific notation or strip leading zeros, and the wizard will flag those.
- Keep the rejects report. Working through it is far faster than hunting through the original file.

Once your data is in, head to the [Waiting Room](/docs/patients-scheduling/waiting-room) and [Appointments](/docs/patients-scheduling/appointments) to start your first day.
