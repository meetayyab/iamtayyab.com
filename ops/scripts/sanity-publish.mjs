#!/usr/bin/env node
// Create or update a post in Sanity from a house-format Markdown file.
//
//   node ops/scripts/sanity-publish.mjs ops/drafts/<slug>.md --draft     # create/replace drafts.<id>, unpublished
//   node ops/scripts/sanity-publish.mjs ops/drafts/<slug>.md --publish   # publish (sets publishedAt if missing)
//   node ops/scripts/sanity-publish.mjs ops/drafts/<slug>.md --publish --cover /tmp/cover.jpg
//
// Env: SANITY_TOKEN (editor), optional SANITY_PROJECT_ID / SANITY_DATASET.
// Prints a JSON summary on stdout; everything else goes to stderr.

import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import YAML from 'yaml';
import { markdownToPortableText, wordCount } from './lib/markdown-to-portable-text.mjs';
import { sanityClient, uploadImage, SITE_URL } from './lib/sanity.mjs';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

if (!file) {
  console.error('usage: sanity-publish.mjs <draft.md> --draft|--publish [--cover <file>] [--alt "<alt text>"]');
  process.exit(2);
}

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('draft is missing YAML frontmatter');
  return { meta: YAML.parse(m[1]) ?? {}, body: m[2] };
}

function validate(meta, body) {
  const problems = [];
  if (!meta.title) problems.push('title missing');
  if (!meta.slug || !/^[a-z0-9-]+$/.test(meta.slug)) problems.push('slug missing or not kebab-case');
  if (!meta.seoDescription) problems.push('seoDescription missing');
  else if (meta.seoDescription.length < 120 || meta.seoDescription.length > 170) problems.push(`seoDescription is ${meta.seoDescription.length} chars (want 140–160)`);
  if (meta.seoTitle && meta.seoTitle.length > 65) problems.push(`seoTitle is ${meta.seoTitle.length} chars (want ≤ 60)`);
  if (!Array.isArray(meta.tags) || meta.tags.length < 2) problems.push('need at least 2 tags');
  if (/^#\s/m.test(body)) problems.push('body contains an H1 (# ...) — only ## and ### allowed');
  if (!/^## FAQ\s*$/m.test(body)) problems.push('no "## FAQ" section');
  if (/^##\s+(about the author|soft cta|written by)/im.test(body)) problems.push('body contains an author/CTA section — the template renders those');
  const internal = (body.match(/\]\(https:\/\/(www\.)?iamtayyab\.com\/blog\/[^)]+\)/g) || []).length;
  if (internal < 3) problems.push(`only ${internal} inline internal links to /blog/ posts (want ≥ 3)`);
  const words = wordCount(body);
  if (words < 1500) problems.push(`only ${words} words`);
  return { problems, words, internalLinks: internal };
}

const src = await readFile(file, 'utf8');
const { meta, body } = parseFrontmatter(src);
const { problems, words, internalLinks } = validate(meta, body);
if (problems.length && !flag('force')) {
  console.error('Draft failed validation:\n - ' + problems.join('\n - ') + '\n(use --force to publish anyway)');
  process.exit(1);
}

const client = sanityClient({ write: true });
const docId = `post-${meta.slug}`;
const publish = flag('publish');
const targetId = publish ? docId : `drafts.${docId}`;

// Keep an existing publishedAt / cover when re-publishing (refresh flow).
const existing = await client.fetch(`*[_id in [$id, $draftId]] | order(_id asc)[0]{publishedAt, coverImage}`, {
  id: docId,
  draftId: `drafts.${docId}`,
});

let coverImage = existing?.coverImage;
const coverPath = opt('cover');
if (coverPath) {
  const buf = await readFile(coverPath);
  const asset = await uploadImage(buf, {
    filename: `${meta.slug}-cover.jpg`,
    contentType: coverPath.endsWith('.png') ? 'image/png' : 'image/jpeg',
  });
  coverImage = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: opt('alt') || meta.cover?.alt || meta.title,
  };
  console.error(`cover uploaded: ${asset._id}`);
}

const doc = {
  _id: targetId,
  _type: 'post',
  title: meta.title,
  slug: { _type: 'slug', current: meta.slug },
  excerpt: meta.excerpt ?? '',
  seoTitle: meta.seoTitle ?? meta.title,
  seoDescription: meta.seoDescription,
  tags: meta.tags,
  body: markdownToPortableText(body),
  ...(coverImage ? { coverImage } : {}),
  ...(publish ? { publishedAt: existing?.publishedAt || meta.publishedAt || new Date().toISOString() } : {}),
};

await client.createOrReplace(doc);
if (publish) {
  // Remove a lingering draft so Studio does not show "unpublished changes".
  await client.delete(`drafts.${docId}`).catch(() => {});
}

console.log(
  JSON.stringify(
    {
      id: targetId,
      published: publish,
      url: `${SITE_URL}/blog/${meta.slug}`,
      studio: `${SITE_URL}/studio/structure/post;${docId}`,
      words,
      internalLinks,
      tags: meta.tags,
      cover: Boolean(coverImage),
      warnings: problems,
    },
    null,
    2
  )
);
