import { sql } from "@/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getJWTPayload() {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt-token");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token?.value!, secret);
  return payload;
}

export async function authorizedAdmin(func: Function) {
  const jwtPayload = await getJWTPayload();
  const res = await sql("select is_admin from users where id = $1", [
    jwtPayload.sub,
  ]);
  const data = res.rows[0];
  if (!data.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return func();
}
