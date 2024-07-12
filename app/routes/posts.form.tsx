import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import capitalize from "lodash.capitalize";
import { MoveLeftIcon } from "lucide-react";
import React from "react";
import { prisma } from "~/apis/db.server";
import { requireUserId } from "~/apis/session.server";
import { createPost, updatePost } from "~/models/post.server";

type TFormValues = {
  id?: string,
  title: string,
  content: string
  errors: {
    fields: (keyof Omit<TFormValues, "errors">)[],
    message: {
      [key in TFormValues['errors']['fields'][number]]?: string
    }
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // parse the search params for `?q=`
  const url = new URL(request.url)

  // Form action
  const action = url.searchParams.get("action");
  if (!action) throw new Response("Undefined action", { status: 404 });

  // If action is update
  const postId = action === "update" ? url.searchParams.get("postId") : undefined;

  const post = postId && action === "update"
    ? await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, title: true, content: true, author: true, authorId: true },
    })
    : undefined;
  if (!post && action === "update") throw new Response("Not Found", { status: 404 });

  return json({ action, post });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const action = url.searchParams.get("action");
  if (!action) throw new Response("Undefined action", { status: 404 });

  const userId = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || title.length === 0)
    throw new Response("Title is required", { status: 404 });

  if (typeof content !== "string" || content.length === 0)
    throw new Response("Content is required", { status: 404 });


  if (action === "create") {
    const created = await createPost({ title, content, authorId: userId })
    return redirect(`/posts/${created.id}`);
  }

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0)
    throw new Response("Id is required", { status: 404 });

  const updated = await updatePost({ id, title, content, authorId: userId });
  return redirect(`/posts/${updated.id}`);
};

export default function PostCreate() {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const { action, post } = useLoaderData<typeof loader>();

  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState<TFormValues>({
    title: "",
    content: "",
    errors: {
      fields: [],
      message: {}
    }
  });

  React.useEffect(() => {
    if (post && action === "update") {
      setValues(prev => ({
        ...prev,
        ...post
      }))
    }
  }, [post])

  return (
    <section className="flex flex-col gap-2 mx-auto max-w-3xl px-4 sm:px-6">
      <Button
        variant="light"
        className="flex items-center justify-start w-fit gap-1 text-primary hover:!bg-transparent -ml-3"
        onClick={() => navigate(-1)}
      >
        <MoveLeftIcon size={12} className="mt-px" />
        <span className="hover:underline">Back</span>
      </Button>
      <h1 className="text-3xl font-semibold">{capitalize(action)} new post</h1>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        {post && action === "update" && <Input name="id" value={post.id} type="hidden" />}

        <Input
          ref={titleRef}
          type="title"
          label="Title"
          name="title"
          value={values.title}
          variant="bordered"
          labelPlacement={"outside-left"}
          classNames={{
            base: "flex-col",
            label: "!pt-0 !ps-0 pb-1.5 pe-2",
            mainWrapper: "w-full"
          }}
          placeholder="Enter your title"
          isInvalid={values.errors.fields.includes("title")}
          errorMessage="Please enter post title"
          onValueChange={(value) => setValues(prev => ({
            ...prev,
            title: value,
            errors: {
              ...prev.errors,
              fields: value.length < 1 && !prev.errors.fields.includes("title")
                ? [...prev.errors.fields, "title"]
                : prev.errors.fields.filter(field => field !== "title"),
              message: {
                ...prev.errors.message,
                title: value.length < 1 ? "Please enter post title" : ""
              },
            }
          }))}
        />

        <Textarea
          ref={contentRef}
          variant={"bordered"}
          label="Content"
          name="content"
          value={values.content}
          classNames={{
            input: "resize-y min-h-[200px]"
          }}
          labelPlacement="outside"
          placeholder="Enter your description"
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          isInvalid={values.errors.fields.includes("content")}
          errorMessage="Please enter post content"
          onValueChange={(value) => setValues(prev => ({
            ...prev,
            content: value,
            errors: {
              ...prev.errors,
              fields: value.length < 1 && !prev.errors.fields.includes("content")
                ? [...prev.errors.fields, "content"]
                : prev.errors.fields.filter(field => field !== "content"),
              message: {
                ...prev.errors.message,
                content: value.length < 1 ? "Please enter post content" : ""
              },
            }
          }))}
        />

        <div className="w-full flex flex-row gap-2 items-center justify-end">
          <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="left" showArrow>
            <PopoverTrigger>
              <Button variant="flat" color="danger">
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">Delete post!</div>
                <div className="text-tiny">This action cannot be undone. Are you sure?</div>
                <div className="flex gap-2 mt-2 justify-end items-center">
                  <Button size="sm" variant="bordered" className="text-xs py-1 min-w-max h-auto"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Form method="post">
                    <Button color="primary" size="sm" type="submit" variant="solid" className="text-xs py-1 min-w-max h-auto">
                      OK
                    </Button>
                  </Form>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button color="primary" variant="solid" type="submit">
            Save
          </Button>
        </div>
      </Form>
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