import { useState } from "react";
import PostList from "./post-list";

interface Props {
  username: string;
  showEditButton?: boolean;
}

function PostContainer({ username, showEditButton = false }: Props) {
  const [cnt, setCnt] = useState(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(
      <PostList
        key={i}
        index={i}
        username={username}
        showEditButton={showEditButton}
      />
    );
  }

  return (
    <div className="my-5">
      {pages}
      <div className="flex flew-row justify-center">
        <button
          className="bg-slate-900 p-2 rounded-lg"
          onClick={() => setCnt((cnt) => cnt + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default PostContainer;
