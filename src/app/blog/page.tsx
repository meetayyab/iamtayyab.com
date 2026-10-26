import { Metadata } from 'next';
import { getAllTags, getPostCount, getPosts, getPostsPage } from '@/lib/sanity';
import Link from 'next/link';
import { formatPostCount, parseBlogPageParam, POSTS_PER_PAGE, tagToSlug } from '@/lib/blog';
import { buildBlogCollectionSchema, SITE_URL } from '@/lib/seo';
import BlogPagination from '@/components/blog/blog-pagination';
import PostCard from '@/components/blog/post-card';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Tag from '@/components/data-display/tag';

export const revalidate = 60;

const BLOG_DESCRIPTION =
  'Practical, dated guides on AI coding agents, App Store and Play growth, SaaS pricing and Next.js — written by Muhammad Tayyab, a full stack and mobile developer who ships his own apps.';

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const totalCount = await getPostCount();
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));
  const page = parseBlogPageParam(pageParam, totalPages);
  const pageTitle =
    page > 1 ? `Blog — Page ${page}` : 'Blog — Guides for Builders Shipping Web & Mobile Products';
  const canonicalUrl = page > 1 ? `${SITE_URL}/blog?page=${page}` : `${SITE_URL}/blog`;

  return {
    title: pageTitle,
    description: BLOG_DESCRIPTION,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pageTitle} | Muhammad Tayyab`,
      description: BLOG_DESCRIPTION,
      url: canonicalUrl,
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
      title: `${pageTitle} | Muhammad Tayyab`,
      description: BLOG_DESCRIPTION,
      creator: '@iamtayyabx',
      site: '@iamtayyabx',
      images: `${SITE_URL}/images/open-graph-tayyab.png`,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const totalCount = await getPostCount();
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));
  const currentPage = parseBlogPageParam(pageParam, totalPages);

  const [posts, allPostsForSchema, tags] = await Promise.all([
    getPostsPage(currentPage, POSTS_PER_PAGE),
    getPosts(),
    getAllTags(),
  ]);
  const topTags = tags.slice(0, 10);
  const collectionJsonLd = buildBlogCollectionSchema(allPostsForSchema);

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
            Practical, dated guides on AI coding agents, App Store and Play
            growth, SaaS pricing and Next.js, from someone shipping his own apps.
          </Typography>
          {topTags.length > 0 && (
            <nav aria-label="Topics" className="flex flex-wrap justify-center gap-2 pt-2">
              {topTags.map(({ tag }) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tagToSlug(tag)}`}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-violet-300 hover:text-violet-600"
                >
                  {tag}
                </Link>
              ))}
            </nav>
          )}
          {totalCount > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatPostCount(totalCount)}
            </p>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="flex flex-col items-center py-20">
            <div className="mb-4 text-4xl">✍️</div>
            <Typography variant="body1" className="text-center text-gray-500">
              No posts yet. Check back soon!
            </Typography>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any, postIndex: number) => (
                <PostCard key={post._id} post={post} index={postIndex} />
              ))}
            </div>

            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={POSTS_PER_PAGE}
            />
          </>
        )}
      </Container>
    </>
  );
}
