/* eslint-disable @next/next/no-img-element */

"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
ArrowRight,
PlayCircle,
ShieldCheck,
Cpu,
Layers,
Map as MapIcon,
Lock,
Rocket,
BadgeCheck,
Building2,
GraduationCap,
Drone,
Package,
Wrench,
} from "lucide-react";


import { BANNERS, SERVICES, OUTCOMES, TESTIMONIALS, FAQS } from "./content";

/* ───────────────── Brand palette ───────────────── */
const ACCENT = {
  base: "#F97316",
  hover: "#EA580C",
  faint: "#FFF7ED",
  line: "#FED7AA",
};

/* ───────────────── Content models ───────────────── */
type QuickService = {
  id: string;
  title: string;
  blurb: string;
  href: string;
  icon?: string;
};

type Outcome = {
  title: string;
  industry: string;
  headline: string;
  blurb: string;
  kpis: string[];
  href?: string;
  thumb?: string;
};

type Testimonial = { quote: string; name: string; title: string };
type FAQ = { q: string; a: string };

/* ───────────────── Content (unchanged) ───────────────── */
// ... (keep all constant data: BANNERS, SERVICES, OUTCOMES, TESTIMONIALS, FAQS exactly as you had them)

/* ───────────────── Full-page banner slider ───────────────── */
function FullPageSlider({
  slides,
  interval = 5000,
  heights = { base: 60, md: 64, lg: 68 },
}: {
  slides: { src: string; alt?: string }[];
  interval?: number;
  heights?: { base: number; md?: number; lg?: number };
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides, interval]);

  return (
    <section className="relative w-full">
      <div
        className="hero relative w-full overflow-hidden bg-black h-[var(--hero-h)] min-h-[420px]"
        style={{ ["--hero-h" as any]: `${heights.base}vh` }}
      >
        {slides.map((s, idx) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt ?? "banner"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            } ${idx === i ? "animate-[heroZoom_8s_ease-in-out]" : ""}`}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.55),rgba(0,0,0,.15)_35%,rgba(0,0,0,.35))]" />

        <div className="absolute inset-0 grid place-items-center px-5 text-center text-white">
          {/* ... unchanged inner content ... */}
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 w-6 rounded-full transition ${
                i === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .hero {
            --hero-h: ${heights.md ?? heights.base}vh;
          }
        }
        @media (min-width: 1024px) {
          .hero {
            --hero-h: ${heights.lg ?? heights.md ?? heights.base}vh;
          }
        }
        @keyframes heroZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.06);
          }
        }
      `}</style>
    </section>
  );
}

/* ───────────────── Features under banner (4 tiles) ───────────────── */
function FeatureStrip() {
  const items = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Aviation Training",
      blurb: "Commercial pilot training with industry-standard courses & simulators.",
    },
    {
      icon: <Drone className="h-6 w-6" />,
      title: "Drone Training",
      blurb: "DGCA-aligned programs for beginners to advanced operators.",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Drone Supplier",
      blurb: "High-performance platforms & accessories for your missions.",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Drone Services",
      blurb: "Survey, inspections, agriculture, security & defence solutions.",
    },
  ];

  return (
    <div className="-mt-12 px-5 md:-mt-16">
      <div className="mx-auto grid max-w-6xl gap-4 rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur md:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl p-4 transition hover:bg-neutral-50">
            <div
              className="inline-flex items-center justify-center rounded-lg p-2"
              style={{ background: ACCENT.faint, color: ACCENT.base, boxShadow: `inset 0 0 0 1px ${ACCENT.line}` }}
            >
              {it.icon}
            </div>
            <h3 className="mt-3 font-semibold text-neutral-900">{it.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{it.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────── Services marquee ───────────────── */
function ServiceMarquee() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
      <div className="relative flex gap-3 whitespace-nowrap will-change-transform marquee-track">
        {items.map((s, idx) => (
          <Link
            key={s.id + "-" + idx}
            href={s.href}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111827] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-lg">{s.icon ?? "🛰️"}</span>
            <span className="max-w-[14rem] truncate">{s.title}</span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: scrollLeft 26s linear infinite;
        }
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ───────────────── Page ───────────────── */
export default function Home() {
  return (
    <main className="bg-[#F9FAFB]">
      {/* Full-page banner */}
      <FullPageSlider slides={BANNERS} interval={4500} />

      {/* 4 tiles under banner */}
      <FeatureStrip />

      {/* Page body */}
      <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:space-y-12 md:px-8">
        {/* Services marquee */}
        <ServiceMarquee />

        {/* Services grid */}
        <section>
          <header className="max-w-3xl">
            <h2 className="text-2xl font-bold md:text-3xl text-[#111827]">Explore Our Capabilities</h2>
            <p className="mt-2 text-[#4B5563]">
              Enterprise-grade capture & analytics across surveying, inspections, agriculture, and defence.
            </p>
          </header>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Link
                key={s.id}
                href={s.href}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.08)_0%,_transparent_60%)] opacity-60 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start gap-3">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ${ACCENT_ICON_CLASSES[i % ACCENT_ICON_CLASSES.length]} text-lg`}
                  >
                    {s.icon ?? "🛰️"}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#111827]">{s.title}</h3>
                    <p className="mt-1 text-sm text-[#4B5563]">{s.blurb}</p>
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#F97316] transition-all group-hover:gap-2">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section>
          <header className="max-w-3xl">
            <h2 className="text-2xl font-bold md:text-3xl text-[#111827]">Recent Outcomes</h2>
            <p className="mt-2 text-[#4B5563]">How teams used our data products to move faster.</p>
          </header>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {OUTCOMES.map((o) => (
              <OutcomeCard key={o.title} o={o} />
            ))}
          </div>
        </section>

        {/* About */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#EA580C,#F59E0B,#FB923C,#EA580C)] opacity-80" />
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, #F97316 10%, #fff)", color: ACCENT.base }}
            >
              <ShieldCheck className="h-4 w-4" />
              Trusted enterprise partner
            </div>

            <h2 className="text-2xl font-bold md:text-3xl text-[#111827]">About RUDRA</h2>
            <p className="mt-3 text-[#4B5563]">
              We fuse drone engineering with AI analytics to deliver <strong>CAD/BIM/GIS-ready datasets</strong> for
              infrastructure, utilities, mining, agriculture and public sector. DGCA-compliant ops, secure data
              handling and audit-ready QA come standard.
            </p>

            <div className="mt-6 grid gap-3 text-sm">
              <FeatureChip icon={<ShieldCheck className="h-4 w-4" />} text="DGCA-compliant flight operations" />
              <FeatureChip icon={<Cpu className="h-4 w-4" />} text="RTK/PPK capture • rigorous accuracy checks" />
              <FeatureChip icon={<Layers className="h-4 w-4" />} text="Deliverables aligned to Revit / ArcGIS / CAD" />
              <FeatureChip icon={<Lock className="h-4 w-4" />} text="Encrypted storage & secure sharing" />
              <FeatureChip icon={<MapIcon className="h-4 w-4" />} text="Web maps & reports for fast decisions" />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <StatBadge value="500+" label="Flights" />
              <StatBadge value="120+" label="sq km Surveyed" />
              <StatBadge value="40+" label="Enterprise Clients" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge text="ISO-ready workflows" />
              <Badge text="Insurance-ready" />
              <Badge text="Audit trail" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(251,146,60,0.10),transparent),radial-gradient(900px_500px_at_110%_10%,rgba(245,158,11,0.12),transparent)] blur-2xl" />
            <div className="relative grid aspect-[4/3] w-full place-items-center rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-neutral-400 shadow-sm">
              [ About / Team Image ]
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <header className="max-w-2xl">
            <h2 className="text-2xl font-bold md:text-3xl text-[#111827]">What teams say</h2>
            <p className="mt-2 text-[#4B5563]">Reliable capture, defensible accuracy, and clean hand-offs.</p>
          </header>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-[2px] w-12 rounded bg-[linear-gradient(90deg,#EA580C,#F59E0B,#FB923C)] opacity-70 group-hover:opacity-100" />
                <blockquote className="mt-3 leading-relaxed text-[#111827]">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-[#4B5563]">
                  <span className="font-semibold text-[#111827]">{t.name}</span> — {t.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl text-[#111827]">FAQ</h2>
            <span
              className="hidden rounded-full px-3 py-1 text-xs font-semibold md:inline-flex"
              style={{ background: "color-mix(in srgb, #F97316 10%, #fff)", color: ACCENT.base }}
            >
              <Rocket className="mr-1 h-4 w-4" /> Quick answers
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#E5E7EB] bg-white p-5 transition open:shadow-sm">
                <summary className="flex cursor-pointer select-none items-center justify-between font-medium text-[#111827] hover:text-[#F97316]">
                  <span>{f.q}</span>
                  <BadgeCheck className="h-4 w-4 text-neutral-400 transition group-open:rotate-45 group-open:text-[#F97316]" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{f.a}</p>
              </details>
            ))}
          </div>

          <div
            className="mt-6 rounded-2xl px-4 py-3 text-sm text-[#111827]"
            style={{
              background: "color-mix(in srgb, #F97316 10%, #fff)",
              border: "1px solid color-mix(in srgb, #F97316 25%, #fff)",
            }}
          >
            Didn’t find what you need?{" "}
            <Link href="/contact" className="font-semibold underline" style={{ textDecorationColor: ACCENT.base }}>
              Ask our team
            </Link>{" "}
            — most replies go out within a business day.
          </div>
        </section>

        {/* CTA */}
        <section className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#FB923C] p-[1px] shadow-lg">
          <div className="rounded-[calc(1.5rem-1px)] bg-white px-6 py-8 text-center md:px-10">
            <h3 className="text-xl font-bold md:text-2xl text-[#111827]">Ready to fly your next survey?</h3>
            <p className="mt-2 text-sm text-[#4B5563]">
              Send us your site boundary and deliverables — we’ll propose the safest, fastest flight plan and share a sample package.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
                style={{ background: ACCENT.base }}
              >
                Contact Us <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ───────────────── Small UI helpers ───────────────── */
function FeatureChip({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2"
      style={{ background: "color-mix(in srgb, #F97316 10%, #fff)", boxShadow: `inset 0 0 0 1px ${ACCENT.line}` }}
    >
      <span style={{ color: ACCENT.base }}>{icon}</span>
      <span className="text-[#4B5563]">{text}</span>
    </div>
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-[#F9FAFB] p-3 text-center ring-1 ring-[#E5E7EB]">
      <div className="text-lg font-extrabold text-[#111827]">{value}</div>
      <div className="text-xs text-[#4B5563]">{label}</div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: "color-mix(in srgb, #F97316 10%, #fff)", color: ACCENT.base, boxShadow: `inset 0 0 0 1px ${ACCENT.line}` }}
    >
      {text}
    </span>
  );
}

function OutcomeCard({ o }: { o: Outcome }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-[#E5E7EB]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(249,115,22,0.12),transparent_30%)]" />
        {o.thumb ? (
          <img
            src={o.thumb}
            alt={o.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[#F9FAFB] text-neutral-400">
            <PlayCircle className="h-10 w-10" />
          </div>
        )}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-[#111827] ring-1 ring-[#E5E7EB] backdrop-blur">
          <Building2 className="h-3.5 w-3.5" />
          {o.industry}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-[#111827]">{o.title}</h3>
      <p className="mt-1 text-sm font-medium" style={{ color: ACCENT.base }}>
        {o.headline}
      </p>
      <p className="mt-2 text-sm text-[#4B5563]">{o.blurb}</p>

      {o.kpis?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {o.kpis.map((k) => (
            <span
              key={k}
              className="inline-flex items-center rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-[#4B5563] ring-1 ring-[#E5E7EB]"
            >
              {k}
            </span>
          ))}
        </div>
      ) : null}

      {o.href ? (
        <div className="mt-4">
          <a
            href={o.href}
            className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2"
            style={{ color: ACCENT.base }}
          >
            View details <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </article>
  );
}

/* ───────────────── Accent icon ring presets ───────────────── */
const ACCENT_ICON_CLASSES = [
  "bg-[#FFF7ED] ring-[#FED7AA] text-[#F97316]",
  "bg-[#ECFEFF] ring-[#BAE6FD] text-[#0EA5E9]",
  "bg-[#ECFDF5] ring-[#A7F3D0] text-[#10B981]",
  "bg-[#FFFBEB] ring-[#FDE68A] text-[#F59E0B]",
];