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
    id: "energy-utilities",
    title: "Energy & Utilities",
    copy:
      "Grid, transmission, and generation assets monitored with thermal/RGB/LiDAR to detect defects early. Streamline vegetation management, line patrols, and solar PV health with repeatable flights and analytics.",
    img: "/placeholders/energy.jpg",
    tags: ["Thermal", "PV Health", "Vegetation"],
    deliverables: ["Defect & anomaly reports", "Thermal orthos", "Clearance/encroachment maps"],
    benefits: ["Fewer outages", "Predictive maintenance", "Safer inspections", "Regulatory-ready evidence"],
  },
  {
    id: "construction-infra",
    title: "Construction & Infrastructure",
    copy:
      "Site progress, earthworks, and as-built verification. Cut/fill, stockpile volumes, deviation heat-maps, and 4D progress deliver trusted evidence for planners, PMs, and auditors.",
    img: "/placeholders/construction.jpg",
    tags: ["Progress", "Cut/Fill", "Deviation"],
    deliverables: ["Orthos & point clouds", "Volume & variance reports", "Deviation heat-maps"],
    benefits: ["Reduced rework", "Faster claims", "Clear stakeholder comms", "Schedule confidence"],
  },
  {
    id: "mining-natural",
    title: "Mining & Natural Resources",
    copy:
      "Operational intelligence from pits to stockyards. Accurate reconciliation volumes, haul-road condition, and geotechnical context with photogrammetry/LiDAR plus repeatable mission plans.",
    img: "/placeholders/mining.jpg",
    tags: ["Reconciliation", "Safety", "LiDAR"],
    deliverables: ["Stockpile solids & tables", "Slope/berm health", "Change detection"],
    benefits: ["Audit-ready numbers", "Improved safety", "Optimized haulage", "Reduced survey cycles"],
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    copy:
      "Thermal leak detection, flare stack inspection, and corridor monitoring with high-safety workflows. Integrate outputs into integrity programs and GIS for faster mitigation.",
    img: "/placeholders/oilgas.jpg",
    tags: ["Thermal", "Integrity", "Corridor"],
    deliverables: ["Thermal/visual mosaics", "Defect catalog", "GIS layers & reports"],
    benefits: ["Lower risk exposure", "Faster detection", "Compliance evidence", "Optimized maintenance"],
  },
  {
    id: "transport-logistics",
    title: "Transportation & Logistics",
    copy:
      "Corridor mapping for rail/road/ports, pavement condition, and asset inventories. Up-to-date basemaps help prioritize capital works and maintenance windows.",
    img: "/placeholders/transport.jpg",
    tags: ["Corridor", "Inventory", "Pavement"],
    deliverables: ["Linear asset maps", "Condition indexes", "Work priority layers"],
    benefits: ["Better planning", "Less downtime", "Cost-effective rehab", "Shared visibility"],
  },
  {
    id: "manufacturing-warehousing",
    title: "Manufacturing & Warehousing",
    copy:
      "Roof scans, thermal audits, and façade inspections improve plant reliability and energy efficiency. Map yards and layouts for safety and throughput optimization.",
    img: "/placeholders/manufacturing.jpg",
    tags: ["Thermal", "Façade", "Layout"],
    deliverables: ["Anomaly reports", "Thermal/visual maps", "Layout & safety layers"],
    benefits: ["Reduced OPEX", "Safer facilities", "Data-driven upgrades", "Less unplanned downtime"],
  },
  {
    id: "environmental-monitoring",
    title: "Environmental Monitoring",
    copy:
      "Measure change in wetlands, forests, and coastlines with multispectral indices (NDVI & more), shoreline profiles, and elevation change. Support ESG reporting with defensible data.",
    img: "/placeholders/environment.jpg",
    tags: ["NDVI", "Change", "Shoreline"],
    deliverables: ["Vegetation indices", "Change maps", "Elevation profiles"],
    benefits: ["ESG-ready evidence", "Early degradation signals", "Better conservation planning"],
  },
  {
    id: "public-safety",
    title: "Public Safety & Emergency Response",
    copy:
      "Rapid damage assessment and situational awareness for incident command. Orthos in hours, live overwatch, and shareable web maps support coordinated response.",
    img: "/placeholders/publicsafety.jpg",
    tags: ["Rapid", "Overwatch", "Shareable"],
    deliverables: ["Rapid orthos", "Live telemetry map", "Incident layers"],
    benefits: ["Faster decisions", "Shared picture", "Safer responders", "Better resource allocation"],
  },
  {
    id: "real-estate-urban",
    title: "Real Estate & Urban Development",
    copy:
      "High-impact visuals, 3D context, and shadow/mass studies for proposals and approvals. Keep stakeholders aligned with up-to-date site data.",
    img: "/placeholders/realestate.jpg",
    tags: ["3D", "Visuals", "Approvals"],
    deliverables: ["Orthos & 3D tiles", "Render backplates", "Shadow/mass studies"],
    benefits: ["Smoother approvals", "Better marketing", "Reduced revisions"],
  },
  {
    id: "security-surveillance",
    title: "Security & Surveillance",
    copy:
      "Perimeter patrols, intrusion detection, and incident replay using high-zoom and thermal payloads. Policy-driven access keeps data secure and admissible.",
    img: "/placeholders/security.jpg",
    tags: ["Thermal", "Zoom", "Policies"],
    deliverables: ["Patrol video & logs", "Anomaly clips", "Chain-of-custody exports"],
    benefits: ["Deterrence", "Faster response", "Defensible evidence", "Operational oversight"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function IndustryVerticalsPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Built for Your Industry
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Industry Verticals
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            From <strong>utilities</strong> and <strong>infrastructure</strong> to{" "}
            <strong>public safety</strong> and <strong>manufacturing</strong>, we adapt
            drone workflows to your operational and compliance needs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Plan a Pilot
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50"
            >
              Explore Verticals
            </a>
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Proven playbooks
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> GIS/BIM ready
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Safety-first
            </span>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 ring-1 ring-neutral-200 shadow-sm flex items-center justify-center text-neutral-400">
            <span className="text-sm">[ Hero Image Placeholder ]</span>
          </div>
        </div>
      </section>

      {/* Verticals as capabilities */}
      <section id="capabilities" className="mx-auto max-w-7xl px-5 py-16">
        <header className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">Vertical Playbooks</h2>
          <p className="mt-2 text-neutral-600">
            Pre-built workflows and deliverables tailored for your sector—ready to deploy
            with your teams and tools.
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
          <FAQ q="Can you adapt to our safety procedures?" a="Yes. We map our SOPs to your HSE playbooks and site permits." />
          <FAQ q="Do you offer PoC pilots?" a="We often start with one site to prove value, then scale." />
          <FAQ q="How do stakeholders view outputs?" a="We publish to web maps or your GIS/BIM stack with secure access." />
          <FAQ q="What about data privacy?" a="RBAC, encryption, audit logs, and data retention policies are standard." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">See it in your workflow.</h3>
          <p className="mt-2 opacity-90">
            We’ll align flights, processing, and integrations to your sector’s demands.
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