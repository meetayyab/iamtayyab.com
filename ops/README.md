# Blog ops

Everything the Claude routines need to run the iamtayyab.com blog without a machine on.

| Path | What |
| --- | --- |
| `editorial-rules.md` | Standing rules for every post (audience, structure, links, tags, covers, publishing). The source of truth. |
| `routines/` | The prompts to paste into claude.ai/code/routines, and `SETUP.md` for credentials and environment. |
| `../.claude/skills/blog-post/` | The house Markdown format and the self-review checklist the writer follows. |
| `published.json` | Every published post: slug, title, tags, cluster, index status, 28-day performance, last refresh. Updated by the scripts. |
| `hire-pages.json` | The hub + 9 cluster pages the Monday check watches. |
| `tags.json` | Canonical tags and aliases (the live tags are inconsistent; Friday runs normalise them). |
| `shortlists/`, `drafts/`, `reports/` | Run artifacts, committed on `claude/…` branches. |
| `scripts/` | `sanity-publish.mjs` (Markdown → Portable Text → draft/publish, with validation), `unsplash-cover.mjs`, `verify-live.mjs` (ISR wait, sitemap, light/dark screenshots, structure checks), `gsc-report.mjs` (URL Inspection + Search Analytics → report), `gsc-request-indexing.mjs` (best-effort button click via saved session), `indexnow.mjs`, `record-published.mjs`. |

Run anything locally with `cd ops && npm ci` and the env vars from `routines/SETUP.md`.
