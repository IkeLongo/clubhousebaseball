import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // body.role: "parent" | "org" | "director"
  // store in: Airtable, Notion, Google Sheet, Firestore, Resend email to you, etc.

  console.log("New lead:", body);

  return NextResponse.json({ ok: true });
}
