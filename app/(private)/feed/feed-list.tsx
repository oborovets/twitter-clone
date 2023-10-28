"use client";
import useSWR from "swr";
import { Post as PostI } from "@/app/types";
import Post from "@/app/components/post";

interface Props {
  index: number;
}

function FeedList({ index }: Props) {
  const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.data.map((post: PostI) => (
        <li className="my-5" key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default FeedList;
