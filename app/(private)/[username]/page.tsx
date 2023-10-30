"use client";
import useSWR from "swr";
import UserPageHeader from "./user-page-header";
import PostContainer from "@/app/components/post-container";

interface Props {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: Props) {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <PostContainer username={params.username} />
    </div>
  );
}
