# CuspFlow blog: topic backlog and ledger

This file is the topic ledger. Together with the frontmatter already in `content/blog/`
and `content/blog-queue/`, it is the only record of what has been covered. There is no
separate state file, deliberately, so nothing can drift out of sync.

**Rules for the weekly writer run**

1. Never pick a topic whose status is `queued` or `published`.
2. Never pick a topic that duplicates an existing post, a `/docs` article, `/features` or
   `/pricing`. See section 5 of `CONTENT_STRATEGY.md`.
3. Pick five per run, rotating across clusters so a single week is not all country guides.
   A good weekly mix is 2 from A, 2 from B, and 1 from C or D.
4. Work down the tier order within cluster A: all of tier 1 before any of tier 2.
5. Set the status to `queued` when the draft is written, and the publisher sets it to
   `published`. Record the slug when it is assigned.
6. If a topic turns out to be unwinnable during keyword research (a strong independent
   guide already owns the query), set its status to `skipped` with a one-line reason
   rather than deleting the row.

Status values: `planned`, `queued`, `published`, `skipped`.

---

## Already published (the five originals, not to be re-targeted)

| Slug | Owns |
| --- | --- |
| `how-to-choose-dental-practice-management-software` | Buyer's guide, how to choose. Cluster A hub |
| `dental-billing-get-paid-faster` | Billing, getting paid faster. Money hub |
| `multi-branch-dental-practice-management` | Multi-branch, multi-location. Growth hub |
| `reduce-patient-wait-times-dental-clinic` | Waiting room, patient flow. Flow hub |
| `switch-dental-software-without-losing-data` | Switching, data migration. Cluster C hub |

---

## Cluster A: country buying guides (24)

Pattern: "Dental Clinic Software in {Country}: What to Look For". Local hooks to use:
currency and number format, that country's VAT or sales tax as a receipt line, mobile
money as a recorded payment method, unlimited branches, WhatsApp reminders, private
insurance carriers maintained by the clinic, and the country's data-protection law.

### Tier 1, write first

| # | Topic | Primary keyword | Status | Slug |
| --- | --- | --- | --- | --- |
| A1 | Uganda | dental clinic software Uganda | published | `dental-clinic-software-uganda` |
| A2 | Kenya | dental practice management software Kenya | published | `dental-practice-management-software-kenya` |
| A3 | Nigeria | dental clinic software Nigeria | planned | |
| A4 | Ghana | dental clinic management software Ghana | planned | |
| A5 | Tanzania | dental clinic software Tanzania | planned | |
| A6 | Rwanda | dental clinic software Rwanda | planned | |
| A7 | Zambia | dental practice software Zambia | planned | |
| A8 | Bangladesh | dental clinic software Bangladesh | planned | |
| A9 | Sri Lanka | dental clinic management software Sri Lanka | planned | |
| A10 | Nepal | dental clinic software Nepal | planned | |
| A11 | Philippines | dental clinic software Philippines | planned | |
| A12 | Fiji and the Pacific islands | dental clinic software Fiji | planned | |

### Tier 2, write next

| # | Topic | Primary keyword | Status | Slug |
| --- | --- | --- | --- | --- |
| A13 | United Arab Emirates | dental clinic management software UAE | planned | |
| A14 | Saudi Arabia | dental clinic software Saudi Arabia | planned | |
| A15 | Qatar | dental clinic software Qatar | planned | |
| A16 | Kuwait | dental clinic management software Kuwait | planned | |
| A17 | Oman | dental clinic software Oman | planned | |
| A18 | Jordan | dental clinic software Jordan | planned | |
| A19 | Egypt | dental clinic management software Egypt | planned | |
| A20 | Pakistan | dental clinic software Pakistan | planned | |
| A21 | India | dental clinic management software India | planned | |
| A22 | Malaysia | dental clinic software Malaysia | planned | |
| A23 | Indonesia | dental clinic software Indonesia | planned | |
| A24 | South Africa | dental practice management software South Africa | planned | |

Note for A14 (Saudi Arabia): write the e-invoicing section as questions to ask a vendor.
We do not integrate with ZATCA and must not imply that we do.

---

## Cluster B: operational how-to (21)

| # | Topic | Primary keyword | Module it maps to | Status | Slug |
| --- | --- | --- | --- | --- | --- |
| B1 | Cutting no-shows without phoning every patient | how to reduce dental no-shows | Reminders | published | `reduce-dental-no-shows` |
| B2 | End-of-day cash reconciliation | dental clinic cash reconciliation | Cash Reconciliation | published | `dental-clinic-cash-reconciliation` |
| B3 | Treatment plans patients actually accept | dental treatment plan patient acceptance | Treatment Plans | planned | |
| B4 | Stock expiry before it costs you | dental inventory expiry tracking | Inventory | planned | |
| B5 | Paying associate dentist commission | dental associate commission calculation | Commissions | planned | |
| B6 | Keeping lab cases from going missing | dental lab case tracking | Lab Cases | planned | |
| B7 | Payroll in a small clinic | dental clinic payroll | Payroll | planned | |
| B8 | Setting a price list and holding it | dental treatment price list | Price Catalog | planned | |
| B9 | Chasing overdue patient balances | dental overdue patient balance | Overdue Payments | planned | |
| B10 | Running private insurance claims | dental insurance claim tracking | Insurance Claims | planned | |
| B11 | Medical history and allergy records worth having | dental patient medical history record | Patients | planned | |
| B12 | Scheduling several dentists across chairs | dental appointment scheduling multiple dentists | Appointments | planned | |
| B13 | Receipts that survive an audit | dental clinic receipt numbering | Billing, Print | planned | |
| B14 | Billing a whole family on one account | dental family account billing | Families | planned | |
| B15 | Staff attendance without a paper book | dental clinic staff attendance | Attendance | planned | |
| B16 | Measuring whether your chairs are busy | dental chair utilisation | Reports | planned | |
| B17 | Walk-ins that do not wreck the day | dental walk-in patient management | Waiting Room | planned | |
| B18 | Consent forms off paper | dental consent form digital | Digital Forms | planned | |
| B19 | Never running out of consumables | dental clinic reorder level stock | Inventory | planned | |
| B20 | Recalls and follow-up appointments | dental patient recall system | Appointments | planned | |
| B21 | Tracking what the clinic actually spends | dental clinic expense tracking | Expenses | planned | |

---

## Cluster C: switching and alternatives (9)

Factuality rules are stricter here. Competitor facts come only from that competitor's own
live public pages, fetched at write time. No price comparisons, no disparagement.

| # | Topic | Primary keyword | Status | Slug |
| --- | --- | --- | --- | --- |
| C1 | Cloud or desktop dental software | cloud vs desktop dental software | planned | |
| C2 | Choosing software when the internet is unreliable | dental software unreliable internet | planned | |
| C3 | Alternatives to desktop-only dental software | desktop dental software alternatives | planned | |
| C4 | Moving off spreadsheets and paper | dental clinic spreadsheet to software | planned | |
| C5 | What to ask a dental software vendor before buying | questions to ask dental software vendor | planned | |
| C6 | Getting your own data back out | dental software data export | planned | |
| C7 | Software for a clinic opening its second branch | dental software second branch | planned | |
| C8 | Free dental clinic software, and what you give up | free dental clinic software | planned | |
| C9 | Running a 30-day software trial properly | dental software free trial | planned | |

---

## Cluster D: role and checklist (6)

| # | Topic | Primary keyword | Status | Slug |
| --- | --- | --- | --- | --- |
| D1 | The receptionist's opening and closing checklist | dental receptionist daily checklist | queued | `dental-receptionist-daily-checklist` |
| D2 | Opening a second clinic | opening a second dental clinic checklist | planned | |
| D3 | What a practice owner should check every Monday | dental practice owner weekly review | planned | |
| D4 | Month-end in a dental clinic | dental clinic month end checklist | planned | |
| D5 | Onboarding a new staff member | dental clinic new staff onboarding | planned | |
| D6 | Closing out the year | dental clinic year end checklist | planned | |

---

## Suggested first four weeks

| Week | Posts |
| --- | --- |
| 1 | A1 Uganda, A2 Kenya, B1 no-shows, B2 cash reconciliation, D1 receptionist checklist |
| 2 | A3 Nigeria, A13 UAE, B3 treatment plans, B4 stock expiry, C1 cloud or desktop |
| 3 | A4 Ghana, A14 Saudi Arabia, B5 commission, B6 lab cases, D2 second clinic |
| 4 | A21 India, A5 Tanzania, B7 payroll, B8 price list, C2 unreliable internet |

At five a week, 60 topics is twelve weeks of output. Before the backlog runs dry, review
what is actually ranking and refill from the queries that earned impressions rather than
guessing again.
