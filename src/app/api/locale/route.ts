import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { locale } = await request.json();
  if (!locale || !["en", "hi"].includes(locale)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}