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
