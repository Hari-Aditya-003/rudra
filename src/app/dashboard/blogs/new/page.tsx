import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BlogForm from "../_components/BlogForm";
import { prisma } from "@/lib/prisma";

export default async function NewBlogPage() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true } });
  if (!me || me.role !== "ADMIN") redirect("/");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Create Blog</h1>
      <div className="rounded border bg-white p-4">
        <BlogForm />
      </div>
    </div>
  );
}