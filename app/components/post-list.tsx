import useSWR from "swr";
import { Post as PostI } from "../types";
import Post from "./post";

interface Props {
  index: number;
  username: string;
}
function PostList({ index, username }: Props) {
  const { data, error, isLoading } = useSWR(
    () => "/api/posts?page=" + index + "&username=" + username
  );

  if (error) return <div>Error loading posts</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.data.map((post: PostI) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostList;
