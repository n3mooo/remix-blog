import { Post, User } from "@prisma/client/wasm";
import { prisma } from "~/apis/db.server";

export function getPost({
  id,
  authorId,
}: Pick<Post, "id"> & {
  authorId: User["id"];
}) {
  return prisma.post.findFirst({
    select: { id: true, title: true, content: true, createdAt: true, author: true },
    where: { id, authorId },
  });
}

export function getPosts({ authorId }: { authorId?: User["id"] }  = {}) {
  return prisma.post.findMany({
    where: { authorId },
    select: { id: true, title: true, content: true, createdAt: true, author: true},
    orderBy: { updatedAt: "desc"},
  });
}

export function createPost({
  content,
  title,
  authorId,
}: Pick<Post, "content" | "title"> & {
  authorId: User["id"];
}) {
  return prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}

export function updatePost({
  id,
  content,
  title,
  authorId,
}: Pick<Post, "id" | "content" | "title"> & {
  authorId: User["id"];
}) {
  return prisma.post.update({
    where: { id, authorId },
    data: {
      title,
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}

export function deletePost({ id, authorId }: Pick<Post, "id"> & { authorId: User["id"] }) {
  return prisma.post.deleteMany({
    where: { id, authorId },
  });
}
