import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getPosts, getPost, urlFor } from '@/lib/sanity';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;
  return {
    title: `${title} | Muhammad Tayyab`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Muhammad Tayyab'],
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-3 mt-7 text-3xl font-semibold text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-2 mt-6 text-2xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-5 text-xl font-semibold text-gray-900">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-600">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-5 italic text-gray-500">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-600">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-gray-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-200 dark:text-gray-100">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-900 underline underline-offset-2 transition-colors hover:text-gray-700"
      >
        {children}
      </a>
    ),
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: 'Muhammad Tayyab', url: 'https://iamtayyab.com' },
    ...(post.coverImage ? { image: urlFor(post.coverImage).width(1200).height(630).url() } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-600"
          >
            ← Back to Blog
          </Link>
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-200 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Typography variant="h1" className="mb-4 leading-tight">
            {post.title}
          </Typography>
          <div className="mb-8 flex items-center gap-3 text-sm text-gray-400">
            <span>{formatDate(post.publishedAt)}</span>
            {post.estimatedReadingTime > 0 && (
              <>
                <span>·</span>
                <span>{post.estimatedReadingTime} min read</span>
              </>
            )}
          </div>
          {post.coverImage && (
            <div
              className="relative mb-10 w-full overflow-hidden rounded-xl"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={urlFor(post.coverImage).width(900).height(506).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          {post.body && (
            <div>
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-600"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
