"use client";
import useSWR from "swr";

import User from "@/app/components/user";
import { UserInfo } from "@/app/types";

interface Props {
  index: number;
}

function FollowersList({ index }: Props) {
  const { data: userData, error, isLoading } = useSWR("/api/users/profile");
  const { data: followingData } = useSWR(
    () => "/api/users/" + userData.data.id + "/followers?page=" + index
  );

  if (!followingData) return <div>Loading...</div>;

  return (
    <ul className="">
      {followingData.data.map((user: UserInfo) => (
        <li key={user.id} className="my-5">
          <User user={user} />
        </li>
      ))}
    </ul>
  );
}
export default FollowersList;
