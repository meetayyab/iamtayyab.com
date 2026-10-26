# Routine: Friday refresh and interlink

**Schedule:** Friday 08:00 Asia/Karachi · **Model:** Claude Opus · **Repo:** meetayyab/iamtayyab.com · **Environment:** `blog-ops`

---

You maintain iamtayyab.com, Muhammad Tayyab's blog. Fridays are for making existing posts rank and convert better, not for new posts. Tayyab approves in this session before anything goes live.

Read `ops/editorial-rules.md`, `.claude/skills/blog-post/SKILL.md`, `ops/published.json`, `ops/tags.json`, and the newest file in `ops/reports/`. Then `cd ops && npm ci --silent`.

## Step 1 — Pick this week's work (then stop and wait)

From the Monday report, pick:

- **2–3 refresh candidates**: posts with the most impressions but average position worse than 8 (the report lists them). If there is no report, use `node ops/scripts/gsc-report.mjs --no-write` to generate one now.
- **Up to 3 link targets**: posts that are "crawled – currently not indexed" or "unknown to Google" for two weeks or more.

For each candidate, fetch the live page and read its body from Sanity (`*[_id == "post-<slug>"]`). Note dated facts that have changed, missing inline links, template-era leftovers ("About the author", "Soft CTA", "Written by" sections, bio paragraphs), tags not in `ops/tags.json`, and whether the target phrase is in the title, first 100 words, an H2 and the meta description.

Post a plan in this session: one line per post saying what you will change, which posts will gain inline links to the unindexed targets, and the tag normalisations. End with: `Reply "go" to apply, or tell me what to skip.`

Stop and wait.

## Step 2 — Apply (after "go")

For each post: export the current body to `ops/drafts/<slug>.md` in the house format (write a small helper if needed; the converter in `ops/scripts/lib/markdown-to-portable-text.mjs` shows the mapping), make the edits in Markdown, keep the original `publishedAt`, then `node ops/scripts/sanity-publish.mjs ops/drafts/<slug>.md --publish`. Add inline links to the unindexed targets from the 2–3 most relevant indexed posts (edit those bodies the same way; a one-sentence contextual link each, never a bare URL list). Normalise tags using `ops/tags.json` aliases.

Then for every changed URL: `node ops/scripts/verify-live.mjs <slug>`, `node ops/scripts/indexnow.mjs <urls…>`, and `node ops/scripts/gsc-request-indexing.mjs <unindexed target urls…>` (exit 3 = session expired; report it and list the URLs for manual clicking). `node ops/scripts/record-published.mjs ops/drafts/<slug>.md --refreshed` for each refreshed post. Commit on `claude/refresh-YYYY-MM-DD` and push.

Final message: what changed per post (one line each), screenshots of any post whose layout changed, and the list of URLs that got new inbound links.

## Rules

- Never change a post's slug or `publishedAt`.
- Never remove sources; update them.
- Keep the edits surgical: refreshed facts, links, tags, structure. Do not rewrite voice.
- If the Monday report is missing and GSC credentials fail, say so and stop; do not guess which posts to refresh.
