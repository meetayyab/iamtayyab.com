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

// Use zinc scale — NOT overridden by the site's custom gray CSS vars
function CodeBlock({ text }: { text: string }) {
  return (
    <div className="not-prose my-7 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      {/* macOS window chrome */}
      <div className="flex items-center gap-1.5 border-b border-zinc-700 bg-zinc-800 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
      </div>
      <pre className="overflow-x-auto p-5">
        <code className="whitespace-pre font-mono text-sm leading-relaxed text-emerald-400">{text}</code>
      </pre>
    </div>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-md" style={{ aspectRatio: '16/9' }}>
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-10 text-4xl font-bold leading-tight text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-3 mt-9 text-2xl font-bold leading-snug text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-2 mt-7 text-xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-6 text-lg font-semibold text-gray-900">{children}</h4>
    ),
    normal: ({ children, value }: any) => {
      const spans = value?.children ?? [];
      const isCodeBlock =
        spans.length > 0 &&
        spans.every((span: any) => span.marks?.includes('code'));

      if (isCodeBlock) {
        const text = spans.map((s: any) => s.text ?? '').join('');
        return <CodeBlock text={text} />;
      }

      return (
        <p className="mb-5 text-[17px] leading-[1.8] text-gray-600">{children}</p>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-4 border-violet-400 bg-violet-50 py-3 pl-6 pr-4 rounded-r-xl italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-5 ml-5 space-y-2 text-[17px] text-gray-600">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-[17px] text-gray-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-2 leading-relaxed before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-violet-400">
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => {
      // Inline code — zinc scale to avoid CSS var override
      return (
        <code className="rounded-md bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-400">
          {children}
        </code>
      );
    },
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-violet-600 underline underline-offset-2 transition-colors hover:text-violet-800"
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

          {/* Back link */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-500 transition-all hover:border-violet-300 hover:text-violet-600"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-violet-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <Typography variant="h1" className="mb-5 text-4xl font-extrabold leading-tight tracking-tight">
            {post.title}
          </Typography>

          {/* Author + meta row */}
          <div className="mb-10 flex items-center gap-3 border-b border-gray-100 pb-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
              T
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Muhammad Tayyab</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
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

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative mb-12 w-full overflow-hidden rounded-2xl shadow-md" style={{ aspectRatio: '16/9' }}>
              <Image
                src={urlFor(post.coverImage).width(900).height(506).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Excerpt callout */}
          {post.excerpt && (
            <p className="mb-10 text-lg leading-relaxed text-gray-500 border-l-4 border-violet-300 pl-5 italic">
              {post.excerpt}
            </p>
          )}

          {/* Body */}
          {post.body && (
            <div className="min-w-0">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-500 transition-all hover:border-violet-300 hover:text-violet-600"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to all posts
            </Link>
            <div className="text-sm text-gray-400">Thanks for reading 🙏</div>
          </div>

        </div>
      </Container>
    </>
  );
}
