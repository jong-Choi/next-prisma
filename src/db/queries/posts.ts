// src\db\queries\posts.ts
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export const fetchPosts: () => Promise<Post[]> = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

export const useFetchPostById = (
  id: string
): [() => Promise<Post>, () => void] => {
  const tag = `post-id-${id}`;

  const fetchPostById = unstable_cache(
    async () => {
      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        notFound();
      }
      return post;
    },
    [tag],
    {
      revalidate: 3600,
      tags: [tag],
    }
  );

  const revalidatePostById = () => revalidateTag(tag);

  return [fetchPostById, revalidatePostById];
};
