import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/app/types";

interface Props {
  post: Post;
}

export default function DeleteBtn({ post }: Props) {
  const router = useRouter();
  const [state, setState] = useState({ showConfirm: false });

  async function handleDeletePost() {
    const res = await fetch("/api/posts/" + post.id, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/profile");
    }
  }

  function handleClick() {
    setState({ showConfirm: true });
  }

  return (
    <div>
      {!state.showConfirm ? (
        <button className="text-red-400" onClick={handleClick}>
          Delete Post
        </button>
      ) : (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <div className="flex flex-row gap-10">
            <button onClick={handleDeletePost} className="text-red-400">
              Yes
            </button>
            <button
              onClick={() => setState({ showConfirm: false })}
              className="text-blue-400"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
