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
    id: "target-tracking",
    title: "Target Acquisition & Tracking",
    copy:
      "Electro-optical/IR payloads with on-board detection track moving targets and feed geo-coordinates to fires or interdiction units. Optional laser designation integrates with precision-guided munitions. We support geo-lock, handoff between platforms, and low-latency downlinks for tactical teams.",
    img: "/placeholders/defence-tracking.jpg",
    tags: ["EO/IR", "Geo-lock", "Handoff"],
    deliverables: ["Target tracks & coordinates", "STANAG-aligned video/meta", "Mission debrief packages"],
    benefits: ["Higher target confidence", "Shorter kill chain", "Coordinated multi-asset ops"],
  },
  {
    id: "combat-support",
    title: "Combat Support",
    copy:
      "ISR, comms relay, and electronic support workflows extend reach for ground elements. We configure geofences, lost-link behaviors, and spectrum-aware planning for contested environments, with dashboards for mission status and alerts.",
    img: "/placeholders/defence-support.jpg",
    tags: ["ISR", "Comms relay", "ES"],
    deliverables: ["Live ISR feeds", "Relay coverage maps", "Mission status & logs"],
    benefits: ["Improved C2", "Extended range", "Resilient missions"],
  },
  {
    id: "strike-ops",
    title: "Strike Operations",
    copy:
      "Platform and payload consulting for precise effects at stand-off ranges. We provide pre-mission terrain analysis, weaponeering inputs, and post-strike BDA via rapid orthos and change detection.",
    img: "/placeholders/defence-strike.jpg",
    tags: ["Stand-off", "BDA", "Change-detect"],
    deliverables: ["Pre-mission terrain packs", "BDA orthos", "Evidence clips & logs"],
    benefits: ["Reduced collateral risk", "Faster re-attack decisions", "Traceable mission data"],
  },
  {
    id: "logistics-supply",
    title: "Logistics & Supply",
    copy:
      "Drone lift profiles for urgent resupply, blood, or critical spares. Routes are planned to minimize exposure while ensuring delivery windows. Telemetry logs, mission replays, and custody metadata are included.",
    img: "/placeholders/defence-logistics.jpg",
    tags: ["Lift", "Routing", "Custody"],
    deliverables: ["Delivery route packs", "Telemetry & replay", "Custody meta"],
    benefits: ["Lower convoy risk", "Predictable ETAs", "Better sustainment"],
  },
  {
    id: "ammo-drop",
    title: "Ammunition Drop & Payload Delivery",
    copy:
      "Configured release systems with redundant arming logic and geofenced corridors. We validate drop accuracy through rehearsal flights and sensors; packages include SOPs and safety checklists.",
    img: "/placeholders/defence-drop.jpg",
    tags: ["Release", "Safety", "Accuracy"],
    deliverables: ["Release system config", "Accuracy validation report", "SOPs & checklists"],
    benefits: ["Safety-led delivery", "Repeatable accuracy", "Command confidence"],
  },
  {
    id: "border-surveillance",
    title: "Border Surveillance (Dronefence)",
    copy:
      "Persistent ISR for borders and critical facilities using multi-sensor towers + patrol drones. Automated detection and cueing, thermal perimeter sweeps, and incident replay build a deterrent posture.",
    img: "/placeholders/defence-fence.jpg",
    tags: ["Persistent ISR", "Thermal", "Cueing"],
    deliverables: ["Perimeter patrol plans", "Incident clips & heatmaps", "Response playbooks"],
    benefits: ["Early intrusion warning", "Forensic evidence", "Resource-efficient coverage"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function DefenceSecurityPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ISR • Security • Logistics
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Defence &amp; Security
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Mission-ready drone workflows for <strong>ISR</strong>,{" "}
            <strong>targeting</strong>, <strong>combat support</strong>, and{" "}
            <strong>secure logistics</strong>. Designed for demanding, contested
            environments with safety and governance at the core.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Engage with Team
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
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> STANAG-aligned meta
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Secure chain-of-custody
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Contested-env planning
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
            Mix and match modules for <strong>ISR, targeting, logistics</strong>, and{" "}
            <strong>perimeter security</strong>.
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
          <FAQ q="Do you support secure evidence workflows?" a="Yes—metadata, timecodes, and custody logs align to chain-of-custody practices." />
          <FAQ q="Can systems operate in GNSS-challenged areas?" a="We plan for contested environments with redundant nav strategies and link management." />
          <FAQ q="What about data access control?" a="Role-based access, encryption in transit/at rest, and detailed audit logs are standard." />
          <FAQ q="Is training included?" a="We provide role-based training for operators, analysts, and command staff." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">Decision advantage, safely delivered.</h3>
          <p className="mt-2 opacity-90">Operationalize airpower with secure, repeatable workflows.</p>
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