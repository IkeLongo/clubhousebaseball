import { NextResponse } from "next/server";
import pool from "@/lib/mysql";
import crypto from "crypto";
import { sendLeadNotification } from "@/lib/server/send-lead-notification";

type LeadRole = "parent" | "org" | "director";

function isValidRole(role: any): role is LeadRole {
  return role === "parent" || role === "org" || role === "director";
}

function isValidEmail(email: string) {
  // simple, pragmatic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- super lightweight in-memory rate limit ---
// Note: resets on server restart / serverless cold start (fine for discovery)
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 10; // allow 10/min per IP

function rateLimit(ip: string) {
  const now = Date.now();
  const arr = hits.get(ip) ?? [];
  const fresh = arr.filter((t) => now - t < WINDOW_MS);
  fresh.push(now);
  hits.set(ip, fresh);
  return fresh.length <= MAX_HITS;
}

function getIP(req: Request) {
  // Works behind many proxies; may be empty locally
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = getIP(req);
    const ua = req.headers.get("user-agent") ?? null;

    // 1) Basic rate limit
    if (ip !== "unknown" && !rateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    // 2) Parse
    const body = await req.json();

    const role = body?.role;
    const emailRaw = (body?.email ?? "").toString().trim();
    const email = emailRaw.toLowerCase();

    // 3) Honeypot check (bots often fill hidden field)
    const honeypot = (body?.website ?? "").toString().trim();
    if (honeypot.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 }); // pretend OK
    }

    // 4) Timing check (optional but strong)
    const openedAt = body?.meta?.openedAt;
    if (typeof openedAt === "number") {
      const elapsed = Date.now() - openedAt;
      if (elapsed < 1200) {
        return NextResponse.json(
          { success: false, error: "Invalid submission timing" },
          { status: 400 }
        );
      }
    }

    // 5) Validate required fields
    if (!isValidRole(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // 6) Extract meta fields (for reporting)
    const source = (body?.meta?.source ?? body?.source ?? null)?.toString().slice(0, 100) ?? null;
    const ctaLabel = (body?.meta?.label ?? body?.cta_label ?? null)?.toString().slice(0, 120) ?? null;

    // 7) Payload: store everything except raw fields you already break out
    // Keep it flexible in discovery mode.
    const payloadObj = { ...body };
    // normalize email stored only once
    payloadObj.email = emailRaw;
    // optional: remove honeypot field so you don't store it
    delete payloadObj.website;

    const payload = JSON.stringify(payloadObj);

    const id = crypto.randomUUID();

    // 8) Insert / upsert (dedupe by unique key email_lc+role)
    const sql = `
      INSERT INTO leads (id, email, role, source, cta_label, payload, user_agent, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        source = VALUES(source),
        cta_label = VALUES(cta_label),
        payload = VALUES(payload),
        user_agent = VALUES(user_agent),
        ip_address = VALUES(ip_address),
        updated_at = CURRENT_TIMESTAMP
    `;

    await pool.execute(sql, [id, emailRaw, role, source, ctaLabel, payload, ua, ip]);

    sendLeadNotification({
      role,
      email: emailRaw,
      source,
      ctaLabel,
      meta: body?.meta ?? null,
      data: body, // optional (can remove if too noisy)
      ip,
      userAgent: ua,
    }).catch((err) => console.error("Lead notify failed:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submit error:", error);
    const msg = (error as Error)?.message ?? "Unknown error";
    return NextResponse.json(
      { success: false, error: "Failed to store lead", details: msg },
      { status: 500 }
    );
  }
}
