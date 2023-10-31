import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { PostInfo } from "@/app/types";

interface Props {
  post: PostInfo;
}

function Form({ post }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [content, setContent] = useState(post.content);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/posts/" + post.id, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
      router.push("/profile");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="bg-gray-700 p-2 rounded-lg w-full my-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="bg-slate-900 p-2 rounded-lg">
        Update Post
      </button>
    </form>
  );
}

export default Form;
