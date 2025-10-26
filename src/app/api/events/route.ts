import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function currentUser() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) return null;
  return prisma.user.findUnique({ where: { id: String(sid) }, select: { id: true, role: true } });
}

export async function GET() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { startsAt: "desc" },
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const me = await currentUser();
  if (!me || me.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  if (!body?.title || !String(body.title).trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const created = await prisma.event.create({
    data: {
      ownerId: me.id,
      title: String(body.title),
      description: String(body.description ?? ""),
      startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
      endsAt: body.endsAt ? new Date(body.endsAt) : undefined,
      mediaUrl: body.mediaUrl ?? null,
      youtubeId: body.youtubeId ?? null,
      published: body.published ?? true,
    },
  });

  return NextResponse.json(created, { status: 201 });
}