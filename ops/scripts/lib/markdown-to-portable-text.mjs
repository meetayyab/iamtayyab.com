// Markdown (the house format in .claude/skills/blog-post) -> Sanity Portable Text.
// Mirrors how src/app/blog/[slug]/page.tsx renders: h2/h3 blocks, normal paragraphs,
// bullet/number lists, blockquotes, link/strong/em/code marks, and "whole paragraph is
// code" for fenced blocks (the site turns those into the macOS-style snippet).

import { marked } from 'marked';
import { randomBytes } from 'node:crypto';

const key = () => randomBytes(6).toString('hex');

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks };
}

function block(style, children, markDefs = [], extra = {}) {
  return { _type: 'block', _key: key(), style, children, markDefs, ...extra };
}

/** Flatten marked inline tokens into spans + markDefs. */
function inline(tokens, ctx, activeMarks = []) {
  const spans = [];
  for (const t of tokens ?? []) {
    switch (t.type) {
      case 'text':
      case 'escape':
        if (t.tokens && t.tokens.length) spans.push(...inline(t.tokens, ctx, activeMarks));
        else spans.push(span(decode(t.text), activeMarks));
        break;
      case 'strong':
        spans.push(...inline(t.tokens, ctx, [...activeMarks, 'strong']));
        break;
      case 'em':
        spans.push(...inline(t.tokens, ctx, [...activeMarks, 'em']));
        break;
      case 'codespan':
        spans.push(span(decode(t.text), [...activeMarks, 'code']));
        break;
      case 'link': {
        const k = key();
        ctx.markDefs.push({ _type: 'link', _key: k, href: t.href });
        spans.push(...inline(t.tokens, ctx, [...activeMarks, k]));
        break;
      }
      case 'br':
        spans.push(span('\n', activeMarks));
        break;
      case 'del':
        spans.push(...inline(t.tokens, ctx, activeMarks));
        break;
      case 'image':
        spans.push(span(t.text || '', activeMarks));
        break;
      default:
        if (t.tokens) spans.push(...inline(t.tokens, ctx, activeMarks));
        else if (t.raw) spans.push(span(decode(t.raw), activeMarks));
    }
  }
  return spans;
}

function decode(s) {
  return String(s ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function paragraph(tokens, style = 'normal', extra = {}) {
  const ctx = { markDefs: [] };
  const children = inline(tokens, ctx);
  if (children.length === 0) children.push(span(''));
  return block(style, children, ctx.markDefs, extra);
}

function listBlocks(list, level = 1) {
  const out = [];
  const listItem = list.ordered ? 'number' : 'bullet';
  for (const item of list.items) {
    const inlineTokens = [];
    const nested = [];
    for (const t of item.tokens ?? []) {
      if (t.type === 'list') nested.push(t);
      else if (t.type === 'text' || t.type === 'paragraph') inlineTokens.push(...(t.tokens ?? [{ type: 'text', text: t.text }]));
      else inlineTokens.push(t);
    }
    if (item.task) inlineTokens.unshift({ type: 'text', text: item.checked ? '[x] ' : '[ ] ' });
    out.push(paragraph(inlineTokens, 'normal', { listItem, level }));
    for (const n of nested) out.push(...listBlocks(n, level + 1));
  }
  return out;
}

function tableToBlocks(tok) {
  // Rendered as a header line + one bullet per row ("Col: value · Col: value").
  const headers = tok.header.map((h) => h.text);
  const out = [];
  out.push(paragraph([{ type: 'strong', tokens: [{ type: 'text', text: headers.join(' · ') }] }]));
  for (const row of tok.rows) {
    const text = row.map((cell, i) => `${headers[i]}: ${cell.text}`).join(' · ');
    out.push(paragraph(marked.lexer(text)[0]?.tokens ?? [{ type: 'text', text }], 'normal', { listItem: 'bullet', level: 1 }));
  }
  return out;
}

export function markdownToPortableText(markdown) {
  const tokens = marked.lexer(markdown, { gfm: true });
  const blocks = [];
  for (const tok of tokens) {
    switch (tok.type) {
      case 'heading': {
        // Body never carries an H1; demote anything deeper than h4 to h4.
        const depth = Math.min(Math.max(tok.depth, 2), 4);
        blocks.push(paragraph(tok.tokens, `h${depth}`));
        break;
      }
      case 'paragraph':
        blocks.push(paragraph(tok.tokens));
        break;
      case 'code':
        // Whole paragraph marked as code == site's code snippet renderer.
        blocks.push(block('normal', [span(tok.text, ['code'])]));
        break;
      case 'blockquote': {
        const inner = tok.tokens.flatMap((t) => (t.type === 'paragraph' ? t.tokens : [t]));
        blocks.push(paragraph(inner, 'blockquote'));
        break;
      }
      case 'list':
        blocks.push(...listBlocks(tok));
        break;
      case 'table':
        blocks.push(...tableToBlocks(tok));
        break;
      case 'hr':
      case 'space':
        break;
      case 'html':
        blocks.push(paragraph([{ type: 'text', text: tok.text }]));
        break;
      default:
        if (tok.tokens) blocks.push(paragraph(tok.tokens));
    }
  }
  return blocks;
}

export function wordCount(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .split(/\s+/)
    .filter(Boolean).length;
}
