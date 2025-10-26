import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, phone, email, password } = await req.json();

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: String(name),
        phone: String(phone),
        email: String(email),
        passwordHash,
      },
      select: { id: true, role: true, name: true, email: true },
    });

    const res = NextResponse.json({ user });
    res.cookies.set("sessionUserId", String(user.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}