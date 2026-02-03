import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/server/send-lead-notification";

export async function POST(req: Request) {
  try {
    const key = req.headers.get("x-internal-key");
    if (!process.env.INTERNAL_API_KEY || key !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body?.role || !body?.email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await sendLeadNotification(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("lead-notify route error:", error);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
