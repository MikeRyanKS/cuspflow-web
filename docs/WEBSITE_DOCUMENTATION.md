# CuspFlow.co — Marketing Website Documentation

**Project:** `cuspflow-web`  
**Location:** `/Users/mac/cuspflow-web/`  
**Live Domain:** `cuspflow.co`  
**App Domain:** `app.cuspflow.co` (the Dental PMS application)  
**Last Updated:** 2026-11-02

> ### ✅ Pricing is published (4 tiers + add-ons) — figures as of 2026-11-02
> `/pricing` shows the full self-serve pricing that matches the app's Stripe
> catalogue: **Starter $26.90/$297 · Growth $54.90/$560 · Clinic Pro $99.90/$960 ·
> Enterprise (contact sales)**, plus add-ons — **Additional Staff Seat $5/mo**
> and **Storage Block (50 GB) $10/mo**, both recurring. Every feature is included
> on every tier and **branches are unlimited on every plan**; tiers differ only by
> staff seats and storage.
>
> **The annual discount is per-plan, not one number** — ~8% on Starter, 15% on
> Growth, ~20% on Clinic Pro. Customer-facing copy says **"up to 20%"**, which is
> truthful because 20% is the real saving on Clinic Pro. Any single figure quoted
> as *the* annual discount is a bug.
>
> ⚠️ **This site does not read the price catalogue.** The app's two billing
> screens fetch `subscription_plans` from the database, so a re-pricing reaches
> them with no deploy. This repo hardcodes the figures in **four** places —
> `components/pricing/PricingPlans.tsx`, `components/sections/PricingPreview.tsx`,
> `app/pricing/page.tsx` (add-ons + FAQ), and the two help articles
> (`choosing-and-managing-your-subscription.md`, `faq.md`) — plus the homepage
> JSON-LD `offers.price` in `app/page.tsx`, which must quote the real cheapest
> entry price. All of them have to be changed by hand.
>
> Authoritative source: `dental-pms` → `docs/STRIPE_PAYMENTS.md` §2 / §2a.

> ### 📚 Documentation section added (`/docs`)
> A full public docs system now lives under `app/docs/**`, driven by Markdown in
> `content/docs/*.md` via `lib/docs.ts`. See [the Documentation section](#documentation-docs)
> below. When you **add or rename an article**, the sitemap updates automatically,
> but `llms.txt` content and any hand-written cross-links do not — review them.

> ### 🔄 2026-09-03 overhaul
> - **Theme:** recolored from teal to the app brand blue (`#4361EE`). Tokens live
>   in `app/globals.css` `@theme` as `brand-*` (plus a green `accent-*`); pages
>   use `brand-*` utilities. Green is kept deliberately as an accent.
> - **Real screenshots:** the site shows actual app screenshots (in
>   `public/screenshots/*.webp`) via `components/ui/BrowserFrame.tsx`, which frames
>   them in browser chrome and opens a full-size **lightbox** on click. They are
>   captured by `dental-pms/tutorials/src/capture-marketing.ts` from the seeded app.
> - **New pages:** `/about`, `/blog` (+ `/blog/[slug]`, Markdown in `content/blog/`
>   via `lib/blog.ts`, 5 SEO posts), `/sub-processors`. Docs + Tutorials were moved
>   out of the top nav into the footer.
> - **SEO:** keyword-rich titles + per-page canonicals; homepage Organization +
>   SoftwareApplication JSON-LD; `sitemap.xml` and `llms.txt` include about/blog/
>   posts/sub-processors; footer links to `/sitemap.xml` and `/llms.txt`; OG share
>   image at `public/og.png`; raster `public/logo.png` used for Organization logo.
> - **Legal:** `/terms` (25 sections) and `/privacy` (16 sections) are now
>   comprehensive, operated-by **Keplify LLC (Delaware)**, Delaware governing law,
>   framed around target-market laws (POPIA/NDPA/Kenya DPA/LGPD/DPDP). Plain-Markdown
>   mirrors are in `docs/TERMS.md` and `docs/PRIVACY.md` — **keep them in sync** with
>   `app/terms/page.tsx` / `app/privacy/page.tsx`.

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

**Four** tiers in a card grid, with a Monthly/Annual switcher. Figures as of the
2026-11-02 re-pricing:

| Tier | Target | Monthly | Annual | Seats | Storage |
|------|--------|---------|--------|-------|---------|
| **Starter** | Clinic just getting started | $26.90 | $297/yr (~8% off) | Up to 7 | 15 GB |
| **Growth** *(Most popular)* | Established clinic scaling up | $54.90 | $560/yr (15% off) | Up to 20 | 50 GB |
| **Clinic Pro** | Busy, high-volume practice | $99.90 | $960/yr (~20% off) | Up to 45 | 120 GB |
| **Enterprise** | Dental group / large network | Custom | Custom | 45+ | Custom |

**Branches are unlimited on every tier, including Starter** — location count is
not a paid differentiator (see the 2026-08-18 entry in
`WEBSITE_UPDATES_from_app_dev.md`). Seats and storage are the only ones.

Prices **are** shown publicly; the three paid tiers link to the app signup and
Enterprise links to `/contact`. Annual is the default view, and the switcher
badge reads "Save up to 20%", computed from the tier data rather than hardcoded.

Enterprise is described as: custom seats, custom storage, unlimited branches, and
a dedicated account manager with assisted onboarding.

### Contact Page (`/contact`)

Lead generation form with fields: Name, Clinic Name, Email, Phone (optional), Message. Form submission target is TBD (likely a Cloudflare Worker or third-party form service).

### Legal Pages

- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

### Documentation (`/docs`)

The public self-help documentation. Content-driven and fully statically
generated (real, crawlable URLs — good for SEO).

**How it works**

- **Content:** Markdown files with frontmatter (`title, description, category,
  order, updated`) in `content/docs/*.md`. Non-developers can add/edit articles
  here without touching code.
- **Loader:** `lib/docs.ts` is the single source of truth — parses frontmatter,
  renders Markdown → HTML at build time (remark/rehype, with `rehype-slug` +
  autolink for heading ids and an extracted table of contents), and exposes
  `getAllArticles / getArticleBySlug / getArticlesByCategory / getCategories /
  getAdjacentArticles`. Ordered categories live in `DOC_CATEGORIES`.
- **Routes:**
  - `/docs` — index, articles grouped by category (`app/docs/page.tsx`).
  - `/docs/[category]` — category landing (`app/docs/[category]/page.tsx`).
  - `/docs/[category]/[slug]` — article (`app/docs/[category]/[slug]/page.tsx`),
    with in-page TOC, prev/next, and breadcrumbs.
  - All use `generateStaticParams()` + `generateMetadata()` (per-page title,
    description, canonical, OpenGraph).
- **Components:** `components/docs/` — `DocsShell`, `DocsSidebar`, `Breadcrumbs`
  (emits `BreadcrumbList` JSON-LD), `TableOfContents`. Article pages also emit
  `TechArticle` JSON-LD. Prose styling: `.docs-prose` in `app/globals.css`.
- **URL helpers:** `lib/docs-routes.ts` (client-safe, no `fs`) — `articleHref`,
  `categoryHref`, `absoluteArticleUrl`, `SITE_URL`.
- **SEO/discovery:** `app/sitemap.ts` enumerates `/docs`, every category and
  every article. `app/llms.txt/route.ts` emits a machine-readable index for AI
  crawlers.

**Adding an article:** drop a new `.md` in `content/docs/` with valid
frontmatter and an existing `category` id. The sidebar, index, category page,
sitemap and llms.txt pick it up automatically. Hand-written cross-links between
articles are not validated — check them.

**Relationship to in-app help:** the CuspFlow app (`dental-pms`) has an in-app
help panel whose quick-guides link out to these articles at
`https://cuspflow.co/docs/<category>/<slug>`. If you rename or move an article,
update the matching `articlePath` in `dental-pms` → `src/components/help/guides.ts`.

**FAQ:** `/docs/reference/faq` is the single source of truth for FAQs. The
`/pricing` page keeps only a few pricing-specific questions and links here —
don't duplicate the full FAQ in two places.

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
