import Image from 'next/image';
import Link from 'next/link';
import { getPosts, urlFor } from '@/lib/sanity';
import Container from '@/components/layout/container';
import Tag from '@/components/data-display/tag';
import Typography from '@/components/general/typography';

export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function BlogPreviewSection() {
  const posts = await getPosts();
  if (!posts || posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  return (
    <section id="blog" className="py-16 md:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <Tag label="Blog" />
          <Typography variant="h2">Latest Writings</Typography>
          <Typography variant="subtitle" className="max-w-lg">
            A few things I&apos;ve been thinking about.
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latest.map((post: any) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition block"
            >
              {/* Cover image */}
              <div className="relative h-44 w-full overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={urlFor(post.coverImage).width(500).height(300).url()}
                    alt={post.coverImage.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 p-5">
                    <span className="text-sm font-semibold text-white/90 text-center line-clamp-3">
                      {post.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Card info */}
              <div className="p-4">
                <h3 className="font-semibold text-base text-gray-900 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            View all posts →
          </Link>
        </div>
      </Container>
    </section>
  );
}
