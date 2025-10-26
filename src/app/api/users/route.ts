import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

async function currentUser() {
  const sid = (await cookies()).get("sessionUserId")?.value;
  return sid ? prisma.user.findUnique({ where: { id: sid } }) : null;
}

export async function GET() {
  const me = await currentUser();
  if (!me || me.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(users);
}