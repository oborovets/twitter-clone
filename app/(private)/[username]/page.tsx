"use client";
import useSWR from "swr";
import UserPageHeader from "./user-page-header";

interface Props {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: Props) {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <div>posts container {params.username}</div>
    </div>
  );
}
