import { sendMail } from "@/lib/server/mailer";

export type LeadNotifyPayload = {
  role: "parent" | "org" | "director";
  email: string;
  source?: string | null;
  ctaLabel?: string | null;
  meta?: Record<string, any> | null;
  data?: Record<string, any> | null;
  ip?: string | null;
  userAgent?: string | null;
};

export async function sendLeadNotification(payload: LeadNotifyPayload) {
  console.log("[LeadNotify] Starting sendLeadNotification", { role: payload.role, email: payload.email });
  
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;

  console.log("[LeadNotify] Email config check", { to: to ? "set" : "missing", from: from ? "set" : "missing" });

  if (!to || !from) {
    console.warn("[LeadNotify] LEAD_NOTIFY_TO or LEAD_NOTIFY_FROM not configured, skipping email");
    // Not configured => silently skip
    return;
  }

  const subject = `New Clubhouse Lead: ${payload.role} — ${payload.email}`;

  const text = [
    `Role: ${payload.role}`,
    `Email: ${payload.email}`,
    payload.source ? `Source: ${payload.source}` : null,
    payload.ctaLabel ? `CTA: ${payload.ctaLabel}` : null,
    payload.ip ? `IP: ${payload.ip}` : null,
    payload.userAgent ? `User-Agent: ${payload.userAgent}` : null,
    "",
    "Meta:",
    JSON.stringify(payload.meta ?? {}, null, 2),
    "",
    "Data:",
    JSON.stringify(payload.data ?? {}, null, 2),
  ]
    .filter(Boolean)
    .join("\n");

  console.log("[LeadNotify] Attempting to send email", { to, from, subject });
  
  try {
    const result = await sendMail({
      to,
      from,
      subject,
      text,
    });
    console.log("[LeadNotify] Email sent successfully", result);
    return result;
  } catch (err) {
    console.error("[LeadNotify] Failed to send email", err);
    throw err;
  }
}
