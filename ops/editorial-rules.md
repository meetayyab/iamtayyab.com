# Editorial rules for iamtayyab.com

These are the standing rules for every post. Accumulated Sep–Oct 2026, **rewritten 23 Nov
2026** after a review found the blog had drifted into developer-to-developer changelog
coverage that could not produce leads. This file is the single source of truth for the
writing routines. If a rule here conflicts with a routine prompt, this file wins.

## Who this is for

Three goals, in order: **personal brand → portfolio → client leads.** They are not in
tension, but only if the reader is the person who hires.

- **Primary reader — the buyer.** A founder, non-technical or semi-technical, at a startup
  or small company in the US/UK/EU, who has a product to build or fix and a budget to
  spend. They are deciding what to build, what it should cost, who should build it, and
  whether they can trust that person. Write for them.
- **Secondary reader — the peer.** Other developers. Worth reaching for referrals and
  reputation, never at the expense of the primary reader. A post whose only possible reader
  is a developer doing a compliance chore does not belong on this blog.
- **Framing.** Global/Western always. Pakistan and Lahore appear only as location proof
  ("from Lahore", "UTC+5 overlap"), never as the audience.
- **The test every candidate must pass:** *could the person who reads this plausibly hire
  the person who wrote it?* If the honest answer is no, it is off-strategy regardless of how
  interesting it is or how well it might rank.

## What we publish — the mix

Aim for roughly this balance over any ten posts. Routines should check the recent mix in
`published.json` before pitching.

### 1. Buyer-intent service content — ~40%

Keyed to the founder's **problem**, not to geography or to a vendor's release notes. Costs,
timelines, scoping, contracts, how to choose and manage a developer, what goes wrong and
why. Evergreen, high intent, the posts that convert.

- Target phrases are what a buyer types with a wallet out: "mvp development cost",
  "how long does it take to build an app", "agency vs freelance developer".
- Expand this cluster by problem, not by country. The geography-keyed hire posts
  (Sep 11–23) stay and get linked, but growth comes from new problems, not new countries.
- The old rule "the hire cluster is complete — don't pitch hire-angle topics" is
  **withdrawn.** It was the rule that starved lead generation. Buyer-intent topics are now
  the single most wanted category.

### 2. Case studies of our own work — ~30%

This is the portfolio and the proof in one artefact. Architecture, the decisions and the
trade-offs, real numbers, what broke, what it cost, what we would do differently.

- Only **DripScore** and **dawnapps.co** may be named. No client names, ever.
- A case study without numbers is a blog post about feelings. Include duration, scope,
  stack, and at least one measured before/after.
- A founder should finish it thinking *this person could build mine.*

### 3. Opinionated positioning — ~20%

A thesis someone could disagree with. This is what builds a brand; summaries do not.

- One clear argument, stated in the lead, defended with experience and evidence.
- "Most MVPs fail because the developer scoped them, not the founder" is a post.
  "Here is what changed in Next.js 16.4" is not.

### 4. Topical, written for the buyer — ~10%

Platform news, deadlines and releases are allowed **only** when rewritten for the person who
pays rather than the person who patches: what it costs, when to budget for it, what happens
if you ignore it, what to ask your developer.

- Not "Android 17's SMS OTP delay — migration checklist" but "Your app's SMS login breaks
  in 2027: the fix and when to budget for it."
- Bundle several deadlines into one planning post rather than one post per changelog entry.
- Never publish a post whose whole value is restating a vendor's announcement. Apple's and
  Google's own docs outrank us on that and deserve to.

## Topic selection

- Pitch **five candidates** per post day. Each carries: working title, *Why this reader
  cares* (the buyer's situation, not a news date), *Reader value*, the **target search
  phrase**, the content category (1–4 above), and 2–3 existing posts it would link to.
- **Evergreen first.** Prefer a topic that is still true in a year. A dated hook is optional
  now, not required — it was the old rule that forced the drift into changelog coverage.
  Category 4 is the only one that needs a news peg.
- Every candidate must plausibly link to **two existing posts**. If it cannot, it is
  probably off-niche.
- Exclude anything already in `published.json` (by topic, not just slug), anything on the
  last 10 shortlists, and anything the owner has passed on twice.
- Check the mix. If the last ten posts were all category 1, pitch case studies.

## Writing

- Length 2,000–3,500 words (hard floor 1,500 in the validator). Dated facts, numbers with
  units, named sources.
- **Structure** — adapt the spine to the category, don't force the news shape onto
  everything:
  - *Buyer-intent:* lead that answers the title → the short answer with the number up front
    → what drives the number / the decision → the practical core as H2 + numbered H3s
    (scopes, scenarios, steps) → what goes wrong → "Caveats" → "Quick checklist" → FAQ →
    one soft CTA paragraph → `## Sources`.
  - *Case study:* the outcome first → the constraint → the build, in stages → the numbers →
    what we'd change → FAQ → CTA → Sources.
  - *Positioning:* the thesis in the lead → the case → the strongest counter-argument,
    answered honestly → what to do instead → FAQ → CTA → Sources.
  - *Topical-for-buyers:* what changed and the date → what it costs you → the deadlines as a
    budget table → what to ask your developer → FAQ → CTA → Sources.
- **Headings:** one H1 only (the `title` field; never `#` in the body). H2 for sections, H3
  inside. Never write "About the author", "Soft CTA", "Written by" or a bio into the body —
  the template renders the author box, the CTA button and related posts.
- **Title vs H1:** the Sanity `title` is the H1 and carries the target phrase. The catchier
  question-style line goes in `excerpt`, not the title.
- **Links, inline:** cite the claim where it is made, in the sentence, not only in Sources.
  Minimum **3 internal links** to other iamtayyab.com posts in the body (not nav, not CTA),
  chosen by topic, descriptive anchors, absolute `https://www.iamtayyab.com/...` URLs. Every
  post in a cluster links to its hub.
- **Money and rates:** label every third-party figure with its source and date, and say so
  when sources disagree. **Never invent Tayyab's own rates, fees or project prices** — those
  come from him or they do not appear. Market ranges are sourced; our prices are quoted.
  When a cost model is built from assumptions, show the assumptions.
- **Code:** 3–5 short labelled blocks (`# example`) on technical posts. Buyer-facing posts
  usually need none — do not add code to look credible. Code is the only thing that goes in
  code blocks: tables, rate cards and lists go in Markdown tables or bullets.
- **Security topics** are defence-only: what to check and fix, never how to attack.
- **Corrections:** if research contradicts the shortlist, use the sourced version and list
  the differences in the draft summary.
- `seoTitle` ≤ 60 chars (the template adds the brand suffix), `seoDescription` 140–160 chars,
  both always set. `excerpt` 1–2 sentences.
- **Tags:** 3–5 from the canonical list in `ops/tags.json`. Title case, spaces not hyphens.
  Add a canonical tag only if ≥3 posts will share it.
- **Cover:** a free Unsplash photo via the API, landscape, relevant, no text in the image, no
  faces of identifiable people, photographer credited in the alt text, and the
  `trigger download` endpoint called (Unsplash API terms). Never AI-generated covers.
- **FAQ:** H2 exactly `FAQ`, 4–6 `###` questions phrased the way someone would search them,
  one-paragraph answers. This feeds FAQPage schema and the validator checks for it.
- Sponsored or paid links, if ever accepted, get `rel="sponsored"` and a visible label.
  Off-topic paid posts are refused.

## Every post ends somewhere

A post that ranks and converts nothing is a leaky bucket. Each post must have **one obvious
next step** for the buyer, in the soft CTA paragraph the body ends with (the template renders
the button; the paragraph sets it up).

- Buyer-intent and topical posts point at the service page.
- Case studies point at the service page or the product, whichever the post earned.
- Note in `published.json` which service page each post sends readers to, so the routines can
  see which topics actually feed it.
- Standing gap, not yet solved: there is no email capture or booking link in the stack. Until
  there is, the service page is the only destination. Worth raising with Tayyab rather than
  quietly inventing one.

## Author identity (never deviate)

- Byline: **Muhammad Tayyab**. Never "meetayyab" (that is the GitHub handle only).
- Products that may be mentioned: **DripScore** (App Store) and **dawnapps.co**. Nothing
  else — no Talk Motion, WorkConnect, Black Seal, Efani, or client names.
- Socials: GitHub `meetayyab`, X `@iamtayyabx`, LinkedIn `immtayyab`.
- Location: Lahore, Pakistan. (Not Peshawar — corrected site-wide on Sep 4.)

## Publishing

- Create the post as a **draft** (`drafts.` document) first; publish only after Tayyab
  replies "yes". The summary lists title, word count, source count, cover description,
  internal links added, and any corrections.
- After publish: wait for ISR (≥60 s), fetch the live URL and confirm 200 + title present,
  confirm the slug is in `/sitemap.xml`, screenshot light and dark at 1280×, check the TOC
  and related posts render, then record the post in `published.json` and commit.
- Indexing: ping IndexNow, run GSC URL Inspection (status only), and attempt the GSC
  "Request indexing" click if a browser session is available. **Never** use the Indexing API
  for blog URLs.

## Fridays: measure, then improve

No new post. Friday is where the strategy gets checked against data instead of opinion.

1. Pull Search Console numbers (`ops/scripts/gsc-report.mjs`) into `ops/reports/`.
2. Report the mix: how many of the last ten posts were category 1–4, and which categories are
   actually earning impressions, clicks and service-page visits.
3. Pick the 2–3 posts with the most impressions but position > 8 and improve them —
   sharpen the title and `seoDescription` against the target phrase, add 2–3 inline internal
   links from and to them, strengthen the closing CTA, update anything dated, fix any
   "About the author"/"Soft CTA" body sections, normalise tags, republish (updates `lastmod`).
4. Record `lastRefreshed` in `published.json`.

Refresh now means *make it rank and convert better*, not *keep a decaying news post alive*.
A post that only needs refreshing because its facts expired is a post we should not have
written.
