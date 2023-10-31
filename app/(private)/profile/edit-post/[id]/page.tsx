"use client";
import useSWR from "swr";
import Form from "./form";
import DeleteBtn from "./delete-btn";
import { Params } from "@/app/types";

export default function EditPost({ params }: Params) {
  const { data, error, isLoading } = useSWR("/api/posts/" + params.id);

  if (error) return <div>Failed to load post</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <div className="flex flex-col gap-10">
        <Form post={data.data} />
        <DeleteBtn post={data.data} />
      </div>
    </div>
  );
}
