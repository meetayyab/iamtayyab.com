# Editorial rules for iamtayyab.com

These are the standing rules for every post. **Updated 2026-11-25: the reader is a founder
who pays for software to be built, not a developer who builds it.** That change supersedes
the Sep–Oct 2026 rules, which pointed the blog at indie developers and told the routines not
to pitch hire-angle topics. If a rule here conflicts with a routine prompt, this file wins.

## Who this is for

- **Primary reader:** a **founder, startup CTO, product owner or agency owner** in the
  US/UK/EU who is *paying someone else* to build or maintain software. They are deciding
  what to build, what it should cost, who should build it, how to tell whether the work is
  any good, and whether what they already have is in trouble. They sign the contract and
  approve the budget. Assume they are smart, commercially sharp, and not fluent in the
  stack.
- **Not the reader:** a working developer looking for a how-to. A developer may read a post
  and get value from it, but **if a post is only useful to someone who already writes the
  code, it is the wrong post.** No vendor-changelog walkthroughs, no migration tutorials,
  no "here's the new API" explainers as the body of a post.
- **Goal, in order:** leads → projects → traffic. Traffic counts only when it is the kind of
  reader who could become a client. A post that ranks for a phrase only developers search is
  a miss even when it ranks well.
- **The conversion job:** every post sits in the *problem-aware layer above* the hire
  cluster. The reader arrives worried about a decision, a cost or a risk; the post answers it
  straight and honestly; the obvious next step is the hire hub
  (`/full-stack-developer-pakistan`) or the hire-cluster post that fits. Earn the click by
  being useful, never by withholding the answer.
- **Audience geography:** global/Western framing always. Pakistan and Lahore appear only as
  location proof ("from Lahore", "UTC+5 overlap"), never as the audience.

## Author identity (never deviate)

- Byline: **Muhammad Tayyab**. Never "meetayyab" (that is only the GitHub handle).
- Products you may mention: **DripScore** (App Store) and **dawnapps.co**. Nothing else
  (no Talk Motion, WorkConnect, Black Seal, Efani, client names).
- Socials: GitHub `meetayyab`, X `@iamtayyabx`, LinkedIn `immtayyab`.
- Location: Lahore, Pakistan. (Not Peshawar — that was corrected site-wide on Sep 4.)
- **Voice:** the experienced builder the reader wishes they had on the call. Direct, specific,
  willing to say "don't build that" or "you are being overcharged". Never salesy, never
  condescending, never hedging to avoid committing to an answer.

## Topic selection

- Five candidates per weekday. Every one must pass the **owner test**:

  > Would a founder who is paying someone else to write the code click this — and after
  > reading it, would they trust the person who wrote it with their project?

  If the honest answer is "only a developer would care about this", drop it.

- **Where topics come from**, in order of preference:
  1. **Questions founders actually ask** before, during and after hiring a developer: what
     should this cost, how long should it take, is this scope reasonable, why is my build
     late, do I actually need a rewrite, what am I paying for in this invoice, how do I check
     this work is any good, what happens if my developer disappears.
  2. **A dated change that costs founders money, time, revenue or sleep** — a store policy,
     tax or pricing change, a compliance deadline, a platform cutoff, a security incident
     class. Lead with the business consequence and the deadline. The API is a detail, not
     the story.
  3. **Company-level decisions:** build vs buy, in-house vs contractor vs agency, what to
     keep on a retainer, when to stop paying for a tool, how much maintenance a shipped
     product really needs.
  4. **Judgement from real work:** post-mortems and calls made on live projects, written so a
     buyer learns what good looks like and what to demand.
- **The translation rule.** A technical event becomes a topic only once you can state it as
  money, time, risk or revenue in one sentence. "Apple changed its age rating questionnaire"
  is not a topic. "Every app has to re-declare by January 12 or it can't ship an update, and
  one wrong answer forces your app to 18+" is.
- **Hire-angle and buyer-intent topics are encouraged.** This replaces the old rule that said
  the hire cluster was complete and not to pitch them. Don't duplicate an existing cluster
  post — write the layer above it and link down into it.
- **Hooks:** a dated hook is preferred, and news-pegged posts must still be useful after the
  date passes ("what this class of change does to your roadmap"). An **evergreen buyer
  question** may run without a dated hook when the intent is high — in that case *Why now*
  explains why the question keeps coming up, not what shipped this week.
- Each candidate carries: working title, *Why now* (hook + source), *Reader value* (**what the
  founder can decide after reading**), the **target search phrase** — something a *buyer*
  would type, not a developer — and 2–3 existing posts it links to, **at least one of which
  is a hire-cluster post or the hub**.
- Exclude anything already in `ops/published.json` (by topic, not just slug), anything on the
  last 10 shortlists, and anything the owner has passed on twice.

## Writing

- Length 2,000–3,500 words. Dated facts, numbers with units, named sources.
- **Plain language.** Define every technical term the first time it appears, in the sentence,
  in plain English. If a paragraph can't be followed by a founder without a glossary, rewrite
  it. Never use jargon to sound authoritative.
- **Structure.** Lead paragraph answers the title in 2–3 sentences, in business terms →
  then either:
  - *dated post:* "What changed and what it costs you" (dated) → "Where things stand" →
    the practical core; or
  - *evergreen buyer post:* "The short answer" → "Why this keeps happening" → the practical
    core.

  The practical core is H2 + numbered H3s (a decision framework, cost breakdown, scenarios,
  questions to ask, checklist) → "Caveats and corrections" → "Quick checklist" → **FAQ**
  (H2 exactly `FAQ`, 4–6 H3 questions, one-paragraph answers — this feeds FAQPage schema) →
  one soft CTA paragraph → `## Sources`.
- **Headings:** one H1 only (the title field; never put `#` in the body). H2 for sections, H3
  inside. Never write "About the author", "Soft CTA", "Written by" or a bio into the body:
  the template renders the author box, the CTA button and related posts.
- **Title vs H1:** the Sanity `title` is the H1 and carries the target phrase. Put the
  catchier question-style line in `excerpt`, not in the title.
- **Numbers founders care about:** cost ranges in USD, timelines in weeks, effort in
  developer-days — always with the basis stated ("for a two-screen feature on an existing
  codebase"). A post that says "it depends" without giving a range has failed.
- **Links, inline:** cite the claim where it is made — `[Apple's release notes](url)` in the
  sentence, not only in the Sources list. Minimum 3 internal links to other iamtayyab.com
  posts in the body (not nav, not CTA), descriptive anchors, **at least one into the hire hub
  or a hire-cluster post** where it is genuinely relevant. Internal links use absolute
  `https://www.iamtayyab.com/...` URLs. Every post in a cluster links to its hub.
- **Code is optional and never load-bearing.** At most 2 short labelled blocks
  (`# example`), and only when the reader needs to see the *shape* of something to judge it.
  These posts are carried by cost tables, timelines, checklists, decision trees and
  questions-to-ask lists — not snippets. If you are explaining syntax, you are writing for
  the wrong reader.
- **Tables** are GitHub-flavoured Markdown, ≤ 4 columns, or use bullets. Rate cards and cost
  breakdowns go in tables or bullets, never in a code block (a code-block rate snapshot
  clipped on mobile once).
- **Security topics** are defence-only: what to check and fix, never how to attack. Frame the
  risk commercially (what an incident costs, what to require of a contractor).
- **Rates and third-party figures** are labelled by source and date; when sources disagree,
  say so in the post.
- **Corrections:** if research contradicts the morning summary, use the sourced version and
  list the differences in the draft summary.
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
- When refreshing a post written under the old developer-audience rules, also add the
  founder-level framing and at least one link into the hire hub or cluster if it is missing.
