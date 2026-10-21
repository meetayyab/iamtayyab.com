#!/usr/bin/env node
// Append or update a post in ops/published.json after publishing or refreshing.
//
//   node ops/scripts/record-published.mjs ops/drafts/<slug>.md [--refreshed]

import { readFile, writeFile } from 'node:fs/promises';
import YAML from 'yaml';

const file = process.argv[2];
const refreshed = process.argv.includes('--refreshed');
if (!file) {
  console.error('usage: record-published.mjs <draft.md> [--refreshed]');
  process.exit(2);
}
const src = await readFile(file, 'utf8');
const meta = YAML.parse(src.match(/^---\n([\s\S]*?)\n---/)[1]);
const db = JSON.parse(await readFile('ops/published.json', 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const url = `https://www.iamtayyab.com/blog/${meta.slug}`;
let entry = db.posts.find((p) => p.slug === meta.slug);
if (!entry) {
  entry = { slug: meta.slug, url, publishedAt: today, cluster: 'general', indexed: null, lastInspected: null, lastRefreshed: null };
  db.posts.unshift(entry);
}
entry.title = meta.title;
entry.tags = meta.tags;
entry.targetPhrase = meta.targetPhrase ?? entry.targetPhrase;
if (refreshed) entry.lastRefreshed = today;
db.updatedAt = today;
await writeFile('ops/published.json', JSON.stringify(db, null, 2) + '\n');
console.log(JSON.stringify(entry, null, 2));
