import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/sanity';
import { formatPostCount, tagFromSlug, tagToSlug } from '@/lib/blog';
import { PERSON_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo';
import Breadcrumbs from '@/components/blog/breadcrumbs';
import PostCard from '@/components/blog/post-card';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Tag from '@/components/data-display/tag';

export const revalidate = 60;

type TagPageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag: tagToSlug(tag) }));
}

async function resolveTag(slug: string) {
  const all = await getAllTags();
  const label = tagFromSlug(slug, all.map((t) => t.tag));
  return label ? { label, all } : null;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const resolved = await resolveTag(tag);
  if (!resolved) return {};
  const { label } = resolved;
  const title = `${label} articles`;
  const description = `Articles about ${label} by Muhammad Tayyab, full stack and mobile developer: practical guides for builders shipping web and mobile products.`;
  const url = `${SITE_URL}/blog/tag/${tag}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Muhammad Tayyab`,
      description,
      url,
      type: 'website',
      siteName: 'Muhammad Tayyab',
      locale: 'en_US',
      images: [{ url: `${SITE_URL}/images/open-graph-tayyab.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Muhammad Tayyab`,
      description,
      creator: '@iamtayyabx',
      site: '@iamtayyabx',
      images: `${SITE_URL}/images/open-graph-tayyab.png`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const resolved = await resolveTag(tag);
  if (!resolved) notFound();
  const { label, all } = resolved;
  const posts = await getPostsByTag(label);
  const url = `${SITE_URL}/blog/tag/${tag}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: `${label} articles by Muhammad Tayyab`,
    url,
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': PERSON_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug.current}`,
        name: post.title,
      })),
    },
  };

  const otherTags = all.filter((t) => t.tag !== label).slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: label, href: `/blog/tag/${tag}` },
            ]}
          />
        </div>

        <div className="flex flex-col items-center gap-4 pb-4">
          <Tag label="Topic" />
          <Typography variant="h1" className="text-center">
            {label}
          </Typography>
          <Typography variant="subtitle" className="max-w-xl text-center">
            {formatPostCount(posts.length)} about {label}, written for builders shipping
            web and mobile products.
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any, i: number) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>

        {otherTags.length > 0 && (
          <div className="mt-14 flex flex-col items-center gap-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              More topics
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {otherTags.map(({ tag: t, count }) => (
                <Link
                  key={t}
                  href={`/blog/tag/${tagToSlug(t)}`}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-violet-300 hover:text-violet-600"
                >
                  {t} <span className="text-gray-400">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
