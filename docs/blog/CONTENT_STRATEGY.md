# CuspFlow blog: SEO content strategy

Owner of this document: whoever runs the blog programme. Last reviewed 2026-11-05.

This is the source of truth for what we publish and how. The machine-readable pipeline
lives in `scripts/publish-due-posts.mjs`, the topic ledger in `TOPIC_BACKLOG.md`, and the
writing procedure in the `cuspflow-blog-batch` skill. If this document and the skill
disagree, this document wins and the skill should be corrected.

---

## 1. Why we are doing this

Before November 2026 the blog had five posts, no keyword plan, and no measurement. Organic
acquisition was effectively unseeded.

The opening is real and it is specific. Searches for country-level buying queries in our
markets return vendor landing pages and directory stubs, not independent guides. Searches
for operational queries return vendor posts citing unsourced statistics that contradict
each other (one competitor claims reminders cut no-shows by 25 to 35 percent, another
claims 40 to 60 percent, a third cites a study with no link). Specific, locally grounded,
honest writing beats that without much effort.

Our product differentiators map directly onto those queries:

- 148 served countries, each with its own currency symbol, locale and IANA timezone
- Per-clinic VAT and sales tax, shown as a line on receipts
- Mobile money as a payment method, with a per-clinic provider list
- Unlimited branches on every plan
- WhatsApp appointment and balance reminders, with email fallback
- A free, built-in data import tool
- Receipts in A4, A5 and 80mm thermal, with a configurable header and footer

## 2. Who we write for

The owner-dentist or practice manager of a 1 to 10 chair private clinic, or a 2 to 20
branch group, in Africa, MENA, South and South-East Asia, or the Pacific.

One thing to keep in mind, because it changes the tone of every operational post: in a
small clinic the receptionist is usually also the cashier and often the pharmacist, and is
the person who actually types everything into the system after the doctor has written on
paper. Write operational content for that person, not for an imagined office
administrator with nothing else to do.

Buying triggers worth writing into:

- Opening a second branch
- Paper records no longer coping
- Money leaking: treatment done but never billed, cash that will not reconcile
- Arguments with associate dentists over commission
- Escaping an expensive desktop system, or one that only runs on the front-desk PC

## 3. Markets, ranked by how winnable they are

English only. The app has no translation layer and the interface is English, so there is
no point writing in other languages yet. The ranking below is by competition we actually
found in the search results, not by market size.

| Tier | Markets | Why |
| --- | --- | --- |
| 1. Write first | Uganda, Tanzania, Rwanda, Zambia, Ghana, Kenya, Nigeria, Bangladesh, Sri Lanka, Nepal, Philippines, Fiji | Results are vendor pages and directory stubs only. No independent guide owns these queries. Uganda counts double: it is the signup default country and our reference clinic is there |
| 2. Write next | UAE, Saudi Arabia, Qatar, Kuwait, Oman, Jordan, Egypt, Pakistan, India, Malaysia, Indonesia, South Africa | Real local competitors exist (Dentolize, Mindcat, MocDoc, OdontoX, Dentee) but their coverage is still vendor-grade and beatable |
| 3. Deprioritise | Australia, New Zealand | Entrenched incumbents with genuine review-site presence (Praktika, Core Practice, CareStack, Exact, D4W, Dentrix Ascend). Hard, and a poor use of early effort |
| Not yet | Brazil, Mexico, Spanish-speaking Latin America | Served markets, but English content will not rank there and we have no translations. A deliberate deferral, revisit if we add i18n |

## 4. The four clusters

| Cluster | Share of output | Shape | Why it earns its place |
| --- | --- | --- | --- |
| A. Country buying guides | about 40% | "Dental Clinic Software in {Country}: What to Look For" | Highest commercial intent, weakest competition, and the one cluster where multi-country support is genuinely the story |
| B. Operational how-to | about 35% | "End-of-day cash reconciliation for a dental clinic" | Long-tail informational. Every topic maps to a real module, so the product mention is honest rather than bolted on |
| C. Switching and alternatives | about 15% | "Cloud or desktop dental software" | Evaluation stage, and comparison content carries disproportionate weight in AI-assisted research |
| D. Role and checklist | about 10% | "The dental receptionist's opening and closing checklist" | Question-shaped, easy to extract into a snippet, and genuinely shareable inside a clinic |

Country guides hang on local hooks that actually exist in the product: the local currency
and number format, that country's VAT or sales tax as a receipt line, mobile money as a
recorded payment method, unlimited branches, WhatsApp reminders, clinic-maintained private
insurance carriers rather than a national payer, and that country's data-protection law
named correctly.

## 5. Keyword method

No paid tools, so the method has to be repeatable from what we have. For each candidate
topic:

1. Run a web search for the primary keyword and read who ranks. Weak competition looks
   like vendor landing pages, Capterra or SourceForge directory stubs, and US-only
   products. Skip the topic if a strong independent guide already owns the query.
2. Harvest the related phrasings and questions out of the results, and turn them into H2
   headings.
3. Confirm nothing of ours already targets it. Grep `content/blog/`, `content/docs/`, and
   the copy in `/features` and `/pricing`.
4. Pick exactly one primary keyword. Long-tail, carrying a `software`, `system`,
   `management`, `cost`, `best`, `checklist` or `how to` modifier, plus a country or
   clinic-size qualifier.

Placement: the primary keyword goes in the title, the description, the slug, the first 100
words, and one H2. Three to six secondary phrases become H2 questions. Nothing stuffed,
nothing repeated mechanically.

### What we must not re-target

These are already owned and a second page would only split the signal.

- The five original posts: choosing dental practice management software (buyer's guide),
  dental billing and getting paid faster, multi-branch and multi-location management,
  reducing patient wait times, and switching software without losing data
- Every product-feature term: owned by `/features` and the 34 articles under `/docs`
- Every price, plan and cost-of-the-product query: owned by `/pricing`

## 6. Internal linking: a map, not a sprinkle

Over-linking is the standard failure of generated content, so this is capped hard.

Hubs are `/features`, `/pricing`, the relevant `/docs/<category>/<article>`, and the five
original posts, which act as cluster hubs:

| Hub | Cluster it anchors |
| --- | --- |
| `/blog/how-to-choose-dental-practice-management-software` | A, country guides |
| `/blog/dental-billing-get-paid-faster` | B, anything about money |
| `/blog/multi-branch-dental-practice-management` | B and D, anything about growth |
| `/blog/reduce-patient-wait-times-dental-clinic` | B, anything about patient flow |
| `/blog/switch-dental-software-without-losing-data` | C, switching and alternatives |

Every new post links up to exactly one hub and sideways to one or two siblings in its own
cluster.

Hard caps:

- 3 to 5 internal links per post, never more
- No more than one link per roughly 150 words
- Never two links in one sentence
- Never the same target twice in one post
- No links at all in the opening answer paragraph
- Exactly one link to `app.cuspflow.co/signup`, in the closing paragraph

Anchor text is the target's subject in natural words. Never "click here", never a bare
URL, and never the exact primary keyword used as anchor text across several posts.

## 7. Post format

- 550 to 800 words of body text
- The opening paragraph is a 50 to 70 word direct answer to the title's question. Front
  loading is the single highest-value structural choice for both featured snippets and AI
  answers, which skew heavily towards the first third of a page
- Three or four H2 headings, phrased as questions a buyer would actually type. Each H2's
  first sentence answers it on its own, without needing the paragraph around it
- One table at most, and only in a country guide. Tables eat the word budget fast
- A `## Common questions` section with two or three Q&As as H3 headings
- A closing paragraph with the single call to action
- At least two images (see section 9)
- `readingTime: "3 min read"` at this length

Frontmatter must match the contract in `lib/blog.ts`. `title`, `description`, `date` and
`author` are required and the build throws without them. `readingTime` and `tags` are
optional. House style, copied from the original posts: double-quoted scalar values, block
sequence style for `tags`, no `# H1` in the body because the page renders the H1 from
`title`, and `author: "The CuspFlow Team"`.

## 8. Voice: writing that reads like a person wrote it

No word list proves authorship, and overuse matters more than any single word. So this is
structural as much as lexical.

Never:

- Em dashes. Use a comma, a colon, brackets, or two sentences
- Emoji, anywhere, including in headings
- The inflated register: delve, leverage, robust, seamless, streamline, unlock, elevate,
  harness, pivotal, crucial, vital, paramount, myriad, plethora, realm, landscape,
  tapestry, testament, game-changer, cutting-edge, state-of-the-art, holistic, synergy,
  bustling, ever-evolving, fast-paced
- The giveaway constructions: "In today's ... world", "It's not just X, it's Y", "Let's
  dive in", "In conclusion", "At its core", "When it comes to", "Moreover" or
  "Furthermore" or "Additionally" opening a paragraph, "Whether you're a ... or a ...", a
  rhetorical question as the first line, and a bolded one-line summary under every heading
- Three-item lists as the default rhythm. Vary to two, four, five
- Hedging stacks like "may potentially help to somewhat improve"

Do:

- Vary sentence length deliberately. Some short. Some that run longer because the thought
  needs the room
- Use contractions where they fall naturally
- Name one concrete, checkable specific per section: a real currency, a real tax rate where
  it is accurate, an actual sequence of steps, one of the eight named access roles
- Write in the second person, to the clinic owner or the receptionist
- State a trade-off, or something the product does not do. Nothing reads more human than an
  honest limitation, and it also happens to be true
- Let a paragraph be one sentence when that is the right length

## 9. Images

At least two per post. We author them rather than generate them, which is the better
choice here anyway: generic AI illustration is its own credibility tell, while a clear
diagram and a real screenshot are not.

Two sources:

1. An authored SVG diagram, at least one per post. A process flow, a before and after, an
   annotated comparison, a labelled checklist, a decision tree. Palette comes from
   `app/globals.css`: brand `#4361EE`, `#3451D1`, `#eef2ff`; accent green `#10b981`,
   `#059669`; neutrals `#0f172a`, `#475569`, `#f8fafc`, `#e2e8f0`. Use
   `viewBox="0 0 1200 630"`, `font-family="Inter, system-ui, -apple-system, sans-serif"`,
   labels as real `<text>` elements so they stay selectable and indexable, at most six
   labels, no clip-art, no emoji, no gradients. Light only, because the site has no dark
   mode.
2. A real product screenshot from `public/screenshots/`, where the topic maps to a module.
   Available: `appointments`, `claims`, `dashboard`, `data-migration`, `financials`, `hr`,
   `inventory`, `patients`, `price-catalog`, `reports`, `treatment-plans`, `waiting-room`.
   Where no screenshot fits, the second image is another authored SVG.

Placement: image one directly after the opening answer paragraph, image two in the middle
third. Never two images adjacent, never one immediately before the call to action.

SEO attributes, which is where most of the value sits:

| Attribute | Rule |
| --- | --- |
| Path | `public/blog/<post-slug>/<descriptive-name>.svg` |
| Filename | 3 to 6 lowercase hyphenated words describing the image, not the post. `end-of-day-till-count-flow.svg`, never `image-1.svg` and never a keyword-stuffed name |
| `alt` | One specific sentence describing what is shown, under about 125 characters, carrying the primary keyword at most once and only where it falls naturally. Never "image of" or "picture showing" |
| Caption | A short sentence adding something the body text does not already say |
| `width`, `height` | Set automatically from the real file at build time, so there is no layout shift |
| `loading` | `eager` with `fetchpriority="high"` on the first image, because it is usually the LCP element. `lazy` on the rest |
| Sitemap | Each post's images are listed on its `sitemap.xml` entry automatically |

All the writer produces is Markdown. The third argument is Markdown's image title, and the
build turns it into the caption:

```markdown
![A patient moving from Waiting to In Treatment to Billing on a clinic board](/blog/my-slug/patient-flow-waiting-to-billing.svg "Every payment lands against a named cashier, so the till count has something to reconcile against.")
```

## 10. Hard guardrails

Posts publish automatically with no human review, so these rules carry the whole quality
burden. Sources: `docs/WEBSITE_CONTENT.md` content rules, `docs/HANDOVER.md` section 1,
the app repo's `docs/STRIPE_PAYMENTS.md` section 2, and ADR-014.

- Never state a price, a plan price, or an annual discount figure. Link to `/pricing`
  instead. Publishing pricing figures needs explicit permission, and dozens of unattended
  posts would guarantee drift. Plan names are fine, numbers are not
- Say "assisted onboarding" and "free, built-in data import tool". Never "free onboarding
  session" and never "data migration support"
- Never imply feature gating. Every plan includes every feature, and branches are
  unlimited on every plan
- No HIPAA and no GDPR. CuspFlow is not offered to the United States, Canada or Europe.
  Name POPIA for South Africa, the NDPA for Nigeria, the Data Protection Act for Kenya, or
  the DPDP Act for India, and only where it is accurate for that post's market
- Never name our tech stack, hosting provider or database
- No SMS. It was retired in July 2026. Reminders are WhatsApp with email fallback
- No invented numbers, customers or quotes. A statistic is either fetched and linked at
  write time or left out entirely. Describing a mechanism beats citing a fake percentage,
  and it is what the competition gets wrong
- Mobile money is a recorded payment method with a per-clinic configurable provider list.
  Never claim an M-Pesa, Airtel, Paystack or Flutterwave integration
- No patient portal and no native mobile app. Neither is built, and the mobile app is
  permanently out of scope
- Cluster C factuality: competitor claims come only from that competitor's own live public
  pages, fetched at write time. No competitor price comparisons, no disparagement, and
  "alternatives to X" framing rather than a head-to-head verdict

## 11. Cadence and mechanics

- A writer run every Sunday evening produces five posts into `content/blog-queue/`, each
  stamped with a `publishAt` on a different day of the coming week
- A publisher run twice a day moves at most one due post into `content/blog/`, builds,
  and pushes. The push deploys to the live site
- Five distinct days are sampled from the coming seven, and each post gets a distinct time
  from 08:10, 10:35, 12:50, 14:25, 16:40. Two posts never share a day
- Queued posts are invisible to the site until they are moved, because `lib/blog.ts` reads
  `content/blog` only. That gives a review window: anything in `content/blog-queue/` can
  still be edited or deleted before it goes live

## 12. The tracker

Two places record what has been published.

1. `public/blog-tracker.csv`, served live at <https://cuspflow.co/blog-tracker.csv>. This
   is the source of truth. The publisher appends a row every time a post goes live, so it
   is never stale. Columns: Post #, Title, URL, Date Published, Cluster, Target Market,
   Primary Keyword, Status. No post content, by design.
2. The Google Sheet "CuspFlow Blog Tracker" in the `CUSPFLOW SMC - 2026` Drive folder:
   <https://docs.google.com/spreadsheets/d/1T1mzrmwjiid0AKyOoUl0jW_b6nPyMx1SM5MUq5410SU/edit>

The Sheet currently holds a snapshot, because Drive's CSV import deliberately never
evaluates formulas, so an auto-syncing sheet cannot be created programmatically. Verified
twice: both a CSV-quoted and an unquoted `=IMPORTDATA(...)` upload land in the cell as
literal text.

**One-time upgrade to make the Sheet keep itself current.** In the Sheet: select all
(Cmd+A) and delete, click cell A1, and paste

```
=IMPORTDATA("https://cuspflow.co/blog-tracker.csv")
```

From then on the Sheet pulls from the live CSV and refreshes roughly hourly on its own,
with no further intervention and the same link. Until that is done, the Sheet needs a
manual refresh and the CSV is the authoritative record.

## 13. Measurement

Both halves are in place as of 2026-11-05.

### Google Search Console

Property: `https://cuspflow.co/` (URL prefix), verified by the HTML tag method. The token
lives in `metadata.verification.google` in `app/layout.tsx`.

**Do not remove that tag.** Google re-checks ownership on an ongoing basis, so deleting it
un-verifies the property and the search data goes with it.

`sitemap.xml` is submitted and reading successfully (144 pages at submission). Nothing
needs re-submitting when a post publishes: `app/sitemap.ts` regenerates from
`getAllPosts()` on every build, and Google re-reads it on its own schedule. For a post you
want crawled sooner, use URL Inspection on its URL and click Request indexing. That has a
daily quota, so it is worth using on a launch post rather than on all five every week.

Note the property covers `https://cuspflow.co/` only, not `app.cuspflow.co`. If the app
subdomain ever needs its own search data, add a separate Domain property, which needs a
DNS TXT record rather than a meta tag.

### Analytics

Cloudflare Web Analytics has been running on cuspflow.co since roughly April 2026, under
the `Mike@keplify.com` Cloudflare account, in "Automatic setup" mode.

This is why there is **no analytics script anywhere in this repo, and none should be
added**. Cloudflare injects the beacon at the edge, so adding a second one in the page
source would double-count every visit.

One thing that will mislead you if you check it the wrong way: `curl https://cuspflow.co/`
shows no beacon, because Cloudflare skips injection for non-browser user agents. Verify in
a real browser instead. On a live page the DOM carries
`script[src*="cloudflareinsights"]` and a `data-cf-beacon` attribute.

Web Analytics is cookieless, which is part of why the site has no cookie banner. Keep it
that way: switching to a cookie-setting analytics product would mean adding consent UI in
every market we serve.

### What to review monthly

- Search Console, Performance: impressions and clicks by query, and which cluster is
  earning them. Country guides should start showing impressions for `dental clinic
  software <country>` style queries before they show clicks.
- Search Console, Pages: whether new posts are moving from Discovered to Indexed. A post
  stuck on "Discovered, currently not indexed" for weeks is a quality signal, not a
  technical one.
- Cloudflare Web Analytics: page views by path, and referrers.
- Refill `TOPIC_BACKLOG.md` from the queries that actually earned impressions rather than
  guessing a second time.
