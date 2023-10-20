import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg">
        <h1 className="text-center my-4">Strings</h1>
        <Link className="bg-slate-900 my-4 p-3 rounded-lg block" href="/signin">
          Sign In
        </Link>
        <Link className="bg-slate-900 my-4 p-3 rounded-lg block" href="/signup">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
