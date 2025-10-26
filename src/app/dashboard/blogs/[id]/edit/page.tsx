import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogForm from "../../_components/BlogForm";
import AttachEvents from "./AttachEvents"; // optional widget you already added

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true } });
  if (!me || me.role !== "ADMIN") redirect("/");

  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, content: true },
  });
  if (!blog) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Blog</h1>
      <div className="rounded border bg-white p-4">
        <BlogForm initial={{ id: blog.id, title: blog.title, content: blog.content ?? "" }} />
      </div>

      {/* Optional attach/detach events section */}
      <div className="rounded border bg-white p-4">
        <AttachEvents blogId={blog.id} />
      </div>
    </div>
  );
}