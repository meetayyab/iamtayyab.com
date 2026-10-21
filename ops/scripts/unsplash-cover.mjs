#!/usr/bin/env node
// Find a free Unsplash cover, download it (and call the download-trigger endpoint,
// which the Unsplash API terms require), and print attribution.
//
//   node ops/scripts/unsplash-cover.mjs "person paying with card on laptop" --out /tmp/cover.jpg
//
// Env: UNSPLASH_ACCESS_KEY. Prints JSON {file, alt, credit, photographer, url}.

import { writeFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const query = args.find((a) => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const out = outIdx >= 0 ? args[outIdx + 1] : '/tmp/cover.jpg';
const pick = Number(args[args.indexOf('--pick') + 1]) || 0;
const key = process.env.UNSPLASH_ACCESS_KEY;
if (!query || !key) {
  console.error('usage: unsplash-cover.mjs "<query>" --out <file> [--pick N]   (needs UNSPLASH_ACCESS_KEY)');
  process.exit(2);
}

const headers = { Authorization: `Client-ID ${key}`, 'Accept-Version': 'v1' };
const search = await fetch(
  `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&per_page=10`,
  { headers }
);
if (!search.ok) throw new Error(`Unsplash search failed: ${search.status} ${await search.text()}`);
const { results } = await search.json();
if (!results?.length) {
  console.error('no results');
  process.exit(1);
}

// Skip photos that are mostly text or faces when the description says so.
const candidates = results.filter((p) => !/text|sign|poster|portrait|selfie/i.test(p.alt_description || ''));
const photo = (candidates.length ? candidates : results)[Math.min(pick, results.length - 1)];

// Required by Unsplash API guidelines: trigger the download endpoint.
await fetch(photo.links.download_location, { headers }).catch(() => {});

const img = await fetch(`${photo.urls.raw}&w=1600&h=900&fit=crop&q=80&fm=jpg`);
if (!img.ok) throw new Error(`download failed: ${img.status}`);
await writeFile(out, Buffer.from(await img.arrayBuffer()));

const photographer = photo.user?.name;
const credit = `Photo by ${photographer} on Unsplash`;
console.log(
  JSON.stringify(
    {
      file: out,
      id: photo.id,
      description: photo.alt_description || photo.description || '',
      alt: `${(photo.alt_description || query).replace(/\.$/, '')}. ${credit}.`,
      credit,
      photographer,
      photographerUrl: `${photo.user?.links?.html}?utm_source=iamtayyab&utm_medium=referral`,
      url: `${photo.links?.html}?utm_source=iamtayyab&utm_medium=referral`,
      license: 'Unsplash License (free to use, attribution appreciated)',
    },
    null,
    2
  )
);
