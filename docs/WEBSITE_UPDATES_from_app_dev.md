# Website Updates From App Dev

**Purpose:** the `dental-pms` app repo and this marketing site (`cuspflow-web`) are worked on in separate sessions so they don't get mixed together. Whenever a change in the app affects what the marketing site should say — pricing, plan features/limits, anything customer-facing — the app-dev session logs an actionable instruction here instead of touching this repo directly. A session working on `cuspflow-web` should check this file for open items before/while making pricing or feature-copy changes, and mark an item done (with the commit/date) once handled.

Format: newest entries at the top. Each entry states what changed in the app, why it matters for the website, and what the website copy should say instead.

---

## 2026-08-23 — Terms/Privacy should describe the real "delete" lifecycle (soft-delete → 30-day Trash → cold archive), not immediate permanent deletion

**What changed in the app:** In-app "Delete" (patients, appointments, lab cases, medical history, catalog items, etc.) has always been a soft-delete (`deleted_at` set, row kept). We're now building a **Settings → Trash** page (30-day recently-deleted view, restore-to-undo) on top of that existing soft-delete, and a later phase will cold-archive anything that ages out of Trash (export to cheap storage) rather than keeping it in the primary database forever, or genuinely erase it once a jurisdiction's retention-law minimum has passed. None of this is about the existing **whole-clinic purge** (60-day view-only window after subscription cancellation, `fn_purge_clinic`) — that one is a real, immediate, irreversible wipe and its existing "permanently deleted" copy on `/privacy`, `/terms`, and the FAQ is accurate and should NOT change.

**Why it matters for the website:** Per-record deletion (a patient, an appointment, a lab case, etc., independent of any clinic-level subscription event) is a separate lifecycle from the clinic purge, and the site currently doesn't describe it at all. If Terms/Privacy imply or are read as "deleting a record erases it immediately," that overpromises versus what actually happens (soft-delete → 30-day recoverable window → later cold-archive → eventual real deletion once retention-law minimums are satisfied). Note: CuspFlow does not serve the US, Canada, or EU markets, so this should NOT be framed around HIPAA or GDPR — retention language should stay generic ("applicable data-retention requirements," "your jurisdiction's retention laws") rather than naming a specific regulatory regime.

**What to update:** Add or adjust a Terms/Privacy clause (and FAQ if relevant) describing per-record deletion accurately: deleting a record within the app removes it from normal use immediately, but the underlying data is retained for a period (recoverable via the app's own Trash, then subject to retention-driven archival) rather than erased on the spot — distinct from, and in addition to, the existing whole-clinic-purge language which stays as-is.

**Status:** ✅ Done 2026-08-29 (in the same session as the docs sync). Added a per-record deletion paragraph to `app/privacy/page.tsx` §5 Data Retention (generic "retention requirements applicable in the clinic's jurisdiction", no HIPAA/GDPR), a "Deleting individual records" section to `content/docs/billing-lifecycle-trials-and-data-export.md`, and a "What happens when I delete a patient or an appointment?" Q to the FAQ. The whole-clinic-purge "permanently deleted" copy on `/privacy`, `/terms` and the FAQ was left unchanged as instructed. Also removed the stale "HIPAA-aligned security practices" line from the FAQ and the billing-lifecycle doc (CuspFlow doesn't serve US/CA/EU).

---

## 2026-08-18 — Branch count is unlimited on every plan, including Starter

**What changed in the app:** Branch count is **not enforced anywhere in the app** — a clinic on any plan, including Starter, can create as many branches as it wants. This was confirmed while auditing plan-limit enforcement (session-cap work) and is a **deliberate product decision**, not a bug being tracked for a future fix. Reasoning from the product owner: seats (staff logins) are the real monetization lever, not location count — letting branches stay unlimited on every tier removes friction and encourages clinics to add more staff/users, which is what actually drives revenue.

**Why it matters for the website:** `docs/STRIPE_PAYMENTS.md` in the `dental-pms` repo (and, following from it, this site's pricing/features copy) currently describes branches as a tier differentiator, e.g. "Starter: 1 active location" with multi-branch positioned as a Growth/Clinic Pro/Enterprise upsell.

**What to update:** Remove or rewrite any pricing/features copy that gates branch/location count by plan tier (this includes the pricing page's plan comparison table and any features page copy). Branches should read as unlimited on every plan. Seats/staff-login limits remain the real per-tier differentiator and should stay as-is — only the branch-count language needs to change.

**Status:** ✅ Done 2026-08-29 (docs-sync session). Removed all "1 location" / "Multi-branch" tier language and reframed as "Unlimited branches" on every plan across: `components/pricing/PricingPlans.tsx`, `components/sections/PricingPreview.tsx`, `app/pricing/page.tsx` (meta, feature list, FAQ, hero), plus the subscription and FAQ help articles. Seats + storage remain the only per-tier differentiators. Pricing figures were not touched.
