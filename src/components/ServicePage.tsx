// Server component
import Link from "next/link";

type Card = { id: string; title: string; desc: string; bullets?: string[] };
type Config = {
  slug: string;                // e.g. "surveying-mapping"
  eyebrow: string;             // small label
  title: string;               // page H1
  copy: string;                // short intro under H1
  blocks: Card[];              // sub-services (each gets an anchor by id)
};

export function makeServicePage(cfg: Config) {
  const Page = () => (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-emerald-400 font-semibold tracking-widest uppercase">
          {cfg.eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
          {cfg.title}
        </h1>
        <p className="mt-5 text-slate-300 max-w-3xl">{cfg.copy}</p>
      </section>

      {/* “Benefits” blocks (your sub-services) */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cfg.blocks.map((b) => (
            <div
              key={b.id}
              id={b.id}
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-emerald-400/40 transition"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {b.title}
              </h2>
              <p className="text-slate-300 text-sm mb-3">{b.desc}</p>
              {b.bullets?.length ? (
                <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                  {b.bullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 px-4 py-2 text-white font-semibold hover:opacity-95"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
  return Page;
}