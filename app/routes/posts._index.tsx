import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import dayjs from "dayjs";
import { DotIcon, PlusIcon } from "lucide-react";
import { requireUserId } from "~/apis/session.server";
import { getPosts } from "~/models/post.server";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authorId = await requireUserId(request);
  const posts = await getPosts({ authorId });
  return json({ posts });
};

export default function Index() {
  const navigate = useNavigate();
  const { posts } = useLoaderData<typeof loader>();
  const user = useOptionalUser()

  return (
    <section>
      <div className="flex flex-row">
        <h1 className="text-7xl font-semibold leading-tight">Blogs of {user?.email}</h1>
        <Button
          size="sm"
          color="primary"
          className="self-end"
          onClick={() => navigate({
            pathname: `/posts/form`,
            search: "?action=create",
          })}
        >
          <PlusIcon size={16} />
          New Post
        </Button>
      </div>
      <Divider />
      {posts.map((post) => {
        return (
          <Card key={post.id} isPressable onPress={() => navigate(`${post.id}`)}>
            <CardHeader className="justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-small text-primary text-left">
                  {dayjs(post.createdAt).format("MMMM D, YYYY")}
                </p>
                <div className="flex gap-5">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h1 className="text-2xl font-semibold leading-none text-default-600">{post.title}</h1>
                    <h4 className="text-small tracking-tight text-default-400"></h4>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p className="line-clamp-2">
                {post.content}
              </p>
            </CardBody>
            <CardFooter className="gap-3">
              <p className="text-default-400 text-small">By {post.author.email}</p>
              <div className="flex items-center">
                <DotIcon size={24} className="text-primary mt-px" />
                <p className="text-primary text-small">2 min read</p>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </section>
  );
}
