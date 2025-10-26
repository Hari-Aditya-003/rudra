import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function requireAdmin() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) return null;
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { id: true, role: true } });
  return me?.role === "ADMIN" ? me : null;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const e = await prisma.event.findUnique({ where: { id: params.id } });
  if (!e) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(e);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const me = await requireAdmin();
  if (!me) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  try {
    const updated = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: body.title ?? undefined,
        description: body.description ?? undefined,
        startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
        endsAt: body.endsAt ? new Date(body.endsAt) : undefined,
        mediaUrl: body.mediaUrl ?? undefined,
        youtubeId: body.youtubeId ?? undefined,
        published: typeof body.published === "boolean" ? body.published : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const me = await requireAdmin();
  if (!me) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    await prisma.event.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 }); // handles P2025
  }
}