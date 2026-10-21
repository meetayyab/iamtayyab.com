# Setting up the blog routines

Three cloud routines at https://claude.ai/code/routines replace Grok Bot. They run on
Anthropic's cloud with this repo cloned, so nothing needs your Mac on. Approvals happen by
replying inside each run's session (open it from the notification on your phone).

## 0. Before anything

- [ ] Revoke the GitHub PAT that was pasted into the Grok Bot chat on Sep 3, 2026
      (github.com → Settings → Developer settings → Personal access tokens).
- [ ] Merge PR #19 (template) so the routines' verify step finds the TOC and related posts.
- [ ] Merge the `claude/blog-ops` branch (this folder).

## 1. Credentials (you create these once)

| Credential | Where to get it | Env var in the cloud environment |
| --- | --- | --- |
| Sanity editor token | manage.sanity.io → project `2f8mtiiu` → API → Tokens → **Editor** | `SANITY_TOKEN` |
| Unsplash access key | unsplash.com/developers → New application (demo tier, 50 req/h is plenty) | `UNSPLASH_ACCESS_KEY` |
| Search Console service account | console.cloud.google.com → new project → enable **Google Search Console API** → IAM → Service account → key (JSON). Then search.google.com/search-console → Settings → Users and permissions → add the service-account email as **Full** user on `sc-domain:iamtayyab.com` | `GSC_SA_JSON` (paste the JSON) |
| IndexNow key | Any 32-char hex string (e.g. `openssl rand -hex 16`). Also commit `public/<key>.txt` containing the key | `INDEXNOW_KEY` |
| Search Console browser session (optional, for the Request-indexing click) | See §4 | `GSC_STORAGE_STATE` (paste the JSON) |

Store all of these as **API credentials** on the environment (not plain environment
variables), so they are not visible to anyone else who uses the environment.

Revoke the Sanity editor token Grok Bot minted once the Claude routines are live.

## 2. Cloud environment `blog-ops`

claude.ai/code/routines → environment selector → create:

- **Network access:** Custom. Allowed domains (plus the default package-manager list):
  `*.api.sanity.io`, `api.sanity.io`, `cdn.sanity.io`, `*.apicdn.sanity.io`,
  `www.iamtayyab.com`, `iamtayyab.com`, `api.unsplash.com`, `images.unsplash.com`,
  `searchconsole.googleapis.com`, `www.googleapis.com`, `oauth2.googleapis.com`,
  `api.indexnow.org`, `search.google.com`, `accounts.google.com`, `ssl.gstatic.com`,
  `www.gstatic.com`, `fonts.googleapis.com`, `fonts.gstatic.com`.
  Web search for topic research goes through Claude's own tool and needs no allowlist entry.
- **Setup script:** `cd ops && npm ci && npx playwright install chromium`
- **Variables:** `SANITY_PROJECT_ID=2f8mtiiu`, `SANITY_DATASET=production`,
  `GSC_PROPERTY=sc-domain:iamtayyab.com`.

## 3. The routines

| Routine | Trigger | Prompt file | Model |
| --- | --- | --- | --- |
| Daily blog post | Schedule: Mon–Thu 08:00 Asia/Karachi | `ops/routines/daily-post.md` | Opus |
| Friday refresh | Schedule: Fri 08:00 Asia/Karachi | `ops/routines/friday-refresh.md` | Opus |
| Monday index check | Schedule: Mon 07:30 Asia/Karachi | `ops/routines/monday-index-check.md` | Sonnet |

For each: New routine → name → paste the prompt (everything below the `---` line in the
file) → repository `meetayyab/iamtayyab.com` → environment `blog-ops` → trigger → remove
every connector except any you deliberately want (none are needed) → Create.

Use **Run now** on each once before trusting the schedule:
- Index check first (it only reads). Confirm the report and that `ops/published.json` gets
  coverage states.
- Daily post with a test topic; stop after Step 2 and inspect the Sanity draft in Studio
  before saying yes. The first real post should be compared side by side with a Grok Bot
  post.
- Friday refresh on one post.

Then pause the two Grok Bot routines.

## 4. Optional: automating the "Request indexing" click

Google has no API for that button. The script replays a logged-in browser session:

1. On your Mac, with Playwright installed somewhere (`npx playwright codegen` works):
   `npx playwright codegen --save-storage=gsc-state.json https://search.google.com/search-console`
   Log in to the Google account that owns the property, open the property once, close the
   window. `gsc-state.json` now holds the cookies.
2. Paste the file's contents into the `GSC_STORAGE_STATE` credential.
3. Expect it to last a few weeks. When a run reports exit code 3 (session expired), repeat
   step 1. Until then you click the leftovers yourself; the Monday message lists them.

Never switch this to the Indexing API for blog URLs; Google treats that as abuse.

## 5. Approving from your phone

Each run is a session. The Claude app notifies you when a run stops at a gate; open it and
type `4`, `yes`, `go`, or a tweak. The session resumes with full tools. If you don't reply
the same day, the next morning's run starts fresh (yesterday's shortlist stays in
`ops/shortlists/` and is excluded automatically).

## 6. What each run commits

Ops files only: `ops/shortlists/*.md`, `ops/drafts/*.md`, `ops/published.json`,
`ops/reports/*.md`, on `claude/…` branches. Merge them in batches whenever; nothing on the
live site depends on these being merged.
