"use client";
import { Params } from "@/app/types";
import useSWR from "swr";
import Form from "./form";

export default function EditPost({ params }: Params) {
  const { data, error, isLoading } = useSWR("/api/posts/" + params.id);

  if (error) return <div>Failed to load post</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <div className="flex flex-col gap-10">
        <Form post={data.data} />
        {/* <DeleteBtn /> */}
      </div>
    </div>
  );
}
