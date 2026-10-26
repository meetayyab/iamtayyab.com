#!/usr/bin/env node
// Weekly index + performance report. Inspects every URL in ops/published.json (plus the
// hub and static pages), pulls 28-day Search Analytics, updates published.json, and
// prints a Markdown report in the format the owner is used to.
//
//   node ops/scripts/gsc-report.mjs [--days 28] [--only hire] [--no-write]
//
// Env: GSC_SA_JSON. Exit code 0; the report lists "needs attention" URLs.

import { readFile, writeFile } from 'node:fs/promises';
import { inspect, analyticsByPage } from './lib/gsc.mjs';

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const days = Number(opt('days', 28));
const only = opt('only');
const write = !args.includes('--no-write');

const published = JSON.parse(await readFile('ops/published.json', 'utf8'));
const hire = JSON.parse(await readFile('ops/hire-pages.json', 'utf8'));

const SITE = 'https://www.iamtayyab.com';
const staticUrls = [`${SITE}`, `${SITE}/blog`, hire.hub];
let targets = [...staticUrls, ...published.posts.map((p) => p.url)];
if (only === 'hire') targets = hire.pages.map((p) => p.url);
targets = [...new Set(targets)];

const today = new Date().toISOString().slice(0, 10);
const results = [];
for (const url of targets) {
  try {
    results.push(await inspect(url));
  } catch (e) {
    results.push({ url, error: String(e.message || e) });
  }
  await new Promise((r) => setTimeout(r, 300));
}

const analytics = await analyticsByPage({ days }).catch((e) => ({ rows: [], total: {}, error: String(e.message || e) }));
const perf = new Map(analytics.rows.map((r) => [r.url, r]));

// Update published.json
if (write) {
  for (const p of published.posts) {
    const r = results.find((x) => x.url === p.url);
    if (r && !r.error) {
      p.indexed = r.indexed;
      p.coverageState = r.coverageState;
      p.lastInspected = today;
    }
    const a = perf.get(p.url);
    if (a) p.performance = { days, clicks: a.clicks, impressions: a.impressions, position: Math.round(a.position * 10) / 10 };
  }
  published.updatedAt = today;
  await writeFile('ops/published.json', JSON.stringify(published, null, 2) + '\n');
}

// Report
const hireUrls = new Set(hire.pages.map((p) => p.url));
const byState = (list) => {
  const indexed = list.filter((r) => r.indexed);
  const notIndexed = list.filter((r) => !r.indexed && !r.error);
  const errors = list.filter((r) => r.error);
  return { indexed, notIndexed, errors };
};
const hireResults = results.filter((r) => hireUrls.has(r.url));
const all = byState(results);
const h = byState(hireResults);

const short = (u) => u.replace(SITE, '') || '/';
const line = (r) => `- ${short(r.url)} — ${r.coverageState || r.verdict || 'unknown'}${r.lastCrawl ? ` (last crawl ${r.lastCrawl.slice(0, 10)})` : ''}`;

const fmtPerf = (url) => {
  const a = perf.get(url);
  return a ? `${a.impressions} impr · ${a.clicks} clicks · pos ${a.position.toFixed(1)}` : 'no data';
};

const stale = results.filter(
  (r) => !r.indexed && !r.error && /crawled|discovered|unknown/i.test(r.coverageState || '')
);

// Refresh candidates: high impressions, weak position
const refreshCandidates = analytics.rows
  .filter((r) => r.url.includes('/blog/') && r.position > 8 && r.impressions >= 30)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 5);

const md = [];
md.push(`## Index check — ${today}`);
md.push('');
md.push(`**Hire cluster:** ${h.indexed.length} of ${hireResults.length} pages indexed.`);
if (h.notIndexed.length) md.push(...h.notIndexed.map(line));
md.push('');
md.push(`**All pages:** ${all.indexed.length} of ${results.length} indexed.`);
if (all.notIndexed.length) {
  md.push('Not indexed:');
  md.push(...all.notIndexed.map(line));
}
if (all.errors.length) md.push(`Inspection errors: ${all.errors.map((r) => short(r.url)).join(', ')}`);
md.push('');
md.push(`**Last ${days} days (${analytics.startDate ?? '?'} → ${analytics.endDate ?? '?'}):** ${analytics.total.clicks ?? '?'} clicks from ${analytics.total.impressions ?? '?'} impressions, avg position ${analytics.total.avgPosition ? analytics.total.avgPosition.toFixed(1) : '?'}.`);
md.push('');
md.push('Hire pages:');
for (const p of hire.pages) md.push(`- ${short(p.url)} — ${fmtPerf(p.url)}`);
md.push('');
md.push('Top posts by impressions:');
for (const r of analytics.rows.filter((r) => r.url.includes('/blog/')).sort((a, b) => b.impressions - a.impressions).slice(0, 8)) {
  md.push(`- ${short(r.url)} — ${r.impressions} impr · ${r.clicks} clicks · pos ${r.position.toFixed(1)}`);
}
md.push('');
md.push(`**Needs attention (${stale.length}):** request indexing / add internal links`);
md.push(...stale.map((r) => `- ${r.url}`));
md.push('');
md.push(`**Friday refresh candidates (high impressions, position > 8):**`);
md.push(...(refreshCandidates.length ? refreshCandidates.map((r) => `- ${short(r.url)} — ${r.impressions} impr · pos ${r.position.toFixed(1)}`) : ['- none this week']));

console.log(md.join('\n'));
await writeFile(`ops/reports/${today}-index-check.md`, md.join('\n') + '\n').catch(async () => {
  const { mkdir } = await import('node:fs/promises');
  await mkdir('ops/reports', { recursive: true });
  await writeFile(`ops/reports/${today}-index-check.md`, md.join('\n') + '\n');
});
