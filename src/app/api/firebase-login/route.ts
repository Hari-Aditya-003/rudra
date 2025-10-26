import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { idToken } = await req.json();
  if (!idToken) return NextResponse.json({ error: "Missing idToken" }, { status: 400 });

  const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("fbSession", sessionCookie, { // <-- SAME NAME as serverAuth.ts
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn / 1000,
  });
  return res;
}