import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/sanity';

// Match blog page ISR so new Sanity posts appear in the sitemap within ~1 minute
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://www.iamtayyab.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.iamtayyab.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    const posts = await getPosts();
    const blogUrls: MetadataRoute.Sitemap = (posts ?? [])
      .filter((post: { slug?: { current?: string } }) => Boolean(post?.slug?.current))
      .map((post: { slug: { current: string }; dateModified?: string; publishedAt?: string }) => {
        const raw = post.dateModified || post.publishedAt;
        const d = raw ? new Date(raw) : new Date();
        return {
          url: `https://www.iamtayyab.com/blog/${post.slug.current}`,
          lastModified: Number.isNaN(d.getTime()) ? new Date() : d,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });

    return [...staticUrls, ...blogUrls];
  } catch (err) {
    console.error('sitemap generation failed', err);
    // Never 500 the sitemap solely because Sanity failed — static URLs still discoverable
    return staticUrls;
  }
}
