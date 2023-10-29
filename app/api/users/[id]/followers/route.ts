import { NextResponse } from "next/server";

import { sql } from "@/db";
import { Params } from "@/app/types";

export async function GET(request: Request, { params }: Params) {
  const { searchParams } = new URL(request.url);
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
  const limit = 3;
  const offset = page * limit;
  const id = params.id;

  const res = await sql(
    `select u.id, u.username, u.avatar
    from users u inner join follows f on u.id = f.follower_id
    where user_id = $1 limit $2 offset $3`,
    [id, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
