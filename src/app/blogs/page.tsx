// src/app/blogs/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar } from "lucide-react";

/**
 * If later you add fields to your Prisma schema:
 *
 * model Blog {
 *   id          String   @id @default(cuid())
 *   title       String
 *   content     String?
 *   createdAt   DateTime @default(now())
 *   updatedAt   DateTime @updatedAt
 *   coverImage  String?   // <-- optional
 *   excerpt     String?   // <-- optional
 * }
 *
 * ...then you can include them in the select and use real images/excerpts.
 */

export default async function BlogsPage() {
  // Query ONLY fields that exist in your current schema
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true, content: true },
  });

  if (!blogs || blogs.length === 0) {
    return (
      <main className="bg-neutral-50 min-h-screen">
        <section className="py-16 text-center bg-white border-b border-neutral-200">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Best &amp; Latest Drone Blogs
          </h1>
          <p className="mt-2 text-neutral-600">
            No blogs yet — check back soon!
          </p>
        </section>
      </main>
    );
  }

  // Featured = newest
  const [featured, ...rest] = blogs;

  return (
    <main className="bg-neutral-50 min-h-screen">
      {/* Header like your reference */}
      <section className="py-12 text-center bg-white border-b border-neutral-200">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Best &amp; Latest Drone Blogs
        </h1>
        <p className="mt-2 text-neutral-600">
          Get access to the latest news &amp; insights by subscribing to our newsletter.
        </p>
        <form className="mt-4 flex justify-center gap-2">
          <input
            type="email"
            placeholder="E-mail"
            className="w-72 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Featured blog (big hero) */}
      <section className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-8 items-center">
        {/* Hero media (gradient placeholder since we don't have coverImage) */}
        <Link
          href={`/blogs/${featured.id}`}
          className="block rounded-2xl overflow-hidden group ring-1 ring-neutral-200 shadow-sm hover:shadow-md transition"
        >
          <div className="aspect-[16/9] w-full bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-200 group-hover:opacity-95" />
        </Link>

        {/* Hero text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            <Link href={`/blogs/${featured.id}`} className="hover:text-emerald-600">
              {featured.title}
            </Link>
          </h2>
          <p className="mt-3 text-neutral-600">
            {makeExcerpt(featured.content)}
          </p>
          <div className="mt-3 flex items-center text-sm text-neutral-500">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(featured.createdAt).toLocaleDateString()}
          </div>
        </div>
      </section>

      {/* Grid of remaining posts */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {rest.map((b) => (
            <article
              key={b.id}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <Link href={`/blogs/${b.id}`} className="block">
                {/* Card media (gradient placeholder) */}
                <div className="aspect-[16/9] bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200" />
                <div className="p-5">
                  <h3 className="font-semibold text-lg leading-snug hover:text-emerald-600">
                    {b.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                    {makeExcerpt(b.content)}
                  </p>
                  <div className="mt-3 flex items-center text-xs text-neutral-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(b.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ----------------------------- helpers ----------------------------- */

/** Build a short, clean preview from markdown/html/plain text. */
function makeExcerpt(input?: string | null, max = 160) {
  if (!input) return "";
  // strip markdown images/links/headers/basic html
  const withoutMd = input
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // images ![]()
    .replace(/\[[^\]]*\]\([^)]+\)/g, "") // links []()
    .replace(/[#>*`~_-]{1,}/g, " ") // md symbols
    .replace(/<[^>]+>/g, " ") // html tags
    .replace(/\s+/g, " ")
    .trim();

  return withoutMd.length > max ? withoutMd.slice(0, max).trimEnd() + "…" : withoutMd;
}