import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourse } from '@/lib/courses';
import { ArrowRight, CheckCircle2, Clock, GraduationCap } from 'lucide-react';

const NAVY = '#0B1F44';
const NAVY_SOFT = '#132B57';
const ACCENT = '#F97316';
const ACCENT_HOVER = '#EA580C';

interface PageProps {
  params: { slug: string };
}

export default async function CoursePage({ params }: PageProps) {
  const c = await getCourse(params.slug);
  if (!c) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`,
          }}
        />
        <div className="relative grid gap-6 p-6 text-white md:grid-cols-[1.2fr_1fr] md:p-8">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/30">
              <GraduationCap className="h-4 w-4" /> {c.level} • {c.duration}
            </p>
            <h1 className="text-3xl font-extrabold md:text-4xl">{c.title}</h1>
            <p className="mt-2 text-white/90">{c.summary}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/contact?topic=${encodeURIComponent(c.title)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-sky-700 hover:bg-neutral-100"
              >
                Enquire <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/training#schedule"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-semibold hover:bg-white/10"
              >
                <Clock className="h-4 w-4" /> See Schedule
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-white/20 opacity-40 blur-2xl" />
            <div className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/30">
              {c.hero ? (
                <img src={c.hero} alt={c.title} className="h-full w-full object-cover" />
              ) : (
                <GraduationCap className="h-10 w-10 text-white/90" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* WHAT YOU'LL LEARN */}
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">What you’ll learn</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {c.bullets.map((b: string) => (
            <li key={b} className="flex items-start gap-2 text-neutral-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-600" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/contact?topic=${encodeURIComponent(c.title)}`}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white"
            style={{ background: ACCENT }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT_HOVER)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT)
            }
          >
            Apply / Enquire <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="/training#courses"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50"
          >
            Back to all courses
          </a>
        </div>
      </div>
    </main>
  );
}
