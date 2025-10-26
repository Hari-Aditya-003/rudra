import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function adminOnly() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) return null;
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { id: true, role: true } });
  return me?.role === "ADMIN" ? me : null;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    include: { events: { select: { id: true, title: true, startsAt: true, published: true } } },
  });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await adminOnly();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { title, content } = await req.json();
  const updated = await prisma.blog.update({
    where: { id: params.id },
    data: {
      ...(title != null ? { title: String(title) } : {}),
      ...(content != null ? { content: String(content) } : {}),
    },
    select: { id: true, title: true },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await adminOnly();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // First detach events
  await prisma.event.updateMany({ where: { blogId: params.id }, data: { blogId: null } });
  await prisma.blog.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}