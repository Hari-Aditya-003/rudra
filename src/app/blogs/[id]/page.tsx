import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BlogDetail({ params }: { params: { id: string } }) {
  // Defensive: if route params are missing, 404
  if (!params?.id) notFound();

  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    include: {
      events: {
        select: { id: true, title: true, startsAt: true, published: true },
        orderBy: { startsAt: "desc" },
      },
      author: { select: { name: true } },
    },
  });

  if (!blog) notFound();

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-sm text-slate-600">
          By {blog.author?.name ?? "Unknown"} • {new Date(blog.createdAt).toDateString()}
        </p>
      </header>

      {!!blog.content && <div className="prose max-w-none whitespace-pre-wrap">{blog.content}</div>}

      {blog.events.length > 0 && (
        <section>
          <h2 className="mt-8 text-xl font-semibold">Related Events</h2>
          <ul className="mt-2 list-disc pl-5">
            {blog.events.map((e) => (
              <li key={e.id}>
                {e.title}
                {e.startsAt && (
                  <span className="text-xs text-slate-500">
                    {" "}- {new Date(e.startsAt).toDateString()}
                  </span>
                )}
                {!e.published && <span className="ml-2 text-xs text-amber-700">(unpublished)</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}