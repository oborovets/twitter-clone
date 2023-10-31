import { NextResponse } from "next/server";
import { sql } from "@/db";

export async function GET() {
  console.log("executed cron job");

  const res = await sql(
    "delete from posts where is_misinformation = true and is_misinformation_flagged_at < now() - interval '1 minute'"
  );

  return NextResponse.json({
    msg: "misinformation deleted " + res.rowCount,
  });
}
