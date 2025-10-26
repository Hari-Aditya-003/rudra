"use client";
import useSectionSpy from "./useSectionSpy";
import Link from "next/link";

type Sub = {
  id: string;
  title: string;
  copy: string;
  image?: string;
  bullets?: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ServiceCategoryPage({
  title,
  eyebrow = "Our Services",
  intro,
  subs,
  contactCtaHref = "/about#contact",
}: {
  title: string;
  eyebrow?: string;
  intro: string;
  subs: Sub[];
  contactCtaHref?: string;
}) {
  const ids = subs.map((s) => s.id);
  const active = useSectionSpy(ids, 120);

  return (
    <main className="bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <p className="text-emerald-400 font-medium tracking-wide">{eyebrow}</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">{title}</h1>
        <p className="mt-4 text-neutral-300 max-w-3xl">{intro}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 flex gap-10">
        {/* Sticky section nav */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
          <nav className="rounded-xl border border-white/10 bg-white/5 p-3">
            <ul className="space-y-1">
              {subs.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={
                      "block rounded px-3 py-2 text-sm transition " +
                      (active === s.id
                        ? "bg-emerald-500/10 text-emerald-300 font-semibold"
                        : "text-neutral-300 hover:text-white hover:bg-white/5")
                    }
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-16">
          {subs.map((s) => (
            <article id={s.id} key={s.id} className="scroll-mt-28">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-neutral-300">{s.copy}</p>

                  {!!s.bullets?.length && (
                    <ul className="mt-4 space-y-2 text-neutral-300 list-disc pl-5">
                      {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}

                  {(s.ctaHref || s.ctaLabel) && (
                    <Link
                      href={s.ctaHref ?? contactCtaHref}
                      className="inline-block mt-6 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-3 font-medium"
                    >
                      {s.ctaLabel ?? "Get a Quote"}
                    </Link>
                  )}
                </div>

                {s.image && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.title} className="w-full h-auto" />
                  </div>
                )}
              </div>
              <hr className="mt-10 border-white/10" />
            </article>
          ))}

          {/* Contact strip */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold">Need help choosing the right solution?</h3>
            <p className="mt-2 text-neutral-300">
              Talk to our team for pricing, timelines, and the best-fit workflow for your project.
            </p>
            <Link
              href={contactCtaHref}
              className="inline-block mt-5 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 px-6 py-3 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}