import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

async function currentUser() {
  const sid = (await cookies()).get("sessionUserId")?.value;
  return sid ? prisma.user.findUnique({ where: { id: sid } }) : null;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const me = await currentUser();
  if (!me || me.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { role } = await req.json(); // 'ADMIN' or 'USER'
  if (role !== "ADMIN" && role !== "USER") return NextResponse.json({ error: "Bad role" }, { status: 400 });

  const updated = await prisma.user.update({ where: { id: params.id }, data: { role } });
  return NextResponse.json(updated);
}