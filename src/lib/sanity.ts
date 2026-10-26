import { createClient } from 'next-sanity';
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

const postListProjection = `{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  "dateModified": _updatedAt,
  tags,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
}`;

export async function getPosts() {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) ${postListProjection}`
  );
}

export async function getPostCount(): Promise<number> {
  return client.fetch(`count(*[_type == "post" && defined(publishedAt)])`);
}

export async function getPostsPage(page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [$start...$end] ${postListProjection}`,
    { start, end }
  );
}

/** Posts sharing the most tags with `slug`; falls back to newest posts. */
export async function getRelatedPosts(slug: string, tags: string[] = [], limit = 3) {
  const safeTags = Array.isArray(tags) ? tags : [];
  const related: any[] = safeTags.length
    ? await client.fetch(
        `*[_type == "post" && defined(publishedAt) && slug.current != $slug && count((tags[])[@ in $tags]) > 0]
          | order(count((tags[])[@ in $tags]) desc, publishedAt desc) [0...$limit] ${postListProjection}`,
        { slug, tags: safeTags, limit }
      )
    : [];
  if (related.length >= limit) return related;
  const exclude = [slug, ...related.map((p) => p.slug?.current).filter(Boolean)];
  const fill: any[] = await client.fetch(
    `*[_type == "post" && defined(publishedAt) && !(slug.current in $exclude)]
      | order(publishedAt desc) [0...$n] ${postListProjection}`,
    { exclude, n: limit - related.length }
  );
  return [...related, ...fill];
}

/** All distinct tags with post counts, most used first. */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const tags: string[] = await client.fetch(
    `array::compact(*[_type == "post" && defined(publishedAt)].tags[])`
  );
  const counts = new Map<string, number>();
  for (const t of tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tag: string): Promise<any[]> {
  const query = `*[_type == "post" && defined(publishedAt) && $tag in tags] | order(publishedAt desc) ${postListProjection}`;
  return client.fetch<any[]>(query, { tag } as Record<string, string>);
}

export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      publishedAt,
      "dateModified": _updatedAt,
      tags,
      body,
      seoTitle,
      seoDescription,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { slug }
  );
}
