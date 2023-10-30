import { NextResponse } from "next/server";

import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/db";
import { Params } from "@/app/types";

export async function DELETE(request: Request, { params }: Params) {
  const jwtPayload = await getJWTPayload();
  const userId = params.user_id;

  await sql("delete from follows where user_id = $1 and follower_id = $2", [
    userId,
    jwtPayload.sub,
  ]);

  return NextResponse.json({ msg: "Follow deleted" });
}
