// Google Search Console via a service account (env GSC_SA_JSON = the key file contents
// or a path to it). The service account must be added as a user on the property.

import { readFile } from 'node:fs/promises';
import { JWT } from 'google-auth-library';

export const PROPERTY = process.env.GSC_PROPERTY || 'sc-domain:iamtayyab.com';

async function credentials() {
  const raw = process.env.GSC_SA_JSON;
  if (!raw) throw new Error('GSC_SA_JSON is required (service account key JSON or a path to it)');
  const text = raw.trim().startsWith('{') ? raw : await readFile(raw, 'utf8');
  return JSON.parse(text);
}

let clientPromise;
export function gscClient() {
  clientPromise ??= credentials().then(
    (c) =>
      new JWT({
        email: c.client_email,
        key: c.private_key,
        scopes: ['https://www.googleapis.com/auth/webmasters'],
      })
  );
  return clientPromise;
}

async function call(url, body) {
  const client = await gscClient();
  const res = await client.request({ url, method: 'POST', data: body });
  return res.data;
}

/** URL Inspection: coverage state for one URL (2,000/day quota). */
export async function inspect(url) {
  const data = await call('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    inspectionUrl: url,
    siteUrl: PROPERTY,
  });
  const r = data.inspectionResult?.indexStatusResult ?? {};
  return {
    url,
    verdict: r.verdict, // PASS | NEUTRAL | FAIL | VERDICT_UNSPECIFIED
    coverageState: r.coverageState, // e.g. "Submitted and indexed", "Crawled - currently not indexed", "URL is unknown to Google"
    indexed: r.verdict === 'PASS',
    lastCrawl: r.lastCrawlTime,
    robots: r.robotsTxtState,
    canonicalGoogle: r.googleCanonical,
    inspectionLink: data.inspectionResult?.inspectionResultLink,
  };
}

/** Search Analytics for the last `days` days, grouped by page. */
export async function analyticsByPage({ days = 28, rowLimit = 500 } = {}) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2); // GSC data lags ~2 days
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const data = await call(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`,
    { startDate: fmt(start), endDate: fmt(end), dimensions: ['page'], rowLimit }
  );
  const rows = (data.rows ?? []).map((r) => ({
    url: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
  const total = rows.reduce(
    (a, r) => ({ clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }),
    { clicks: 0, impressions: 0 }
  );
  const avgPosition = rows.length
    ? rows.reduce((a, r) => a + r.position * r.impressions, 0) / Math.max(1, total.impressions)
    : null;
  return { startDate: fmt(start), endDate: fmt(end), rows, total: { ...total, avgPosition } };
}

/** Top queries for one page (what it ranks for). */
export async function queriesForPage(url, { days = 28, rowLimit = 20 } = {}) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const data = await call(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`,
    {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['query'],
      dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: url }] }],
      rowLimit,
    }
  );
  return (data.rows ?? []).map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position }));
}
