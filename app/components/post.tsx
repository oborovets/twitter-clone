import Image from "next/image";
import Link from "next/link";

import { Post as PostI } from "@/app/types";

interface Props {
  post: PostI;
  showEditButton?: boolean;
}

function Post({ post, showEditButton = false }: Props) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const createdAt = new Date(post.created_at);
  return (
    <div className="flex flex-row">
      <div>
        {post.avatar ? (
          <Link href={`/${post.username}`}>
            <Image
              className="rounded-full mr-3 cursor-pointer"
              src={post.avatar}
              width={50}
              height={50}
              alt={post.username}
            />
          </Link>
        ) : (
          <div
            style={{ height: 50, width: 50 }}
            className="bg-slate-600 rounded-full mr-3 cursor-pointer"
          />
        )}
      </div>
      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`/${post.username}`}>{post.username}</Link>
        </div>
        <div className="text-slate-400">
          {createdAt.toLocaleDateString("en-us", options)}
        </div>
        <div>{post.content}</div>
      </div>
      {showEditButton && (
        <div className="text-right flex-grow">
          <Link
            className="text-green-400"
            href={`/profile/edit-post/${post.id}`}
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}
export default Post;
