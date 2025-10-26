"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

/* ───────────────────────── Types & Data ───────────────────────── */

type Capability = {
  id: string;
  title: string;
  copy: string;
  img?: string;
  tags?: string[];
  deliverables?: string[];
  benefits?: string[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "boundary-surveying",
    title: "Boundary Surveying",
    copy:
      "Using drone imagery combined with GNSS control, we establish clear, legally defensible property boundaries. Outputs comply with registry standards and support land acquisition, subdivision, and dispute resolution.",
    img: "/placeholders/boundary.jpg",
    tags: ["GNSS", "Registry-ready", "Legal"],
    deliverables: ["Boundary maps", "Coordinate tables", "Registry-compliant documentation"],
    benefits: ["Legally defensible", "Reduced disputes", "Fast verification", "Lower survey cost"],
  },
  {
    id: "contour-surveying",
    title: "Contour Surveying",
    copy:
      "High-resolution contour maps generated from UAV flights enable accurate planning for drainage, irrigation, and construction projects. These datasets deliver precise elevation models for engineers and planners.",
    img: "/placeholders/contour.jpg",
    tags: ["DEM/DSM", "Drainage", "Elevation"],
    deliverables: ["Contour maps", "DEM/DSM surfaces", "CAD-ready files"],
    benefits: ["Better drainage planning", "Reduced field time", "Improved accuracy", "Design-ready data"],
  },
  {
    id: "topography-surveying",
    title: "Topography Surveying",
    copy:
      "Comprehensive topographic surveys provide detailed terrain models with spot heights, breaklines, and surface features. These are essential for road alignments, site grading, and large-scale infrastructure development.",
    img: "/placeholders/topography.jpg",
    tags: ["Terrain models", "Breaklines", "Infrastructure"],
    deliverables: ["Topographic maps", "CAD surfaces", "QA/accuracy reports"],
    benefits: ["Accurate terrain detail", "Faster project design", "Integrated with CAD/BIM", "Reduced field labor"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function LandSurveyingPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* ───────────── Hero ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Precision Land Surveying
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Land Surveying
          </h1>

          <p className="mt-4 text-lg text-neutral-600">
            <strong>Accurate, fast, and registry-compliant land surveys</strong> powered
            by UAVs and GNSS. From boundary marking to topographic mapping, we help
            clients plan, build, and manage land with confidence.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Get a Quote
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50"
            >
              View Capabilities
            </a>
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> GNSS-enabled accuracy
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Legal compliance
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Rapid turnaround
            </span>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="mt-10 md:mt-0">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 ring-1 ring-neutral-200 shadow-sm flex items-center justify-center text-neutral-400">
            <span className="text-sm">[ Hero Image Placeholder ]</span>
          </div>
        </div>
      </section>

      {/* ───────────── Capabilities ───────────── */}
      <CapabilitiesSection />

      {/* ───────────── FAQ ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FAQ
            q="Are your surveys legally valid?"
            a="Yes. Our boundary and cadastral surveys comply with land registry standards and are legally defensible."
          />
          <FAQ
            q="What equipment do you use?"
            a="We use UAVs with RTK/PPK and GNSS integration to achieve centimeter-level accuracy."
          />
          <FAQ
            q="How quickly can results be delivered?"
            a="Most land surveys are completed within 2–5 days depending on project size."
          />
          <FAQ
            q="Do you provide both maps and CAD files?"
            a="Yes. Deliverables include orthomosaics, CAD-ready files, and QA reports."
          />
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">
            Build with confidence.
          </h3>
          <p className="mt-2 opacity-90">
            From legal boundaries to topographic detail, our UAV-powered land surveys
            deliver the certainty you need.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 hover:bg-neutral-100"
            >
              Contact Us
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ───────────────────────── Sections ───────────────────────── */

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-5 py-16">
      <header className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">Capabilities</h2>
        <p className="mt-2 text-neutral-600">
          From <strong>boundary marking</strong> to{" "}
          <strong>topographic terrain models</strong>, our UAV workflows deliver
          survey-grade results with speed and safety.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {CAPABILITIES.map((cap, idx) => (
          <FeatureRow key={cap.id} cap={cap} flip={idx % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({ cap, flip }: { cap: Capability; flip?: boolean }) {
  return (
    <article
      id={cap.id}
      className="scroll-mt-40 md:scroll-mt-52 grid items-center gap-10 md:grid-cols-2"
    >
      {/* Image */}
      <div className={flip ? "md:order-2" : ""}>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-md bg-neutral-100 grid place-items-center text-neutral-400">
          {cap.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cap.img}
              alt={cap.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span className="text-sm">[ Image Placeholder ]</span>
          )}
        </div>
      </div>

      {/* Text */}
      <div className={flip ? "md:order-1" : ""}>
        {cap.tags?.length ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {cap.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <h3 className="text-2xl font-semibold text-neutral-900">{cap.title}</h3>
        <p className="mt-3 text-neutral-600 leading-relaxed">{cap.copy}</p>

        {(cap.deliverables?.length || cap.benefits?.length) && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {cap.deliverables?.length ? (
              <div className="rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm hover:shadow-md transition">
                <h4 className="text-sm font-semibold text-neutral-800">Deliverables</h4>
                <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                  {cap.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {cap.benefits?.length ? (
              <div className="rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm hover:shadow-md transition">
                <h4 className="text-sm font-semibold text-neutral-800">Benefits</h4>
                <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                  {cap.benefits.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

/* FAQ block */
function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-xl border border-neutral-200 bg-white p-5 open:shadow-sm transition">
      <summary className="cursor-pointer select-none font-medium text-neutral-800 hover:text-emerald-600">
        {q}
      </summary>
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{a}</p>
    </details>
  );
}