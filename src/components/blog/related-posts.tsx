import PostCard, { PostCardPost } from '@/components/blog/post-card';
import Typography from '@/components/general/typography';

export default function RelatedPosts({ posts }: { posts: PostCardPost[] }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-14 border-t border-gray-100 pt-10">
      <Typography variant="h3" component="h2" id="related-heading" className="mb-6 text-2xl">
        Keep reading
      </Typography>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
