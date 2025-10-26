import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) return false;
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true } });
  return me?.role === "ADMIN";
}

// Attach an event (by eventId) to this blog
export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { eventId } = await req.json();
  if (!eventId) return NextResponse.json({ error: "eventId required" }, { status: 400 });

  await prisma.event.update({ where: { id: String(eventId) }, data: { blogId: params.id } });
  return NextResponse.json({ ok: true });
}

// Detach an event from this blog
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { eventId } = await req.json();
  if (!eventId) return NextResponse.json({ error: "eventId required" }, { status: 400 });

  await prisma.event.update({ where: { id: String(eventId) }, data: { blogId: null } });
  return NextResponse.json({ ok: true });
}