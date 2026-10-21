#!/usr/bin/env node
// Best-effort "Request indexing" click in Search Console using a saved browser session.
// Google has no API for this button. This replays a Playwright storageState the owner
// exported from a real logged-in browser (see ops/routines/SETUP.md). When the session
// has expired it exits 3 and prints the URLs so the owner can click them by hand.
//
//   node ops/scripts/gsc-request-indexing.mjs <url> [<url> ...]
//
// Env: GSC_STORAGE_STATE (path to the storageState JSON, or its contents).

import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const urls = process.argv.slice(2).filter((a) => a.startsWith('http'));
if (!urls.length) {
  console.error('usage: gsc-request-indexing.mjs <url> [...]');
  process.exit(2);
}
const raw = process.env.GSC_STORAGE_STATE;
if (!raw) {
  console.error('GSC_STORAGE_STATE not set — cannot request indexing automatically.');
  console.log(JSON.stringify({ requested: [], manual: urls, reason: 'no session' }));
  process.exit(3);
}
const statePath = raw.trim().startsWith('{') ? '/tmp/gsc-state.json' : raw;
if (statePath === '/tmp/gsc-state.json') await writeFile(statePath, raw);

const PROPERTY = process.env.GSC_PROPERTY || 'sc-domain:iamtayyab.com';
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: statePath, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const requested = [];
const manual = [];
let sessionDead = false;

for (const url of urls) {
  const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(PROPERTY)}&id=${encodeURIComponent(url)}`;
  try {
    await page.goto(inspectUrl, { waitUntil: 'networkidle', timeout: 60_000 });
    if (/accounts\.google\.com/.test(page.url())) {
      sessionDead = true;
      manual.push(url);
      break;
    }
    // Wait for the inspection to finish, then look for the button.
    const button = page.getByRole('button', { name: /request indexing/i });
    await button.first().waitFor({ timeout: 90_000 });
    await button.first().click();
    // Either "Indexing requested" or a quota dialog.
    const ok = page.getByText(/indexing requested/i);
    const quota = page.getByText(/quota exceeded|too many requests/i);
    const result = await Promise.race([
      ok.first().waitFor({ timeout: 60_000 }).then(() => 'ok'),
      quota.first().waitFor({ timeout: 60_000 }).then(() => 'quota'),
    ]).catch(() => 'unknown');
    if (result === 'ok') requested.push(url);
    else manual.push(url);
    if (result === 'quota') break;
    await page.waitForTimeout(3000);
  } catch (e) {
    console.error(`${url}: ${e.message}`);
    manual.push(url);
  }
}
await browser.close();

console.log(JSON.stringify({ requested, manual, reason: sessionDead ? 'session expired — re-export GSC_STORAGE_STATE' : undefined }, null, 2));
process.exit(sessionDead ? 3 : 0);
