"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

/* ───────────────────────── Types & Data ───────────────────────── */

type Capability = {
  id: string;      // anchor for deep-linking from ServicesMenu (e.g. /services/agriculture#crop-management)
  title: string;
  copy: string;
  img?: string;
  tags?: string[];
  deliverables?: string[];
  benefits?: string[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "crop-management",
    title: "Crop Management",
    copy:
      "High-frequency drone imagery (RGB + multispectral) benchmarks crop vigor across the season. NDVI/NDRE indices and zoned prescription maps enable variable-rate inputs and targeted scouting. With repeatable flight plans and ground control, we quantify growth stages, stress, and impact of treatments field-by-field.",
    img: "/placeholders/agri-crop.jpg",
    tags: ["NDVI/NDRE", "Zonation", "Scouting"],
    deliverables: ["Vigor indices & anomaly layers", "Zoned prescription maps", "Change-detection series"],
    benefits: ["Higher yields per input", "Earlier stress detection", "Objective treatment validation", "Less manual scouting"],
  },
  {
    id: "soil-water",
    title: "Soil & Water Management",
    copy:
      "Elevation models, slope/aspect analysis, and surface drainage flows highlight waterlogging and erosion risk. Thermal and multispectral layers reveal irrigation inefficiencies. We produce actionable recommendations for berms, drains, and scheduling that reduce losses and optimize soil moisture.",
    img: "/placeholders/agri-water.jpg",
    tags: ["DEM/DSM", "Hydrology", "Irrigation"],
    deliverables: ["Micro-topography & flow paths", "Waterlogging hotspot maps", "Irrigation efficiency report"],
    benefits: ["Reduced water use", "Fewer washouts", "Healthier soil structure", "Lower pumping cost"],
  },
  {
    id: "livestock",
    title: "Livestock Management",
    copy:
      "Wide-area flights count herds, assess pasture condition, and identify fencing or water-point issues. Thermal assists in low-visibility searches. We integrate observations into simple dashboards your team can act on during daily runs.",
    img: "/placeholders/agri-livestock.jpg",
    tags: ["Herd counts", "Pasture health", "Thermal search"],
    deliverables: ["Livestock counts & heatmaps", "Pasture quality layers", "Fence/water-point inspection notes"],
    benefits: ["Less manual patrol", "Reduced loss events", "Balanced grazing pressure", "Rapid incident response"],
  },
  {
    id: "planting-reforestation",
    title: "Planting & Reforestation",
    copy:
      "Pre-plant surveys map terrain and micro-climate zones; post-plant monitoring tracks survival rates and stand density. For large programs, we generate flight corridors and sample plots to statistically validate success.",
    img: "/placeholders/agri-reforest.jpg",
    tags: ["Stand density", "Survival rate", "Planning"],
    deliverables: ["Planting suitability maps", "Survival-rate assessments", "Restocking recommendations"],
    benefits: ["Higher establishment success", "Optimized species siting", "Transparent program metrics"],
  },
  {
    id: "harvest-postharvest",
    title: "Harvest & Post-Harvest",
    copy:
      "Maturity mapping supports harvest timing, while route/yard orthos improve logistics. Stockpile volumetrics and quality checks document post-harvest handling with audit-ready evidence.",
    img: "/placeholders/agri-harvest.jpg",
    tags: ["Maturity", "Logistics", "Volumes"],
    deliverables: ["Maturity heatmaps", "Yard & route orthomosaics", "Stockpile volume reports"],
    benefits: ["Fewer spoilage losses", "Tighter logistics windows", "Objective reconciliation"],
  },
  {
    id: "environment-ecosystem",
    title: "Environmental & Ecosystem Monitoring",
    copy:
      "Biodiversity transects, riparian buffers, and wetland health are tracked via multispectral indices and elevation change. Results roll up into ESG/CSR reporting with geospatial evidence.",
    img: "/placeholders/agri-esg.jpg",
    tags: ["NDVI", "Wetlands", "ESG"],
    deliverables: ["Vegetation & habitat indices", "Buffer compliance maps", "Elevation/shoreline change"],
    benefits: ["Evidence-backed reporting", "Early degradation alerts", "Compliance confidence"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function AgricultureSolutionsPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Agronomy-ready Drone Workflows
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Agriculture Solutions
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Precision insights for <strong>crops</strong>, <strong>water</strong>, and{" "}
            <strong>soil</strong>. From vigor mapping to post-harvest reconciliation,
            we convert aerial data into actions your field teams can use the same day.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Talk to Agronomy
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50"
            >
              Explore Capabilities
            </a>
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Multispectral/thermal
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> RTK/PPK workflows
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> GIS/agronomy handoff
            </span>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 ring-1 ring-neutral-200 shadow-sm flex items-center justify-center text-neutral-400">
            <span className="text-sm">[ Hero Image Placeholder ]</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="mx-auto max-w-7xl px-5 py-16">
        <header className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">Capabilities</h2>
          <p className="mt-2 text-neutral-600">
            Mix and match the modules you need—from <strong>vigor mapping</strong> to{" "}
            <strong>environmental monitoring</strong>.
          </p>
        </header>

        <div className="mt-10 space-y-12">
          {CAPABILITIES.map((cap, idx) => (
            <FeatureRow key={cap.id} cap={cap} flip={idx % 2 === 1} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FAQ q="How often should we fly?" a="For row crops, weekly to bi-weekly during peak growth; orchards typically benefit from monthly baselines plus event-driven flights." />
          <FAQ q="Can you integrate with our agronomy tools?" a="Yes—deliverables are optimized for GIS and common agronomy platforms; we also provide web maps for fast sharing." />
          <FAQ q="Do you operate over large estates?" a="We plan corridor flights and multi-battery missions with safe handovers and consistent GSD." />
          <FAQ q="What accuracy can we expect?" a="With RTK/PPK and ground control, plan for 2–5 cm horizontal accuracy depending on terrain and canopy." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">Grow with confidence.</h3>
          <p className="mt-2 opacity-90">Put precise, timely field intelligence in every decision.</p>
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

/* ───────────────────────── Reusable Blocks ───────────────────────── */

function FeatureRow({ cap, flip }: { cap: Capability; flip?: boolean }) {
  return (
    <article id={cap.id} className="scroll-mt-40 md:scroll-mt-52 grid items-center gap-10 md:grid-cols-2">
      <div className={flip ? "md:order-2" : ""}>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-md bg-neutral-100 grid place-items-center text-neutral-400">
          {cap.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cap.img} alt={cap.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
          ) : (
            <span className="text-sm">[ Image Placeholder ]</span>
          )}
        </div>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        {cap.tags?.length ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {cap.tags.map((t) => (
              <span key={t} className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
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

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-xl border border-neutral-200 bg-white p-5 open:shadow-sm transition">
      <summary className="cursor-pointer select-none font-medium text-neutral-800 hover:text-emerald-600">{q}</summary>
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{a}</p>
    </details>
  );
}