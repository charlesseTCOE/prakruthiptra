import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

const INBOX = siteConfig.contact.email;

export async function sendCommitteeMail(input: {
  subject: string;
  fullName: string;
  phone?: string;
  email?: string;
  topic?: string;
  note?: string;
  attachment?: { filename: string; content: Buffer; contentType?: string };
}) {
  const text = [
    `Name: ${input.fullName}`,
    input.phone ? `Phone: ${input.phone}` : "",
    input.email ? `Email: ${input.email}` : "",
    input.topic ? `Topic: ${input.topic}` : "",
    input.attachment ? `Attachment: ${input.attachment.filename}` : "",
    "",
    input.note || "(no note)",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (appPassword) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: INBOX, pass: appPassword },
    });
    await transporter.sendMail({
      from: `"PTRA website" <${INBOX}>`,
      to: INBOX,
      replyTo: input.email || INBOX,
      subject: input.subject,
      text,
      attachments: input.attachment
        ? [{ filename: input.attachment.filename, content: input.attachment.content, contentType: input.attachment.contentType }]
        : undefined,
    });
    return { via: "gmail" as const };
  }

  if (input.attachment) {
    throw new Error("A Jobs file needs GMAIL_APP_PASSWORD on the server so it can be attached to the email.");
  }

  const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: input.subject,
      name: input.fullName,
      phone: input.phone || "",
      email: input.email || INBOX,
      topic: input.topic || "",
      message: text,
    }),
  });
  if (!res.ok) {
    throw new Error("Could not deliver the note to the association inbox.");
  }
  return { via: "formsubmit" as const };
}
