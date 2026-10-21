export const POSTS_PER_PAGE = 9;

export function formatPostCount(count: number): string {
  if (count === 1) return '1 article';
  return `${count} articles`;
}

export function parseBlogPageParam(pageParam: string | undefined, totalPages: number): number {
  const parsed = parseInt(pageParam ?? '1', 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  if (totalPages > 0 && parsed > totalPages) return totalPages;
  return parsed;
}

/** URL-safe tag slug: "AI agents" -> "ai-agents". */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Find the original tag label for a slug from a list of tags. */
export function tagFromSlug(slug: string, tags: string[]): string | undefined {
  return tags.find((t) => tagToSlug(t) === slug);
}

/** GitHub-style heading id from text. */
export function headingId(text: string): string {
  return tagToSlug(text).slice(0, 80);
}

function blockText(block: any): string {
  if (!block?.children || !Array.isArray(block.children)) return '';
  return block.children.map((c: any) => c?.text ?? '').join('').trim();
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** H2/H3 outline of a Portable Text body (for the table of contents). */
export function extractToc(body: unknown): TocItem[] {
  if (!Array.isArray(body)) return [];
  const seen = new Map<string, number>();
  const items: TocItem[] = [];
  for (const block of body) {
    if (!block || block._type !== 'block') continue;
    const style = block.style;
    if (style !== 'h2' && style !== 'h3') continue;
    const text = blockText(block);
    if (!text) continue;
    let id = headingId(text) || 'section';
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    if (n > 0) id = `${id}-${n + 1}`;
    items.push({ id, text, level: style === 'h2' ? 2 : 3 });
  }
  return items;
}

/** Minimum H2 count before a TOC is shown. */
export const TOC_MIN_HEADINGS = 4;
