# CuspFlow.co — Marketing Website Documentation

**Project:** `cuspflow-web`  
**Location:** `/Users/mac/cuspflow-web/`  
**Live Domain:** `cuspflow.co`  
**App Domain:** `app.cuspflow.co` (the Dental PMS application)  
**Last Updated:** 2026-05-31 (moved here from the `dental-pms` repo, 2026-07-21)

> ### ⚠️ Pricing on this site is out of date
> The app now has a **built, self-serve Stripe subscription system** with public
> pricing, which this site does not yet reflect. These pages currently show
> **Starter / Growth / Enterprise with no prices** ("contact us for pricing"),
> but the product has moved to published, self-serve pricing:
>
> | Tier | Monthly | Yearly |
> |---|---|---|
> | Starter | $49 | $468 |
> | Growth | $99 | $948 |
> | **Clinic Pro** — *new 4th tier, missing from this site* | $199 | $1,908 |
> | Enterprise | contact sales | — |
>
> Plus add-ons: **Additional Staff Seat $12/mo** and **Storage Block (50 GB)
> $10/mo** (both recurring), and one-time SMS packs ($15 / $30 / $55). Every
> feature is included on every tier — plans differ only by staff seats and
> storage.
>
> **Update this site only once the Stripe catalogue exists**, so the published
> figures and Stripe agree exactly. Note that "contact us for pricing" is
> incompatible with self-serve Checkout — this is a strategy change, not just a
> missing pricing card.
>
> Authoritative source: `dental-pms` → `docs/STRIPE_PAYMENTS.md` §2a.
> Tracked in `dental-pms` → `docs/HANDOVER.md` §3.4.

---

## Overview

CuspFlow.co is the public-facing marketing website for the CuspFlow dental practice management system. It is a static, SEO-optimised site built with Next.js 16 and deployed to Cloudflare Pages via `wrangler`. It is a completely separate repository from the main Dental PMS application.

The site's primary job is to explain the product to clinic owners, showcase features, and convert visitors to trial signups.

---

## Technology Stack

| Tool | Version | Role |
|------|---------|------|
| Next.js | 16.2.6 | Static site framework |
| React | 19.2.4 | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 (postcss plugin) | Styling |
| Lucide React | 1.17.x | Icons |
| Cloudflare Pages | — | Hosting |
| Wrangler | — | Deploy tooling |

**Output mode:** `output: "export"` in `next.config.ts` — the build produces a fully static `out/` directory (no Node.js server). Deployed directly as a Cloudflare Pages asset site.

**Images:** `images: { unoptimized: true }` (required for static export).

---

## Repository Structure

```
cuspflow-web/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout (font, metadata)
│   ├── page.tsx               # Homepage (/)
│   ├── features/page.tsx      # Features page (/features)
│   ├── pricing/page.tsx       # Pricing page (/pricing)
│   ├── contact/page.tsx       # Contact page (/contact)
│   ├── privacy/page.tsx       # Privacy policy (/privacy)
│   ├── terms/page.tsx         # Terms of service (/terms)
│   ├── sitemap.ts             # Auto-generated sitemap.xml
│   └── robots.ts              # robots.txt
├── components/
│   ├── layout/
│   │   ├── Nav.tsx            # Sticky top navigation bar
│   │   └── Footer.tsx         # Site footer with links
│   └── sections/              # Homepage section components
│       ├── Hero.tsx           # Above-the-fold hero with mockup
│       ├── TrustBar.tsx       # Social proof strip (logos / numbers)
│       ├── PainPoints.tsx     # Problem statement section
│       ├── FeatureGrid.tsx    # 6-card feature overview grid
│       ├── DeepDive.tsx       # Reusable feature deep-dive (text + visual)
│       ├── MultiBranchCallout.tsx  # Multi-branch / multi-location callout
│       ├── Testimonials.tsx   # Testimonial cards
│       ├── PricingPreview.tsx # Pricing tier preview (3 tiers)
│       └── FinalCTA.tsx       # Bottom CTA (trial / demo)
├── public/                    # Static assets
├── out/                       # Static export output (generated on build)
├── next.config.ts
├── wrangler.toml              # Cloudflare Pages deploy config
├── postcss.config.mjs         # Tailwind CSS v4 postcss integration
└── tsconfig.json
```

---

## Pages

### Homepage (`/`)

The main conversion page. Composed of these sections in order:

| Section | Component | Purpose |
|---------|-----------|---------|
| Navigation | `Nav.tsx` | Sticky top bar with logo, links, CTA button |
| Hero | `Hero.tsx` | Headline, sub-headline, 3 bullets, CTA, animated waiting room mockup |
| Trust Bar | `TrustBar.tsx` | Social proof strip (clinic count, countries, etc.) |
| Pain Points | `PainPoints.tsx` | 3 problems the product solves |
| Feature Grid | `FeatureGrid.tsx` | 6-card overview of core modules |
| Deep Dive — Waiting Room | `DeepDive` (inline visual) | Full-width alternating layout: copy + interactive waiting room mockup |
| Deep Dive — Treatment Plans | `DeepDive` (reversed) | FDI tooth chart + line items mockup |
| Deep Dive — Billing | `DeepDive` (inline visual) | Invoice + payments mockup |
| Multi-Branch Callout | `MultiBranchCallout.tsx` | Highlight for multi-location clinic groups |
| Testimonials | `Testimonials.tsx` | 3 testimonial cards |
| Pricing Preview | `PricingPreview.tsx` | 3-tier pricing cards (no prices — "Contact for pricing") |
| Final CTA | `FinalCTA.tsx` | Book a demo / Start free trial buttons |
| Footer | `Footer.tsx` | Links, legal, copyright |

**Homepage inline visuals** (defined in `page.tsx`):
- `WaitingRoomVisual` — simulated patient board with 3 patients and status badges
- `TreatmentPlanVisual` — FDI tooth chart (4 rows × 8 teeth) with 3 highlighted + line items
- `BillingVisual` — invoice card with subtotal, discount, balance, and payment buttons

### Features Page (`/features`)

Full feature breakdown organised into 12 categories:

| Category | Icon | Key features listed |
|----------|------|---------------------|
| Patient Flow | MonitorDot | Waiting room, journey tracking, elapsed time alerts, discharge billing gate |
| Appointments | CalendarDays | Scheduling, online booking, availability, multi-chair |
| Treatment Plans | ClipboardList | FDI chart, procedures + prescriptions + lab cases, X-rays, status workflow |
| Billing & Payments | Receipt | Auto-invoice, multi-payment methods, installment plans, balance tracking |
| Lab Cases | FlaskConical | Full case lifecycle, cost tracking, automatic billing item |
| Multi-Branch | Building2 | Branch management, cross-branch reporting |
| Patient Portal | Globe | Online booking, consent forms, invoice viewing |
| HR & Payroll | UserRound | Staff directory, attendance, commissions, payslips |
| Dental Chairs | Stethoscope (or similar) | Chair assignment, chair utilisation reporting |
| Imaging & X-Rays | Image | Attached to treatment plans, lightbox viewer |
| Forms & Consent | FileText | Digital consent forms, signed via portal |
| Analytics | BarChart3 | Revenue reports, staff performance, branch comparison |

### Pricing Page (`/pricing`)

Three tiers displayed in a card grid:

| Tier | Target | Key limits |
|------|--------|-----------|
| **Starter** | Single-location clinic | 1 branch, up to 5 staff |
| **Growth** | Established clinic | Up to 3 branches, up to 20 staff |
| **Enterprise** | Dental group / multi-location | Unlimited branches + staff |

Prices are not shown publicly — a "Contact us for pricing" link is shown instead, pointing to `/contact`. The **Growth** tier is highlighted as "Most popular."

Enterprise tier includes: custom integrations, dedicated account manager, SLA guarantee, on-site onboarding, white-label options.

### Contact Page (`/contact`)

Lead generation form with fields: Name, Clinic Name, Email, Phone (optional), Message. Form submission target is TBD (likely a Cloudflare Worker or third-party form service).

### Legal Pages

- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

---

## Design System

### Color Palette

| Role | Tailwind class | Usage |
|------|---------------|-------|
| Primary | `teal-600` / `teal-500` | CTAs, highlights, active states |
| Background | `white` / `slate-50` | Page and card backgrounds |
| Border | `slate-200` / `slate-100` | Card borders, dividers |
| Text primary | `slate-900` | Headlines |
| Text secondary | `slate-500` / `slate-400` | Body text, captions |
| Accent amber | `amber-400` / `amber-50` | "In Chair" / "Active" status badges |
| Accent green | `green-400` / `green-50` | "Ready to Pay" / "Paid" status badges |
| Accent rose | `rose-600` | Balance due / overdue |

### Typography

- Font: Geist (via `next/font/google`) — loaded in `app/layout.tsx`
- Headlines: `font-bold` / `font-semibold`, `text-slate-900`
- Body: `text-slate-500`, `leading-relaxed`

### Component Conventions

- Cards: `rounded-2xl border border-slate-200 shadow-xl bg-white`
- Buttons (primary): `bg-teal-600 text-white rounded-lg px-5 py-2.5 font-semibold hover:bg-teal-700`
- Buttons (secondary): `border border-slate-200 text-slate-700 rounded-lg px-5 py-2.5`
- Section spacing: `py-20` or `py-24` for full-width sections

### `DeepDive` Component

Reusable alternating feature section. Props:
```tsx
<DeepDive
  badge="Waiting Room"        // small label chip above headline
  headline="..."              // section heading
  description="..."           // paragraph
  bullets={['...', '...']}   // 3–4 bullet points
  visual={<ReactNode />}      // right-side mockup
  reversed?                   // flips layout: visual left, copy right
/>
```

---

## Build & Deploy

### Local Development

```bash
cd /Users/mac/cuspflow-web
npm run dev       # starts Next.js dev server on http://localhost:3000
```

### Production Build

```bash
npm run build     # outputs static files to out/
```

TypeScript must pass (`tsc --noEmit`) before the build completes.

### Deployment — Cloudflare Pages

Config in `wrangler.toml`:
```toml
name = "cuspflow-web"
compatibility_date = "2024-09-23"

[assets]
directory = "./out"
```

Deploy command:
```bash
npx wrangler pages deploy out/
```

The `out/` directory is served as a static asset site. No server-side rendering, no Edge Functions.

### Sitemap & SEO

`app/sitemap.ts` auto-generates `/sitemap.xml` with all public routes. `app/robots.ts` generates `/robots.txt`. Both are included in the static export.

---

## Relationship to the Dental PMS App

| | CuspFlow.co (this repo) | Dental PMS App |
|-|------------------------|----------------|
| Repo | `cuspflow-web` | `dental-pms` |
| URL | `cuspflow.co` | `app.cuspflow.co` |
| Framework | Next.js 16 (static export) | Vite 7 + React 19 (SPA) |
| Auth | None (public marketing site) | Supabase Auth |
| Database | None | Supabase Postgres |
| Deploy | Cloudflare Pages (static) | Cloudflare Pages (SPA) |

The marketing site links to the app via CTA buttons pointing to `app.cuspflow.co/signup` and `app.cuspflow.co/login`. These links are hardcoded in `Nav.tsx` and `FinalCTA.tsx`.

---

## Content Notes

- Currency in mockups uses **AED** (UAE dirham) — reflects the primary African/MENA market target
- Patient names in mockups are diverse (Arabic, West African, Levantine) to reflect target market
- "Contact for pricing" strategy is intentional — conversion through sales calls, not self-serve
- All testimonials and trust bar numbers should be updated as real customer data becomes available
