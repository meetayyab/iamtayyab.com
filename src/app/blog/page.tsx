import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts, urlFor } from '@/lib/sanity';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Tag from '@/components/data-display/tag';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | Muhammad Tayyab',
  description:
    'Thoughts on software development, web technologies, and engineering from Muhammad Tayyab.',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const TAG_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-green-100 text-green-700',
  'bg-orange-100 text-orange-700',
];

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container>
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag label="Blog" />
        </div>
        <Typography variant="h2" className="text-center">
          Thoughts &amp; Writings
        </Typography>
        <Typography variant="subtitle" className="max-w-xl text-center">
          I write about software development, web technologies, and things I&apos;ve learned along
          the way.
        </Typography>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center py-12">
          <Typography variant="body1" className="text-center text-gray-500">
            No posts yet. Check back soon!
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-200">
                {/* Cover image or gradient placeholder */}
                <div className="relative h-52 w-full overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={urlFor(post.coverImage).width(600).height(400).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 p-6">
                      <span className="text-center text-lg font-semibold leading-snug text-white/90 line-clamp-3">
                        {post.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[i % TAG_COLORS.length]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-[18px] font-bold leading-tight text-gray-900 line-clamp-2 dark:text-gray-900">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Bottom row */}
                  <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-600">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                      T
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
                    {post.estimatedReadingTime > 0 && (
                      <>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {post.estimatedReadingTime} min read
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
