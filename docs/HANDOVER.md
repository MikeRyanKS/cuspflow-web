# HANDOVER — Session Continuity (cuspflow-web)

**Purpose:** this site is worked on from **two different computers at different times**. This file is how a new session on either machine picks up where the last stopped, with **git as the single source of truth**.

**Read this first. Update it last.**

**Last updated:** 2026-09-03 · **Branch:** `main` · **Repo:** `MikeRyanKS/cuspflow-web`

> **Latest session (2026-09-03):** full marketing overhaul — brand-blue theme, real
> app screenshots (`BrowserFrame` + lightbox), new `/about`, `/blog` (5 SEO posts),
> `/sub-processors`, deep SEO (JSON-LD, sitemap/llms/OG), comprehensive `/terms` +
> `/privacy` (Keplify LLC, Delaware), footer links to sitemap/llms. See the
> "2026-09-03 overhaul" callout in `WEBSITE_DOCUMENTATION.md`. Legal text mirrors:
> `docs/TERMS.md` + `docs/PRIVACY.md`.

---

## 🚨 Pushing to `main` deploys to production

`.github/workflows/deploy.yml` runs on **every push to `main`**: `npm ci` → `npm run build` → `npx wrangler deploy` → live on **cuspflow.co**.

There is no staging environment and no review step. Consequences:

- **Never push to `main` without running `npm run build` locally first.** A build failure fails the deploy; a *successful* build with wrong content goes straight live to a public marketing site.
- Work anything non-trivial on a branch, and merge only when you're happy for it to be public immediately.
- This is the opposite of the `dental-pms` repo, where `main` is not auto-deployed. Don't carry that habit across.

---

## 1. Git rules

### Starting a session
```bash
git fetch --all --prune
git status                 # must be clean
git pull --ff-only
git log --oneline -5
```
If `git status` isn't clean, the last session ended badly (or you're on the other machine) — resolve that before starting new work.

### Ending a session
1. `npm run build` — must pass (it gates the deploy).
2. **Commit everything.** The other machine can only see what's pushed.
3. **Push** — but see the production warning above.
4. **Update this file** (§3 state, §4 outstanding).
5. Anything you can't commit goes in §4.3 **with the reason** — never leave it silently.

### Needs permission before committing
- Secrets / `.env*` / Cloudflare tokens — never. (Deploy creds live in **GitHub Actions secrets**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.)
- Anything that fails `npm run build`.
- Force-push, history rewrite, branch deletion.
- Publishing pricing figures — see §4.1; those must match Stripe exactly.

---

## 2. The stack (and one trap)

Next.js **16.2.6**, React 19, Tailwind v4 (postcss), static export (`output: "export"` → `out/`), deployed to Cloudflare Pages via `wrangler`. `out/` is a build artifact and is correctly **gitignored** — never commit it.

```bash
npm run dev     # local dev
npm run build   # static export to out/ — must pass before pushing
npm run lint
```

> ⚠️ **Read `AGENTS.md`.** This Next.js version has breaking changes vs. what most models were trained on — check `node_modules/next/dist/docs/` before writing code rather than assuming older conventions.

**Structure:** `app/` (App Router pages: `pricing`, `features`, `contact`, `privacy`, `terms`, plus `sitemap.ts`/`robots.ts`), `components/layout` (Nav, Footer), `components/sections` (homepage blocks). Full detail in [WEBSITE_DOCUMENTATION.md](./WEBSITE_DOCUMENTATION.md).

---

## 3. Current state

Clean and synced. Last change: relocated `WEBSITE_DOCUMENTATION.md` in from the `dental-pms` repo (it documented this site but lived there), with a staleness warning about pricing.

---

## 4. Outstanding

### 4.1 Pricing is out of date (the significant one) · ✅ RESOLVED 2026-07-22
*Kept for context. The problem below was real when written and is long fixed:
`/pricing` has shown four tiers with public figures since 2026-07-22, and the
"contact us for pricing" positioning is gone. The prices quoted in this section
are the original 2026 catalogue and are **superseded**; see the current table
further down.*

~~The site shows **Starter / Growth / Enterprise** with **no prices** ("contact us for pricing"). The app now has a **built, self-serve Stripe subscription system** with public pricing, and a **new 4th tier (Clinic Pro)** that doesn't exist here at all.~~

~~This is a **positioning change, not a missing card**, since "contact us for pricing" is fundamentally incompatible with self-serve Checkout.~~

Original (superseded) catalogue, for the record: Starter $49/$468 · Growth
$99/$948 · Clinic Pro $199/$1,908 · Enterprise contact sales, with the
Additional Staff Seat at $12/mo and one-time SMS packs ($15/$30/$55, since
retired along with SMS itself in 2026-07-24).

**Current catalogue (2026-11-02 re-pricing):**

| Tier | Monthly | Yearly | Annual saving | Seats | Storage |
|---|---|---|---|---|---|
| Starter | $26.90 | $297 | ~8% | Up to 7 | 15 GB |
| Growth | $54.90 | $560 | 15% | Up to 20 | 50 GB |
| Clinic Pro | $99.90 | $960 | ~20% | Up to 45 | 120 GB |
| Enterprise | contact sales | n/a | n/a | 45+ | Custom |

Plus add-ons: Additional Staff Seat **$5/mo**, Storage Block (50 GB) **$10/mo**,
both recurring. Every feature is on every tier and **branches are unlimited on
every plan**, so tiers differ only by seats and storage. The annual saving is
**per-plan**, so customer-facing copy says "up to 20%".

Authoritative source: `dental-pms` → `docs/STRIPE_PAYMENTS.md` §2 / §2a. Note
that this repo does **not** read that catalogue: the figures are hardcoded in
four places here (see `WEBSITE_DOCUMENTATION.md`) and must be changed by hand,
unlike the app, whose billing screens now fetch `subscription_plans` directly.

### 4.2 Smaller items
- Contact form has no submission target (needs a Worker or a form service).
- Testimonials and trust-bar numbers are placeholders — replace with real data before launch.
- Mockup currency is AED; confirm that matches target market messaging.

### 4.3 Uncommitted / needs permission
*(none as of 2026-07-21 — working tree clean)*

---

## 5. Related

The product itself lives in **`dental-pms`** (`/Users/mac/dental-pms`, `MikeRyanKS/dental-pms`) — Vite + React SPA on `app.cuspflow.co`, with its own `docs/HANDOVER.md`. CTAs here link to `app.cuspflow.co/signup` and `/login`, hardcoded in `Nav.tsx` and `FinalCTA.tsx`.

**Pricing and plan facts are owned by `dental-pms` → `docs/STRIPE_PAYMENTS.md`.** This site consumes them; it must never be the source of truth for a price.
