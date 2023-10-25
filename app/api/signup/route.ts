import { sql } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    "select id, username from users where username ilike $1",
    [json.username]
  );

  if (res.rowCount > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hash = await bcrypt.hash(json.password, 10);

  await sql("insert into users (username, password) values ($1, $2)", [
    json.username,
    hash,
  ]);

  return NextResponse.json({ msg: "Registartion success" }, { status: 201 });
}

// INFO: Would be nice to have validation of fields here, i.e. if they exist and are of the correct type
