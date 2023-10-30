import Image from "next/image";
import useSWR from "swr";

export default function AvatarForm() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  const user = data.data;

  return (
    <form>
      {user.avatar ? (
        <div>
          <Image
            src={user.avatar}
            alt={user.avatar}
            width={200}
            height={200}
            className="rounded-full m-auto my-5"
          />
        </div>
      ) : (
        <div
          style={{ width: 500, height: 500 }}
          className="bg-slate-600 rounded-full, m-auto my-5"
        />
      )}
      <input type="file" />
    </form>
  );
}
