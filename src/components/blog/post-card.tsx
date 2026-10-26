import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { tagToSlug } from '@/lib/blog';

const TAG_VARIANTS = [
  'bg-blue-50 text-blue-600 ring-1 ring-blue-200',
  'bg-violet-50 text-violet-600 ring-1 ring-violet-200',
  'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
  'bg-orange-50 text-orange-600 ring-1 ring-orange-200',
];

const GRADIENT_PLACEHOLDERS = [
  'from-violet-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-teal-500 to-cyan-600',
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export type PostCardPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
  tags?: string[];
  estimatedReadingTime?: number;
};

type PostCardProps = {
  post: PostCardPost;
  index?: number;
  /** Heading level for the card title; h2 on listing pages, h3 inside a post. */
  headingLevel?: 'h2' | 'h3';
};

export default function PostCard({ post, index = 0, headingLevel = 'h2' }: PostCardProps) {
  const Heading = headingLevel;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-300 dark:bg-gray-100">
      <Link href={`/blog/${post.slug.current}`} className="relative block h-48 w-full overflow-hidden">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(700).height(400).url()}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-end bg-gradient-to-br ${GRADIENT_PLACEHOLDERS[index % GRADIENT_PLACEHOLDERS.length]} p-5`}
          >
            <span className="line-clamp-2 text-base font-semibold leading-snug text-white/90">
              {post.title}
            </span>
          </div>
        )}
        {post.coverImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {post.tags && post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag, i) => (
              <Link
                key={tag}
                href={`/blog/tag/${tagToSlug(tag)}`}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-opacity hover:opacity-80 ${TAG_VARIANTS[i % TAG_VARIANTS.length]}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <Heading className="mb-2 line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-violet-600 dark:text-gray-900">
          <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
        </Heading>

        {post.excerpt && (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2.5 border-t border-gray-100 pt-4 dark:border-gray-300">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Muhammad Tayyab
            </span>
            <div className="flex items-center gap-1 text-[11px] text-gray-500">
              <span>{formatDate(post.publishedAt)}</span>
              {post.estimatedReadingTime ? (
                <>
                  <span>·</span>
                  <span>{post.estimatedReadingTime} min read</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
