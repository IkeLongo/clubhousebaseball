import nodemailer from "nodemailer";

export async function sendLeadNotificationEmail(opts: {
  to: string;
  from: string;
  subject: string;
  text: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    to: opts.to,
    from: opts.from,
    subject: opts.subject,
    text: opts.text,
  });
}
