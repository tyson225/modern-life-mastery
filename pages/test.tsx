import { useEffect, useState } from 'react';
import { fetchAllPosts } from '../utils/api';

export default function TestPage() {
const [posts, setPosts] = useState<any[]>([]);

useEffect(() => {
async function load() {
const data = await fetchAllPosts();
setPosts(data);
}
load();
}, []);

return (
<div className="p-6">
<h1 className="text-xl font-bold">All Posts</h1>
{posts.map((post) => (
<div key={post.slug} className="my-4">
<h2 className="text-lg">{post.title}</h2>
<p>{post.publishDate}</p>
</div>
))}
</div>
);
}