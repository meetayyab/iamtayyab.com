import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts, urlFor } from '@/lib/sanity';
import Container from '@/components/layout/container';
import Card from '@/components/layout/card';
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
              <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                {post.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={urlFor(post.coverImage).width(600).height(400).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-200 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Typography variant="h3" className="text-xl font-semibold leading-snug">
                    {post.title}
                  </Typography>
                  {post.excerpt && (
                    <Typography variant="body2" className="line-clamp-3 flex-1 text-gray-500">
                      {post.excerpt}
                    </Typography>
                  )}
                  <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-2 text-sm text-gray-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.estimatedReadingTime > 0 && (
                      <>
                        <span>·</span>
                        <span>{post.estimatedReadingTime} min read</span>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
