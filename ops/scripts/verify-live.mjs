#!/usr/bin/env node
// Post-publish verification: wait for the page, check it is in the sitemap, screenshot
// light and dark, sanity-check the rendered structure.
//
//   node ops/scripts/verify-live.mjs <slug> [--out ops/screenshots] [--timeout 180]
//
// Prints JSON {url, status, inSitemap, h1Count, hasToc, relatedCount, screenshots:{light,dark}, problems:[]}.

import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const SITE_URL = 'https://www.iamtayyab.com';
const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith('--'));
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const outDir = opt('out', 'ops/screenshots');
const timeoutS = Number(opt('timeout', 180));
if (!slug) {
  console.error('usage: verify-live.mjs <slug>');
  process.exit(2);
}
const url = slug.startsWith('http') ? slug : `${SITE_URL}/blog/${slug}`;
const problems = [];

// 1. Wait for ISR to serve the page (revalidate = 60s on the site).
const started = Date.now();
let status = 0;
while (Date.now() - started < timeoutS * 1000) {
  const res = await fetch(url, { headers: { 'cache-control': 'no-cache' } });
  status = res.status;
  if (res.ok) break;
  await new Promise((r) => setTimeout(r, 10_000));
}
if (status !== 200) problems.push(`page returned ${status} after ${timeoutS}s`);

// 2. Sitemap.
const sitemap = await fetch(`${SITE_URL}/sitemap.xml`, { headers: { 'cache-control': 'no-cache' } }).then((r) => r.text()).catch(() => '');
const inSitemap = sitemap.includes(`<loc>${url}</loc>`);
if (!inSitemap) problems.push('URL not in sitemap.xml yet');

// 3. Render in both themes.
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const shots = {};
let h1Count = 0;
let hasToc = false;
let relatedCount = 0;
let title = '';
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  // next-themes stores the choice in localStorage; force it so the screenshot matches.
  await page.evaluate((s) => {
    try { localStorage.setItem('theme', s); } catch {}
    document.documentElement.classList.toggle('dark', s === 'dark');
  }, scheme);
  await page.waitForTimeout(500);
  if (scheme === 'light') {
    title = await page.title();
    h1Count = await page.locator('h1').count();
    hasToc = (await page.locator('nav[aria-label="Table of contents"]').count()) > 0;
    relatedCount = await page.locator('section[aria-labelledby="related-heading"] article').count();
  }
  const file = `${outDir}/${slug.replace(/[^a-z0-9-]/gi, '_')}-${scheme}.png`;
  await page.screenshot({ path: file, fullPage: true });
  shots[scheme] = file;
  await ctx.close();
}
await browser.close();

if (h1Count !== 1) problems.push(`page has ${h1Count} <h1> elements`);
if (!title) problems.push('empty <title>');

console.log(JSON.stringify({ url, status, title, inSitemap, h1Count, hasToc, relatedCount, screenshots: shots, problems }, null, 2));
process.exit(problems.some((p) => p.startsWith('page returned')) ? 1 : 0);
