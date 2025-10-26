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
    id: "facade-inspections",
    title: "Facade Inspections",
    copy:
      "Drone-based facade inspections replace scaffolding and rope access with safer, faster, and more detailed results. Our UAVs capture ultra-high-resolution images of building exteriors, detecting cracks, water ingress, and surface degradation. Perfect for high-rise structures, heritage assets, and industrial plants.",
    img: "/placeholders/facade.jpg",
    tags: ["High-res imaging", "Safer than scaffolds", "Heritage-ready"],
    deliverables: ["Detailed photo sets", "Defect annotation reports", "Thermal overlays (optional)"],
    benefits: ["Reduced inspection risks", "Lower costs", "Rapid deployment", "Clear maintenance insights"],
  },
  {
    id: "industrial-inspections",
    title: "Industrial Inspections",
    copy:
      "Our drones access confined and hazardous industrial areas, capturing data without downtime. From chimneys to tanks and refineries, UAV inspections provide both visual and thermal datasets for asset condition monitoring and preventive maintenance.",
    img: "/placeholders/industrial.jpg",
    tags: ["Thermal + RGB", "Confined space", "Non-disruptive"],
    deliverables: ["4K visual footage", "Thermal inspection reports", "Defect-tagged datasets"],
    benefits: ["Minimal downtime", "Worker safety", "Faster reporting", "Preventive maintenance"],
  },
  {
    id: "solar-inspections",
    title: "Solar Inspections",
    copy:
      "We inspect solar farms using radiometric thermal drones to identify panel hotspots, string failures, and potential fire risks. Our workflow is DGCA-compliant, scalable for utility-scale sites, and delivers actionable analytics for energy efficiency.",
    img: "/placeholders/solar.jpg",
    tags: ["Thermal IR", "Utility-scale", "Anomaly detection"],
    deliverables: ["Thermal anomaly maps", "String fault detection reports", "Georeferenced inspection visuals"],
    benefits: ["Increased energy yield", "Early fault detection", "Faster O&M cycles", "Scalable for large farms"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function DroneInspectionsPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* ───────────── Hero ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Precision UAV Inspections
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Drone Inspections
          </h1>

          <p className="mt-4 text-lg text-neutral-600">
            Perform <strong>faster, safer, and more accurate inspections</strong> with
            our UAV technology. From facades to solar farms, our inspections reduce
            downtime, improve safety, and deliver actionable insights.
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
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Licensed UAV pilots
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Insurance-ready
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Secure workflows
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
            q="Do drone inspections replace manual inspections?"
            a="Yes, in most cases. Drones minimize the need for scaffolding, ladders, or shutdowns, but manual follow-up may still be required for certain repairs."
          />
          <FAQ
            q="Are thermal inspections included?"
            a="Yes. Thermal imaging is available for solar, industrial, and building applications, identifying hidden anomalies quickly."
          />
          <FAQ
            q="What safety measures do you follow?"
            a="We operate under DGCA regulations with certified pilots, site risk assessments, and comprehensive insurance coverage."
          />
          <FAQ
            q="Can you handle large-scale inspections?"
            a="Yes. Our fleet and workflows are designed for both single-site and utility-scale inspections."
          />
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">
            Ready for safer, smarter inspections?
          </h3>
          <p className="mt-2 opacity-90">
            Whether it’s solar panels, facades, or heavy industry, our drone
            inspections deliver clarity, safety, and speed.
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
          From <strong>facade assessments</strong> to{" "}
          <strong>utility-scale solar inspections</strong>, our drone solutions
          deliver unmatched detail and safety.
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

/* One row: image + text (alternating) */
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