#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, DuckDuckGo, Naver, Seznam share the index) for changed URLs.
// Google does not use IndexNow; this is for everything else.
//
//   node ops/scripts/indexnow.mjs <url> [...]
//
// Env: INDEXNOW_KEY. The key file must be served at https://www.iamtayyab.com/<key>.txt
// (ops/routines/SETUP.md explains how; it is a one-line static file in public/).

const urls = process.argv.slice(2).filter((a) => a.startsWith('http'));
const key = process.env.INDEXNOW_KEY;
if (!urls.length || !key) {
  console.error('usage: indexnow.mjs <url> [...]  (needs INDEXNOW_KEY)');
  process.exit(2);
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'www.iamtayyab.com',
    key,
    keyLocation: `https://www.iamtayyab.com/${key}.txt`,
    urlList: urls,
  }),
});
console.log(JSON.stringify({ status: res.status, ok: res.status === 200 || res.status === 202, urls }));
