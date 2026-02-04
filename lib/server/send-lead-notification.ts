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
  
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;

  if (!to || !from) {
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
  
  try {
    const result = await sendMail({
      to,
      from,
      subject,
      text,
    });
    return result;
  } catch (err) {
    throw err;
  }
}
