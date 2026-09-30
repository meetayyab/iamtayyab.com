import Link from 'next/link';
import { mergeClasses } from '@/lib/utils';

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
};

function pageHref(page: number) {
  return page <= 1 ? '/blog' : `/blog?page=${page}`;
}

function buildPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) pages.push('ellipsis');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  if (current < total - 2) pages.push('ellipsis');

  pages.push(total);
  return pages;
}

const navButtonClass =
  'inline-flex min-h-10 min-w-[5.5rem] items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray dark:focus-visible:ring-offset-gray-100';

export default function BlogPagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalCount);
  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <nav
      className="mt-14 flex flex-col items-center gap-6"
      aria-label="Blog pagination"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {rangeStart}–{rangeEnd}
        </span>{' '}
        of{' '}
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {totalCount}
        </span>{' '}
        {totalCount === 1 ? 'article' : 'articles'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {currentPage <= 1 ? (
          <span
            className={mergeClasses(
              navButtonClass,
              'cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-300 dark:text-gray-500'
            )}
            aria-disabled="true"
          >
            ← Previous
          </span>
        ) : (
          <Link
            href={pageHref(currentPage - 1)}
            className={mergeClasses(
              navButtonClass,
              'border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50/80 hover:text-violet-700 dark:border-gray-300 dark:text-gray-300 dark:hover:border-violet-500/50 dark:hover:bg-violet-950/30 dark:hover:text-violet-300'
            )}
            rel={currentPage - 1 === 1 ? undefined : 'prev'}
          >
            ← Previous
          </Link>
        )}

        <ul className="flex flex-wrap items-center gap-1.5 px-1">
          {pageNumbers.map((item, index) =>
            item === 'ellipsis' ? (
              <li
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-gray-400 dark:text-gray-500"
                aria-hidden
              >
                …
              </li>
            ) : (
              <li key={item}>
                {item === currentPage ? (
                  <span
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-violet-600 px-3 text-sm font-semibold text-white shadow-sm"
                    aria-current="page"
                  >
                    {item}
                  </span>
                ) : (
                  <Link
                    href={pageHref(item)}
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-gray-900"
                  >
                    {item}
                  </Link>
                )}
              </li>
            )
          )}
        </ul>

        {currentPage >= totalPages ? (
          <span
            className={mergeClasses(
              navButtonClass,
              'cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-300 dark:text-gray-500'
            )}
            aria-disabled="true"
          >
            Next →
          </span>
        ) : (
          <Link
            href={pageHref(currentPage + 1)}
            className={mergeClasses(
              navButtonClass,
              'border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50/80 hover:text-violet-700 dark:border-gray-300 dark:text-gray-300 dark:hover:border-violet-500/50 dark:hover:bg-violet-950/30 dark:hover:text-violet-300'
            )}
            rel="next"
          >
            Next →
          </Link>
        )}
      </div>
    </nav>
  );
}
