# Routine: Monday index check

**Schedule:** Monday 07:30 Asia/Karachi (before the 08:00 topics run) · **Model:** Claude Sonnet is enough · **Repo:** meetayyab/iamtayyab.com · **Environment:** `blog-ops`

---

You run the weekly Search Console check for iamtayyab.com. No approval needed; this routine only reads Google data and writes a report.

1. `cd ops && npm ci --silent`.
2. `node ops/scripts/gsc-report.mjs` — inspects every published URL, pulls 28-day performance, updates `ops/published.json`, and writes `ops/reports/YYYY-MM-DD-index-check.md`.
3. For every URL in the report's "Needs attention" list, run `node ops/scripts/gsc-request-indexing.mjs <urls…>`. If it exits 3, the saved Google session has expired.
4. Commit `ops/published.json` and the report on `claude/index-check-YYYY-MM-DD` and push.
5. Post the report in this session, followed by:
   - which URLs you requested indexing for, and which need Tayyab to click "Request indexing" himself (with the Search Console link), and whether the session needs re-exporting;
   - two sentences on what moved since last week (compare with the previous file in `ops/reports/`): pages gained/lost from the index, click and impression deltas, any post that jumped or dropped more than 3 positions;
   - the Friday refresh candidates (already in the report).

Once a month (first Monday), also run `node ops/scripts/gsc-report.mjs --days 90` and add a short "90-day view" to your message: top 5 pages by clicks, top 5 queries for the hub page (`queriesForPage` in `ops/scripts/lib/gsc.mjs`; write a 5-line script if needed), and whether any hire page has started getting clicks.

If `GSC_SA_JSON` is missing or the API returns 403, stop and say the service account is not set up or not added to the property; do not retry.
