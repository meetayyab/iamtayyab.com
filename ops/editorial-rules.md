# Editorial rules for iamtayyab.com

These are the standing rules for every post. They were accumulated over Sep–Oct 2026 and
are the single source of truth for the writing routines. If a rule here conflicts with a
routine prompt, this file wins.

## Who this is for

- **Goal, in order:** traffic → leads → projects. Every post must plausibly do at least one of:
  rank for a phrase people search, get shared by builders, or move a founder toward
  `/full-stack-developer-pakistan`.
- **Audience:** indie developers, solo founders and small startup teams in the US/UK/EU
  shipping web and mobile products. Global/Western framing always. Pakistan and Lahore
  appear only as location proof ("from Lahore", "UTC+5 overlap"), never as the audience.
- **Niche:** software development, systems design, indie app development; building and
  scaling web and mobile apps. Concretely: AI coding agents, App Store / Google Play
  growth and policy, ASO, SaaS pricing and billing, Next.js / React Native / Node.js,
  security for small backends, hiring and working with remote developers.

## Author identity (never deviate)

- Byline: **Muhammad Tayyab**. Never "meetayyab" (that is only the GitHub handle).
- Products you may mention: **DripScore** (App Store) and **dawnapps.co**. Nothing else
  (no Talk Motion, WorkConnect, Black Seal, Efani, client names).
- Socials: GitHub `meetayyab`, X `@iamtayyabx`, LinkedIn `immtayyab`.
- Location: Lahore, Pakistan. (Not Peshawar — that was corrected site-wide on Sep 4.)

## Topic selection

- Five candidates per weekday, each tied to something that happened **this week** with a
  primary source (vendor changelog, official docs, HN/Product Hunt launch, Reuters etc.).
- Each candidate carries: working title, *Why now* (dated hook + source), *Reader value*
  (what the post covers, for whom), the **target search phrase**, and 2–3 existing posts it
  would link to. If it can't link to two existing posts, it is probably off-niche.
- Exclude anything already in `ops/published.json` (by topic, not just slug), anything on
  the last 10 shortlists, and anything the owner has passed on twice.
- Prefer evergreen-with-a-hook over pure news: "X changed on Oct 20 — here is the checklist"
  outlives "X changed".
- Don't pitch hire-angle topics unless asked; the hire cluster is complete.

## Writing

- Length 2,000–3,500 words. Dated facts, numbers with units, named sources.
- **Structure:** lead paragraph that answers the title in 2–3 sentences → "What changed /
  what launched" (dated) → "Where things stand" → the practical core as H2 + numbered H3s
  (checklist, scenarios, steps) → "Caveats and corrections" → "Quick checklist" →
  **FAQ** (H2 exactly `FAQ`, 4–6 H3 questions, one-paragraph answers — this feeds FAQPage
  schema) → one soft CTA paragraph → `## Sources`.
- **Headings:** one H1 only (the title field; never put `#` in the body). H2 for sections,
  H3 inside. Never write "About the author", "Soft CTA", "Written by" or a bio into the
  body: the template renders the author box, the CTA button and related posts.
- **Title vs H1:** the Sanity `title` is the H1 and should carry the target phrase. Put the
  catchier question-style line in `excerpt`, not in the title.
- **Links, inline:** cite the claim where it is made — `[Stripe's docs](url)` in the
  sentence, not only in the Sources list. Minimum 3 internal links to other
  iamtayyab.com posts in the body (not nav, not CTA), chosen by topic, with descriptive
  anchors. Internal links use absolute `https://www.iamtayyab.com/...` URLs. Every post
  in a cluster links to its hub.
- **Code:** 3–5 short labelled example blocks (`# example`) for technical posts. Code is
  the only thing that goes in code blocks: tables, rate cards and lists go in Markdown
  tables or bullets (a code-block rate snapshot clipped on mobile once).
- **Security topics** are defence-only: what to check and fix, never how to attack.
- **Rates and third-party figures** are labelled by source and date; when sources disagree,
  say so in the post.
- **Corrections:** if research contradicts the morning summary, use the sourced version
  and list the differences in the draft summary.
- `seoTitle` ≤ 60 chars (brand suffix is added by the template), `seoDescription` 140–160
  chars, always set. `excerpt` 1–2 sentences.
- **Tags:** 3–5 from the canonical list in `ops/tags.json`. Title case, spaces not hyphens
  ("AI agents", not "ai-agents"). Add a new canonical tag only if ≥3 posts will share it.
- **Cover:** a free Unsplash photo found via the API, landscape, relevant, no text in the
  image, no faces of identifiable people, photographer credited in the alt text and the
  `trigger download` endpoint called (Unsplash API terms). Never AI-generated covers.
- Sponsored or paid links, if ever accepted, get `rel="sponsored"` and a visible label.
  Off-topic paid posts are refused.

## Publishing

- Create the post as a **draft** (`drafts.` document) first; publish only after the owner
  replies "yes". The summary message lists title, word count, source count, cover
  description, internal links added, and any corrections.
- After publish: wait for ISR (≥60 s), fetch the live URL and confirm 200 + title present,
  confirm the slug is in `/sitemap.xml`, screenshot light and dark at 1280×, check the TOC
  and related posts render, then record the post in `ops/published.json` and commit.
- Indexing: ping IndexNow, run GSC URL Inspection (status only), and attempt the GSC
  "Request indexing" click if a browser session is available. Never use the Indexing API
  for blog URLs.

## Fridays: refresh, don't publish

- No new post. Pick the 2–3 published posts with the most impressions but position > 8
  (from the Monday report), update dated facts, add 2–3 inline internal links from and to
  them, fix any "About the author"/"Soft CTA" body sections, normalise tags, and republish
  (updates `lastmod`). Record `lastRefreshed` in `published.json`.
