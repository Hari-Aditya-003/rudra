// src/app/training/page.tsx
"use client";

import Link from "next/link";
import { allCourses, type Course } from "@/lib/courses";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Users,
  CalendarDays,
  PlayCircle,
  Briefcase,
  ShieldCheck,
  Sparkles,
  MapPin,
} from "lucide-react";

/* ========= Brand colors (match header/footer) ========= */
const NAVY = "#0B1F44";
const NAVY_SOFT = "#132B57";
const ACCENT = "#F97316";
const ACCENT_HOVER = "#EA580C";
const ACCENT_FAINT = "#FFF7ED";
const ACCENT_LINE = "#FED7AA";

const COURSES = allCourses();

export default function TrainingPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 45%, ${NAVY} 100%)`,
          }}
        />
        <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <p
              className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30"
              style={{ background: "rgba(255,255,255,.12)" }}
            >
              <GraduationCap className="h-4 w-4" />
              DGCA • RPTO-aligned
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              UAV Pilot Certification &amp; Industry Training
            </h1>

            <p className="mt-3 text-white/90">
              From classroom to field action—become a certified pilot and
              specialize in surveying, inspections, agriculture or aerial media.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white"
                style={{ background: ACCENT }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    ACCENT_HOVER)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    ACCENT)
                }
              >
                View Courses <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact?topic=training"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Talk to Admissions
              </Link>
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-white/90">
              {[
                "Certified trainers & licensed pilots",
                "Real aircraft, real missions",
                "Placement assistance with partner network",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-white" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-white/20 opacity-40 blur-2xl" />
            <div className="relative grid aspect-[4/3] w-full place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/30 backdrop-blur-md shadow-lg">
              <PlayCircle className="h-12 w-12" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ON-FIELD ACTION ===================== */}
      <section id="on-field" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14">
        <header className="max-w-3xl">
          <div
            className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{ background: ACCENT_FAINT, color: ACCENT, borderColor: ACCENT_LINE }}
          >
            <Sparkles className="h-4 w-4" />
            Real-world training
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">On-Field Action</h2>
          <p className="mt-2 text-neutral-600">
            Practical flying on controlled grounds and supervised industry
            missions—safety, checklists, and real client deliverables.
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow">
          <div className="grid aspect-[16/9] w-full place-items-center bg-neutral-100 text-neutral-400">
            <PlayCircle className="h-10 w-10" />
          </div>
        </div>
      </section>

      {/* ===================== COURSES ===================== */}
      <section id="courses" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14">
        <header className="max-w-3xl">
          <div
            className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{ background: ACCENT_FAINT, color: ACCENT, borderColor: ACCENT_LINE }}
          >
            <GraduationCap className="h-4 w-4" />
            Tailored tracks
          </div>
        </header>
        <h2 className="text-2xl font-bold md:text-3xl">Courses for Every Aspirant</h2>
        <p className="mt-2 max-w-3xl text-neutral-600">
          Pick your path—pilot fundamentals, advanced ops, or industry tracks.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <CourseCard key={c.slug} c={c} />
          ))}
        </div>
      </section>

      {/* ===================== WHY LEARN ===================== */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        <header className="max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">Why Learn to Fly with RUDRA</h2>
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { icon: <ShieldCheck className="h-5 w-5" />, title: "Safety First", text: "Strict SOPs, emergency drills and checklists." },
            { icon: <MapPin className="h-5 w-5" />, title: "Real Sites", text: "Live work on survey, inspection and agro missions." },
            { icon: <Users className="h-5 w-5" />, title: "Career Support", text: "Placement connects across industries and partners." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div
                className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
                style={{ background: ACCENT_FAINT, color: ACCENT, borderColor: ACCENT_LINE }}
              >
                {f.icon} {f.title}
              </div>
              <p className="text-neutral-700">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SUCCESS STRIP ===================== */}
      <section style={{ background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)` }}>
        <div className="mx-auto max-w-7xl px-5 py-14 text-white">
          <h2 className="text-2xl font-bold md:text-3xl">Success, Stories &amp; Drones</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <figure key={i} className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur">
                <blockquote className="leading-relaxed">
                  “The field hours and RTK planning gave me the confidence to fly complex jobs. Landed a surveying role in 4 weeks.”
                </blockquote>
                <figcaption className="mt-3 text-sm text-white/80">— R. Mehta, Certified Pilot</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CAREERS ===================== */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <header className="max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">Career Opportunities After Training</h2>
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            { title: "Survey Pilot", text: "Topographic, LiDAR & photogrammetry missions." },
            { title: "Inspection Pilot", text: "Solar, facade, transmission lines & plants." },
            { title: "Agro Pilot", text: "Spraying ops, crop analytics & advisory." },
            { title: "Media Pilot", text: "Cinematic aerials for marketing & films." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div
                className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
                style={{ background: ACCENT_FAINT, color: ACCENT, borderColor: ACCENT_LINE }}
              >
                <Briefcase className="h-4 w-4" /> {c.title}
              </div>
              <p className="text-neutral-700">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/contact?topic=training-placement"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white"
            style={{ background: ACCENT }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT_HOVER)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT)}
          >
            Speak to Placement Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ===================== SCHEDULE / FEES ===================== */}
      <section id="schedule" className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
                style={{ background: ACCENT_FAINT, color: ACCENT, borderColor: ACCENT_LINE }}
              >
                <CalendarDays className="h-4 w-4" />
                New batches every 2 weeks
              </span>
              {/* location chip intentionally removed */}
            </div>

            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              {["Mon–Sat: Classroom 10:00–13:00", "Field: 15:00–18:00", "Sim days for weather", "Guest sessions every Fri"].map(
                (t) => (
                  <div key={t} className="rounded-lg bg-neutral-50 p-3 ring-1 ring-neutral-200">
                    {t}
                  </div>
                )
              )}
            </div>

            <div id="fees" className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact?topic=training-schedule"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white"
                style={{ background: ACCENT }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT_HOVER)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT)}
              >
                Get Schedule <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?topic=training-fees"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50"
              >
                Fees & Financing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <FAQ />
      {/* ===================== BLOGS STRIP ===================== */}
      <BlogsStrip />
    </main>
  );
}

/* ---------- Small components ---------- */

function CourseCard({ c }: { c: Course }) {
  return (
    <article className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/training/${c.slug}`} className="block">
        <div className="relative grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-neutral-200 group-hover:ring-neutral-300">
          {c.hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={c.hero}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <GraduationCap className="h-8 w-8 text-neutral-400" />
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
          style={{ background: ACCENT_FAINT, color: ACCENT, borderColor: ACCENT_LINE }}
        >
          {c.level}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
          <Clock className="h-4 w-4" /> {c.duration}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold">
        <Link href={`/training/${c.slug}`} className="hover:underline">
          {c.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-neutral-600">{c.summary}</p>

      <ul className="mt-3 space-y-1 text-sm text-neutral-700">
        {c.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/contact?topic=${encodeURIComponent(c.title)}`}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white"
          style={{ background: ACCENT }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT_HOVER)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT)}
        >
          Enquire <ArrowRight className="h-4 w-4" />
        </Link>
        <a href="/training#schedule" className="text-sm font-semibold" style={{ color: ACCENT }}>
          See Schedule
        </a>
      </div>
    </article>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is the program DGCA compliant?",
      a: "Yes. Curriculum, trainers, and flight ops follow DGCA norms. Candidates receive certification as per regulation.",
    },
    {
      q: "Do you provide flying hours on real sites?",
      a: "Yes—besides airfield drills, trainees fly supervised missions on live survey/inspection jobs (weather permitting).",
    },
    {
      q: "Do I need prior experience?",
      a: "No. The Basic course starts from ground zero. Advanced & Tracks assume Basic proficiency.",
    },
    {
      q: "Job support after training?",
      a: "We connect graduates to our partner network across surveying, utilities, agriculture and media. Career days every quarter.",
    },
  ];
  return (
    <section id="faqs" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14">
      <h2 className="text-2xl font-bold md:text-3xl">UAV Pilot Certification FAQs</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((f) => (
          <details key={f.q} className="rounded-xl border border-neutral-200 bg-white p-5 open:shadow-sm">
            <summary className="cursor-pointer select-none font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-neutral-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function BlogsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <header className="max-w-3xl">
        <h2 className="text-2xl font-bold md:text-3xl">Blogs, News &amp; Events</h2>
        <p className="mt-2 text-neutral-600">Stories from training grounds and the industry.</p>
      </header>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <article key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="aspect-[16/9] w-full rounded-lg bg-neutral-100 ring-1 ring-neutral-200" />
            <h3 className="mt-3 font-semibold">Inside a Certification Week</h3>
            <p className="mt-1 text-sm text-neutral-600">
              A quick look at flight drills, simulator time and night ops.
            </p>
            <Link href="/blogs" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: ACCENT }}>
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/blogs" className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50">
          Visit Blog
        </Link>
      </div>
    </section>
  );
}