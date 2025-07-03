import { GetStaticProps } from 'next';
import { fetchAllPosts } from '../utils/api';

/**
 * Simple interface for a Post – adjust as needed.
 */
interface Post {
  title: string;
  slug: string;
  publishDate: string;
}

interface TestPageProps {
  posts: Post[];
}

/**
 * getStaticProps runs ONLY on the server during build (and during ISR revalidation).
 * This ensures Contentful credentials never reach the browser.
 */
export const getStaticProps: GetStaticProps<TestPageProps> = async () => {
  const posts = await fetchAllPosts();

  return {
    props: {
      posts,
    },
    // Revalidate at most once per minute (adjust as needed)
    revalidate: 60,
  };
};

const TestPage = ({ posts }: TestPageProps) => (
  <main className="p-8 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">All Posts</h1>

    {posts.length === 0 && (
      <p className="text-gray-500">No posts found.</p>
    )}

    {posts.map((post) => (
      <article key={post.slug} className="mb-6 border-b pb-4 last:border-none">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <time className="text-sm text-gray-500">
          {new Date(post.publishDate).toLocaleDateString()}
        </time>
      </article>
    ))}
  </main>
);

export default TestPage;
