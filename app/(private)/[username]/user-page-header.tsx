"use client";
import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";

interface Props {
  username: string;
}

export default function UserPageHeader({ username }: Props) {
  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUser,
  } = useSWR("/api/users/?username=" + username);

  const {
    data: followData,
    error: followError,
    isLoading: isLoadingFollow,
  } = useSWR(() => "/api/follows?user_id=" + userData.data[0].id);

  if (userError || followError) return <div>Failed to load</div>;
  if (isLoadingUser || isLoadingFollow) return <div>Loading...</div>;

  if (userData.data.length === 0) {
    notFound();
  }

  async function handleFollow() {
    const res = await fetch("/api/follows", {
      method: "POST",
      body: JSON.stringify({ user_id: userData.id }),
    });

    if (res.ok) {
      mutate("/api/follows?user_id=" + userData.id);
    }
  }

  async function handleUnfollow() {
    const res = await fetch("/api/follows/" + userData.id, {
      method: "DELETE",
    });
    if (res.ok) {
      mutate("/api/follows?user_id=" + userData.id);
    }
  }

  return (
    <header className="w-full bg-slate-800 p-2 flex flex-row justify-between items-center">
      <h2 className="text-lg font-bold ">{username}</h2>
      {followData.data.length > 0 ? (
        <button
          className="bg-slate-900 p-2 rounded-lg"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button className="bg-slate-900 p-2 rounded-lg" onClick={handleFollow}>
          Follow
        </button>
      )}
    </header>
  );
}
