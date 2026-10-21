import type { TocItem } from '@/lib/blog';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-gray-100 bg-gray-50 p-5 md:p-6"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        In this article
      </p>
      <ol className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-gray-600 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
