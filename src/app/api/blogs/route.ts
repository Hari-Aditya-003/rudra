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
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const me = await currentUser();
  if (!me || me.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { title, content } = await req.json();
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const created = await prisma.blog.create({
    data: { title: String(title), content: String(content), authorId: me.id },
    select: { id: true, title: true },
  });

  return NextResponse.json(created, { status: 201 });
}