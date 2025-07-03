import Image from 'next/image';
import { GetStaticProps } from 'next';
import { fetchAllPosts } from '../utils/api';
import "../app/globals.css";

interface Post {
  sys: { id: string };
  title: string;
  slug: string;
  publishDate: string;
  featuredImage?: {
    url: string;
    description?: string;
  } | null;
  category?: {
    name: string;
    slug: string;
  } | null;
  tagsCollection?: {
    items: { name: string; slug: string }[];
  };
  author?: {
    name: string;
    avatar?: { url: string; description?: string } | null;
  } | null;
}

interface TestPageProps {
  posts: Post[];
}

/**
 * Runs at build‑time (ISR every 60 s). Fetches up to 100 posts with rich data.
 */
export const getStaticProps: GetStaticProps<TestPageProps> = async () => {
  const posts = await fetchAllPosts();

  return {
    props: { posts },
    revalidate: 60,
  };
};

const TestPage = ({ posts }: TestPageProps) => (
  <main className="mx-auto max-w-4xl p-6">
    <h1 className="mb-8 text-3xl font-bold">All Posts</h1>

    {posts.length === 0 && (
      <p className="text-gray-500">No posts found.</p>
    )}

    <ul className="space-y-12">
      {posts.map((post) => (
        <li key={post.sys.id} className="flex flex-col md:flex-row md:items-start gap-6 border-b pb-8 last:border-0">
          {/* Featured image */}
          {post.featuredImage?.url && (
            <div className="w-full md:w-60 shrink-0 aspect-video relative">
              <Image
                src={post.featuredImage.url + '?w=480&h=270&fit=fill'}
                alt={post.featuredImage.description || post.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}

          {/* Textual content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              {post.author?.name && ` · by ${post.author.name}`}
            </p>

            {/* Category */}
            {post.category && (
              <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 mb-3">
                {post.category.name}
              </span>
            )}

            {/* Tags */}
            {post.tagsCollection?.items?.length ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tagsCollection.items.map((tag) => (
                  <span key={tag.slug} className="text-xs rounded bg-indigo-100 px-2 py-1 text-indigo-700">
                    {tag.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  </main>
);

export default TestPage;
