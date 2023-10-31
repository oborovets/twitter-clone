import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("q");

  if (!search) {
    return NextResponse.json({ data: [] }, { status: 200 });
  }

  const res = await sql(
    "select id, username, avatar from users where username ilike $1 limit 10",
    ["%" + search + "%"]
  );

  return NextResponse.json({ data: res.rows });
}
