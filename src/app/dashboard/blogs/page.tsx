import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteBlogButton from "./_components/DeleteBlogButton";

export default async function BlogsAdminPage() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true } });
  if (!me || me.role !== "ADMIN") redirect("/");

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Blogs</h1>
        <a href="/dashboard/blogs/new" className="rounded bg-blue-600 px-3 py-2 text-white">Add Blog</a>
      </div>

      <ul className="divide-y rounded border bg-white">
        {blogs.map((b) => (
          <li key={b.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{b.title}</div>
              <div className="text-xs text-slate-500">{new Date(b.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-2 flex gap-2">
              <a className="rounded border px-2 py-1" href={`/dashboard/blogs/${b.id}/edit`}>Edit</a>
              <DeleteBlogButton id={b.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}