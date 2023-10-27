import Link from "next/link";
import Image from "next/image";
import type { UserInfo } from "../types";

interface Props {
  user: UserInfo;
  href?: string;
}
function User({ href, user }: Props) {
  return (
    <div>
      <Link
        className="flex flex-row items-center"
        href={`/${href || user.username}`}
      >
        <div>
          {user.avatar ? (
            <Image
              className="rounded-full mr-3"
              src={user.avatar}
              width={50}
              height={50}
              alt={user.username}
            />
          ) : (
            <div
              style={{ width: 50, height: 50 }}
              className="bg-slate-600 rounded-full mr-3"
            />
          )}
        </div>
        <div>{user.username}</div>
      </Link>
    </div>
  );
}

export default User;
