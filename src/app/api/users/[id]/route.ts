import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

async function currentUser() {
  const sid = (await cookies()).get("sessionUserId")?.value;
  return sid ? prisma.user.findUnique({ where: { id: sid } }) : null;
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const me = await currentUser();
  if (!me || me.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // delete children first (if needed)
  await prisma.message.deleteMany({ where: { userId: params.id } });
  await prisma.event.deleteMany({ where: { ownerId: params.id } });

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}