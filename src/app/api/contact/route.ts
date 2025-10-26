// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!email || !message) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  // 1) Save in DB
  await prisma.message.create({
    data: { fromEmail: email, fromName: name ?? "", body: message },
  });

  // 2) Send email (configure env vars)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       // e.g. smtp.gmail.com (with app password)
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,                      // true for 465
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"RUDRA Contact" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO!,        // your inbox
    subject: `New message from ${name || "Visitor"}`,
    replyTo: email,
    text: message,
    html: `
      <p><strong>Name:</strong> ${name || "-"}<br/>
      <strong>Email:</strong> ${email}</p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}