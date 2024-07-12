import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import { MoveLeftIcon, PenIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import invariant from "tiny-invariant";
import { prisma } from "~/apis/db.server";
import { getUser, requireUserId } from "~/apis/session.server";
import { ActionConpact, title } from "~/components/common";
import { deletePost } from "~/models/post.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  invariant(params.postId, "postId not found");

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    select: { id: true, title: true, content: true, author: true, authorId: true },
  });
  if (!post) throw new Response("Not Found", { status: 404 });

  return json({ post, user });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const authorId = await requireUserId(request);
  invariant(params.postId, "postId not found");

  await deletePost({ id: params.postId, authorId });

  return redirect("/posts");
};

export default function Post() {
  const navigate = useNavigate()
  const { post, user } = useLoaderData<typeof loader>();

  return (
    <section className="flex flex-col gap-2 mx-auto max-w-3xl px-4 sm:px-6">
      <div className="flex flex-row justify-end gap-2 items-center">
        {user!.id === post.authorId && (
          <ActionConpact
            onCreate={() => navigate({
              pathname: `/posts/form`,
              search: "?action=create",
            })}
            onUpdate={() => navigate({
              pathname: `/posts/form`,
              search: `?action=update&postId=${post.id}`,
            })}
            onDelete={true}
          />
        )}
      </div>

      <div className="w-full flex flex-row justify-between items-center">
        <Button
          variant="light"
          className="flex items-center gap-1 text-primary hover:!bg-transparent -ml-3"
          onClick={() => navigate(-1)}
        >
          <MoveLeftIcon size={12} className="mt-px" />
          <span className="hover:underline">Back</span>
        </Button>
        <span className="text-sm text-primary">2 min read</span>
      </div>
      <div>
        <h4 className="mb-0 text-default-500 font-light ml-1 italic">By {post.author.email}</h4>
        <h1 className={cn(title(), "!leading-tight mb-4")}>{post.title}</h1>
      </div>
      <div className="font-light tracking-wide">{post.content}</div>
    </section >
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Post not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}