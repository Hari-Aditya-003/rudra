import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAdmin(): Promise<boolean> {
  const cookieStore = cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) return false;
  const me = await prisma.user.findUnique({
    where: { id: String(sid) },
    select: { role: true },
  });
  return me?.role === "ADMIN";
}

// Attach an event (by eventId) to this blog
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body: unknown = await req.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("eventId" in body) ||
    typeof (body as { eventId: unknown }).eventId !== "string"
  ) {
    return NextResponse.json({ error: "eventId required" }, { status: 400 });
  }

  const { eventId } = body as { eventId: string };

  await prisma.event.update({
    where: { id: eventId },
    data: { blogId: params.id },
  });

  return NextResponse.json({ ok: true });
}

// Detach an event from this blog
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body: unknown = await req.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("eventId" in body) ||
    typeof (body as { eventId: unknown }).eventId !== "string"
  ) {
    return NextResponse.json({ error: "eventId required" }, { status: 400 });
  }

  const { eventId } = body as { eventId: string };

  await prisma.event.update({
    where: { id: eventId },
    data: { blogId: null },
  });

  return NextResponse.json({ ok: true });
}
