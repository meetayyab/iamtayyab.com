import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts, urlFor } from '@/lib/sanity';
import { buildBlogCollectionSchema, SITE_URL } from '@/lib/seo';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Tag from '@/components/data-display/tag';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — Web Dev Articles',
  description:
    'Web development articles, tutorials, and engineering insights from Muhammad Tayyab — Full Stack Developer from Lahore, Pakistan.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog — Web Dev Articles | Muhammad Tayyab',
    description:
      'Web development articles, tutorials, and engineering insights from Muhammad Tayyab.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    siteName: 'Muhammad Tayyab',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/images/open-graph-tayyab.png`,
        width: 1200,
        height: 630,
        alt: 'Muhammad Tayyab — Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Web Dev Articles | Muhammad Tayyab',
    description:
      'Web development articles, tutorials, and engineering insights from Muhammad Tayyab.',
    creator: '@iamtayyabx',
    site: '@iamtayyabx',
    images: `${SITE_URL}/images/open-graph-tayyab.png`,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

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

export default async function BlogPage() {
  const posts = await getPosts();
  const collectionJsonLd = buildBlogCollectionSchema(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center gap-4 pb-4">
          <Tag label="Blog" />
          <Typography variant="h1" className="text-center">
            Writings by Muhammad Tayyab
          </Typography>
          <Typography variant="subtitle" className="max-w-xl text-center">
            Thoughts on software development, web technologies, and things
            learned shipping full stack and mobile products from Lahore,
            Pakistan.
          </Typography>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <div className="mb-4 text-4xl">✍️</div>
            <Typography variant="body1" className="text-center text-gray-500">
              No posts yet. Check back soon!
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, postIndex: number) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-300 dark:bg-gray-100"
              >
                {/* Image / Gradient */}
                <div className="relative h-48 w-full overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={urlFor(post.coverImage).width(700).height(400).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-end bg-gradient-to-br ${GRADIENT_PLACEHOLDERS[postIndex % GRADIENT_PLACEHOLDERS.length]} p-5`}
                    >
                      <span className="line-clamp-2 text-base font-semibold leading-snug text-white/90">
                        {post.title}
                      </span>
                    </div>
                  )}
                  {/* Subtle gradient overlay on real images */}
                  {post.coverImage && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${TAG_VARIANTS[i % TAG_VARIANTS.length]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-violet-600 dark:text-gray-900">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Footer */}
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
                        {post.estimatedReadingTime > 0 && (
                          <>
                            <span>·</span>
                            <span>{post.estimatedReadingTime} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
