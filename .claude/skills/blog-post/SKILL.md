---
name: blog-post
description: Write a blog post for iamtayyab.com in the house format (Markdown with frontmatter that ops/scripts/sanity-publish.mjs converts to Sanity Portable Text). Use whenever drafting or refreshing a post. Enforces the SEO structure, inline linking, FAQ, tags and cover rules.
---

# Writing a post for iamtayyab.com

Read `ops/editorial-rules.md` first. This skill is the file format and the checklist.

**The reader is a founder, startup CTO or agency owner who pays for software to be built —
not a developer who builds it.** They approve the budget and sign the contract, and they are
not fluent in the stack. Write so they can make a decision. If the body of the post is only
useful to someone who already writes the code, it is the wrong post.

## 1. Research before writing

- Open the primary sources named in the shortlist (vendor docs, changelogs, official posts,
  the HN/PH thread). A search snippet is not a source.
- Read `ops/published.json` and pick **at least 3 existing posts** to link inline, by topic.
  Note their URLs and a one-line reason each. **At least one must be a hire-cluster post or
  the hub** (`ops/hire-pages.json`) where it is genuinely relevant.
- Pick the **target search phrase** (3–6 words **a buyer would type**, not a developer —
  "how much does an app cost to maintain", not "Background Assets migration"). It goes in
  the title, the first 100 words, one H2, and the `seoDescription`.
- State the **translation**: the one sentence that turns the underlying event into money,
  time, risk or revenue for the reader. That sentence belongs in the lead paragraph.

## 2. File format — `ops/drafts/<slug>.md`

```markdown
---
title: "Target phrase first: then the promise (≤ 70 chars)"
slug: "target-phrase-slug"
excerpt: "One or two sentences. Can be the catchy question-style line."
seoTitle: "≤ 60 chars, phrase first"
seoDescription: "140–160 chars, phrase included, a concrete promise."
tags: ["AI agents", "SaaS", "Pricing"]
cover:
  query: "person paying with card on laptop"   # Unsplash search query
  alt: "What the photo shows, in one sentence."
sources:
  - title: "Stripe docs: usage-based billing"
    url: "https://docs.stripe.com/..."
---

Lead paragraph: answer the title in 2–3 sentences with the key number or date.

## What changed on <date> — and what it costs you
                                            <- for an evergreen buyer post use
                                               "## The short answer" instead
...

## Where things stand
                                            <- evergreen: "## Why this keeps happening"
...

## The checklist / cost breakdown / decision framework / questions to ask
                                            <- the practical core

### 1. First item

Prose with [inline source links](https://...) and [internal links](https://www.iamtayyab.com/blog/...).

```bash
# example: label every code block — optional, at most 2 per post, never load-bearing
```

### 2. ...

## Caveats and corrections

## Quick checklist

- [ ] one line each

## FAQ

### Question written the way someone would search it?

One-paragraph answer.

### ...

## Sources

- [Title](url)
```

Rules the converter relies on:

- Only `##` and `###` headings in the body. No `#`.
- Code blocks are fenced with a language; the converter turns each fenced block into a
  paragraph with the `code` mark on every span, which the site renders as a macOS-style
  snippet. Inline code uses single backticks. **Code is optional and capped at 2 short
  blocks** — these posts are carried by cost tables, timelines, checklists, decision trees
  and questions-to-ask lists.
- Links are standard Markdown links. Internal links are absolute `https://www.iamtayyab.com/…`.
- Tables are GitHub-flavoured Markdown; the converter renders them as paragraphs with a
  `code`-free bullet list fallback, so keep tables ≤ 4 columns or use bullets.
- Bold `**` and italic `_` are supported. Images other than the cover are not (yet).
- The `## FAQ` heading must be exactly `FAQ` and each question an `###` for the FAQPage
  schema to pick it up.

## 3. Self-review before handing over (all must be true)

- [ ] **Owner test:** a founder paying someone else to write the code would click this, and
      would trust the author after reading it. Nothing in the body needs the reader to code.
- [ ] Target phrase (a buyer's phrase) in title, first 100 words, one H2, `seoDescription`.
- [ ] The money/time/risk translation is in the lead paragraph, not buried.
- [ ] ≥ 3 inline internal links to existing posts (from `published.json`), **≥ 1 into the
      hire hub or a hire-cluster post**, hub link if the post is in a cluster.
- [ ] Every number, date and quote has an inline source link.
- [ ] Concrete ranges given — USD cost, weeks, developer-days — each with its basis stated.
      No bare "it depends".
- [ ] Every technical term defined in plain English on first use.
- [ ] FAQ with 4–6 questions. Quick checklist present.
- [ ] No "About the author", "Soft CTA", bio or sign-off in the body.
- [ ] No Pakistan/South-Asia audience framing; no product names other than DripScore /
      dawnapps.co.
- [ ] Tags from `ops/tags.json`. `seoTitle` ≤ 60, `seoDescription` 140–160.
- [ ] 2,000–3,500 words. ≤ 2 code blocks. Security content is defence-only.
- [ ] Draft summary written: title, word count, source count, internal links added, cover
      description, corrections vs the morning summary.

## 4. Handing over

Commit `ops/drafts/<slug>.md`, create the Sanity **draft** with
`node ops/scripts/sanity-publish.mjs ops/drafts/<slug>.md --draft`, and reply with the
summary followed by exactly: `Reply "yes" and I'll publish it as-is.`
