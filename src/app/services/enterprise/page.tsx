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
    id: "fleet-management",
    title: "Fleet Management",
    copy:
      "Centralized visibility and control for drone fleets across sites, teams, and vendors. Track airframes, batteries, maintenance, and pilot currency in one place. Enforce checklists and airspace rules before every mission.",
    img: "/placeholders/fleet.jpg",
    tags: ["Multi-site", "Compliance", "Uptime"],
    deliverables: ["Asset registry & health", "Maintenance scheduler", "Pilot & currency tracker", "Audit logs"],
    benefits: ["Higher fleet uptime", "Lower downtime risk", "Regulatory confidence", "Consistent ops"],
  },
  {
    id: "ops-dashboard",
    title: "Operations Dashboard",
    copy:
      "Live situational awareness for all missions: airspace status, geofences, weather, NOTAMs, and mission timelines. Real-time telemetry overlays and incident flags give safety teams immediate context.",
    img: "/placeholders/ops.jpg",
    tags: ["Realtime", "Geofence", "Telemetry"],
    deliverables: ["Live map & mission queue", "Alerting & approvals", "Role-based access"],
    benefits: ["Safer operations", "Faster approvals", "Single source of truth", "Better coordination"],
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline & Analytics",
    copy:
      "An opinionated pipeline from capture → upload → processing → publish. We standardize naming, metadata, and CRS; automate photogrammetry/LiDAR jobs; and publish tiled imagery/point clouds to your GIS/BIM tools.",
    img: "/placeholders/pipeline.jpg",
    tags: ["ETL", "Automation", "Standards"],
    deliverables: ["ETL jobs & storage policy", "Processing templates", "API/SDK for ingest", "Data catalog"],
    benefits: ["Repeatability", "Lower per-site cost", "Fewer reworks", "Faster data access"],
  },
  {
    id: "integrations",
    title: "Integrations & APIs",
    copy:
      "Drop-in connectors for ArcGIS, QGIS, Autodesk (Revit/Navisworks/Civil 3D), and cloud storage. Webhooks and REST APIs allow triggers on upload, job completion, and approvals for seamless enterprise workflows.",
    img: "/placeholders/integrations.jpg",
    tags: ["ESRI", "Autodesk", "APIs"],
    deliverables: ["Connectors & webhooks", "Authentication (SSO/SAML)", "Sample scripts & docs"],
    benefits: ["No tool silos", "IT friendly", "Faster adoption", "Lower integration effort"],
  },
  {
    id: "training-change",
    title: "Training & Change Management",
    copy:
      "Pilot onboarding, SOPs, and admin runbooks aligned to DGCA and your internal safety policies. Role-based workshops for engineers, planners, and leaders to interpret outputs correctly.",
    img: "/placeholders/training.jpg",
    tags: ["SOP", "Onboarding", "Playbooks"],
    deliverables: ["SOPs & checklists", "Role-based training", "Admin runbook", "Refresher cadence"],
    benefits: ["Fewer incidents", "Consistent outcomes", "Faster ramp", "Retained knowledge"],
  },
  {
    id: "sla-support",
    title: "SLAs & Support",
    copy:
      "Enterprise-grade support with response SLAs, named success managers, and quarterly value reviews. Optional white-glove services for rush processing or on-site mobilization.",
    img: "/placeholders/sla.jpg",
    tags: ["SLA", "On-call", "Reviews"],
    deliverables: ["Priority support & SLAs", "Success reviews", "Escalation matrix"],
    benefits: ["Predictable service", "Fewer blockers", "Continuous improvement", "Executive visibility"],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    copy:
      "Hardened cloud, data residency options, encryption at rest/in transit, detailed access logs, and retention policies. Process controls mapped to ISO 27001 principles and vendor-risk assessments.",
    img: "/placeholders/security.jpg",
    tags: ["Encryption", "Residency", "Governance"],
    deliverables: ["Data policy & retention", "Access logs & RBAC", "Vendor-risk documentation"],
    benefits: ["Peace of mind", "Audit readiness", "Controlled sharing", "Policy alignment"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function EnterpriseSolutionsPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Enterprise-grade UAV Programs
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Enterprise Solutions
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Standardize drone operations across business units with
            <strong> fleet management</strong>, <strong>governed data</strong>, and
            <strong> seamless integrations</strong>. Scale safely—from pilot to platform.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Talk to Solutions
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
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> SSO / RBAC
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> SLAs & Support
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> API-first
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
            Mix and match modules—from <strong>fleet governance</strong> to{" "}
            <strong>analytics</strong>—to run UAV programs at scale.
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
          <FAQ q="Can we integrate with our GIS/BIM stack?" a="Yes—native connectors for ArcGIS, QGIS, and Autodesk, plus REST APIs and webhooks." />
          <FAQ q="Do you support SSO?" a="We support SSO/SAML and granular role-based access control." />
          <FAQ q="How do you handle data residency?" a="We offer region selection with encryption at rest and in transit." />
          <FAQ q="What if we need surge capacity?" a="We provide rush processing and on-site mobilization under enterprise SLAs." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">Standardize. Govern. Scale.</h3>
          <p className="mt-2 opacity-90">Turn scattered drone projects into an enterprise program.</p>
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