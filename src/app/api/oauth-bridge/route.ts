import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authConfig from "@/app/api/auth/[...nextauth]/route"; // re-use handler config types

export async function GET() {
  // getServerSession works by importing the same options,
  // but with the App Router handler we can call it directly:
  const session = await getServerSession();
  const uid = (session as any)?.localUserId;

  const res = NextResponse.redirect(new URL("/account", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  if (uid) {
    res.cookies.set("sessionUserId", String(uid), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return res;
}