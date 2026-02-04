import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP env vars missing (SMTP_HOST/SMTP_USER/SMTP_PASS).");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: { user, pass },
  });
}

export async function sendMail(mailOptions: nodemailer.SendMailOptions) {
  // Always create a new transporter for serverless environments
  const mailer = createTransporter();

  // Verify connection configuration
  await new Promise((resolve, reject) => {
    mailer.verify(function (error, success) {
      if (error) {
        console.error("[Mailer] verify error:", error);
        reject(error);
      } else {
        console.log("[Mailer] Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  // Send mail
  return await new Promise((resolve, reject) => {
    mailer.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("[Mailer] sendMail error:", err);
        reject(err);
      } else {
        console.log("[Mailer] sendMail info:", info);
        resolve(info);
      }
    });
  });
}
