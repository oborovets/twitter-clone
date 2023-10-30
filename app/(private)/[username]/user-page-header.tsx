"use client";
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

  const user = userData.data[0];

  async function handleFollow() {
    const res = await fetch("/api/follows", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id }),
    });

    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  }

  async function handleUnfollow() {
    const res = await fetch("/api/follows/" + user.id, { method: "DELETE" });
    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  }

  return (
    <header>
      <div>
        <h2>{username}</h2>
        {followData.data.length > 0 ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </header>
  );
}
