import { Params } from "@/app/types";
import { authorizedAdmin } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: Params) {
  return authorizedAdmin(async () => {
    const { id } = params;
    console.log("Flagged misinformation with id", id);
    await sql(
      "update posts set is_misinformation = true, is_misinformation_flagged_at = now() where id = $1",
      [id]
    );
    return NextResponse.json({ msg: "flagged as misinformation" });
  });
}
