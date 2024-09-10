import { fetchPosts } from "@/db/queries/posts";

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <ul>
      {posts.map((post) => {
        return <li key={post.id}>{post.title + post.id}</li>;
      })}
    </ul>
  );
}
