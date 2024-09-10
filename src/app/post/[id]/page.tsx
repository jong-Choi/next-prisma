import { useFetchPostById } from "@/db/queries/posts";

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const [fetchPostById, revalidatePostById] = useFetchPostById(id);
  const post = await fetchPostById();

  return <li>{post.title}</li>;
}
