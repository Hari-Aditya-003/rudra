"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

/* ───────────────────────── Types & Data ───────────────────────── */

type Capability = {
  id: string;            // anchor id for deep-linking from navbar (/services#id)
  title: string;
  copy: string;
  img?: string;          // replace with real assets later
  tags?: string[];       // quick chips for scannability
  deliverables?: string[];
  benefits?: string[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "topographical",
    title: "Topographical Survey",
    copy:
      "Drone-based topographic capture with RTK/PPK control yields cm-level contours, spot heights and breaklines faster and safer than ground-only crews. Ideal for grading, drainage and road alignments across large sites.",
    img: "/placeholders/topographical.jpg",
    tags: ["RTK/PPK", "Contours", "DEM/DSM"],
    deliverables: ["CAD layers (DWG/DXF)", "Orthomosaic (GSD ~1–2 cm)", "DEM/DSM + breaklines", "QA/accuracy report"],
    benefits: ["Days → hours of field time", "Reduced crew exposure", "CAD-ready surfaces", "Traceable survey QA"],
  },
  {
    id: "gis-remote",
    title: "GIS Services",
    copy:
      "We structure raw aerial data into enterprise GIS products—digitization, classification, change detection and spatial analysis that plug straight into QGIS/ArcGIS and web maps.",
    img: "/placeholders/gis.jpg",
    tags: ["Web maps", "Geodatabases", "Analysis"],
    deliverables: ["Shapefiles/GeoPackage", "ArcGIS Feature Services", "Tiled imagery", "Change-detection layers"],
    benefits: ["Centralized source of truth", "Easy sharing across teams", "Better decisions with context", "Standards-compliant data"],
  },
  {
    id: "photogrammetry",
    title: "Aerial Photogrammetry",
    copy:
      "High-overlap imaging to generate dense point clouds, textured meshes and orthomosaics at 1–2 cm/pixel. Perfect for façade mapping, progress tracking and cut/fill analytics.",
    img: "/placeholders/photogrammetry.jpg",
    tags: ["Point cloud", "Mesh", "Orthos"],
    deliverables: ["LAS/LAZ point clouds", "Textured OBJ/FBX", "Geotiff orthomosaics", "Control & report"],
    benefits: ["Rich 3D context", "Repeatable flight paths", "Audit-ready outputs", "Great stakeholder visuals"],
  },
  {
    id: "lidar",
    title: "LiDAR Survey",
    copy:
      "Vegetation-penetrating LiDAR captures millions of points/sec to produce true bare-earth models—ideal for corridors, hydrology and forest inventory where photogrammetry struggles.",
    img: "/placeholders/lidar.jpg",
    tags: ["Bare-earth DTM", "Classification", "Corridors"],
    deliverables: ["Classified LAS (ground/non-ground)", "DTM/DSM", "Canopy height model", "Breaklines"],
    benefits: ["Accuracy under canopy", "Works in complex terrain", "Hydrology-ready surfaces", "Fewer revisits"],
  },
  {
    id: "thermal-mapping",
    title: "Thermal Mapping",
    copy:
      "Radiometric thermal flights reveal heat loss, moisture ingress and hotspots in plants and built environments. Pair with RGB for side-by-side analysis and targeted maintenance.",
    img: "/placeholders/thermal.jpg",
    tags: ["Radiometric", "Anomaly detect", "IR + RGB"],
    deliverables: ["Thermal orthomosaic", "Hotspot index & report", "Side-by-side IR/RGB tiles"],
    benefits: ["Faster energy audits", "Early fault detection", "OPEX reduction", "Prioritized maintenance"],
  },
  {
    id: "bim",
    title: "BIM Integration",
    copy:
      "Survey outputs register directly into Revit/Navisworks for clash detection, deviation heat-maps and as-built validation—keeping digital and physical aligned.",
    img: "/placeholders/bim.jpg",
    tags: ["Revit", "Navisworks", "Deviation"],
    deliverables: ["Registered point clouds (RCP/RCS)", "Deviation heat-maps", "Aligned CAD/BIM layers"],
    benefits: ["Less rework", "Trusted as-builts", "Better coordination", "Faster handover"],
  },
  {
    id: "gpr",
    title: "GPR (Ground-penetrating Radar)",
    copy:
      "Combine UAV mapping with GPR traces for a complete above/below-ground picture. Detect utilities, voids and subsurface anomalies to de-risk excavation.",
    img: "/placeholders/gpr.jpg",
    tags: ["Utilities", "Subsurface", "Risk-reduction"],
    deliverables: ["Georeferenced GPR grids", "Depth estimates", "Interpreted linework"],
    benefits: ["Fewer strikes", "Faster approvals", "Lower contingency", "Safer digs"],
  },
  {
    id: "bathymetric",
    title: "Bathymetric Survey",
    copy:
      "Seamless land-to-water terrain via UAV shoreline mapping and sonar for inland/coastal assets. Supports dredging, capacity and port maintenance planning.",
    img: "/placeholders/bathymetric.jpg",
    tags: ["Soundings", "3D bathy", "Change"],
    deliverables: ["XYZ soundings", "3D bathymetric surface", "Volumetric change reports"],
    benefits: ["Safe, efficient capture", "Operational flexibility", "Planning certainty", "Reduced marine costs"],
  },
  {
    id: "cadastral",
    title: "Cadastral Survey",
    copy:
      "Boundary re-establishment and parcel mapping to registry standards using UAV imagery + GNSS control. Submission-ready documentation—fast turnaround.",
    img: "/placeholders/cadastral.jpg",
    tags: ["Parcels", "Registry", "Compliance"],
    deliverables: ["Parcel maps & coordinates", "Orthomosaics", "Area statements"],
    benefits: ["Fewer site visits", "Legally defensible", "Rapid filings", "Lower survey cost"],
  },
  {
    id: "volumetric",
    title: "Volumetric Analysis",
    copy:
      "Repeatable flights create accurate 3D surfaces for stockpile measurement and cut/fill computation—reconciliation you can defend.",
    img: "/placeholders/volumetric.jpg",
    tags: ["Stockpiles", "Cut/Fill", "Audit"],
    deliverables: ["Toe/crest lines", "Solids & volume tables", "Variance reports"],
    benefits: ["Audit-ready numbers", "Cost control", "Material tracking", "Reduced disputes"],
  },
  {
    id: "digital-twinning",
    title: "Digital Twinning",
    copy:
      "Create living 3D replicas with photogrammetry/LiDAR; link IoT for condition monitoring and predictive maintenance across complex assets.",
    img: "/placeholders/digital-twin.jpg",
    tags: ["3D twin", "IoT-ready", "Streaming"],
    deliverables: ["Textured models (OBJ/GLB)", "Tiled 3D/2D layers", "Annotation datasets"],
    benefits: ["Proactive upkeep", "Shared context", "Less downtime", "Better planning"],
  },
  {
    id: "urban-planning",
    title: "Urban Planning",
    copy:
      "City-scale, high-resolution basemaps with footprints, mobility layers and land-use classifications for data-driven zoning and resilient growth.",
    img: "/placeholders/urban.jpg",
    tags: ["Footprints", "Mobility", "Land-use"],
    deliverables: ["Tiled orthos", "3D urban models", "Land-use/vegetation indices"],
    benefits: ["Evidence-based plans", "Stakeholder clarity", "Faster studies", "Future-ready datasets"],
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function SurveyingMappingPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* ───────────── Hero ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            DGCA-Compliant UAV Operations
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Surveying &amp; Mapping
          </h1>

          <p className="mt-4 text-lg text-neutral-600">
            Drone-powered surveys that deliver <strong>cm-level accuracy</strong>, rapid
            turnarounds, and <strong>CAD-ready outputs</strong>. From terrain models to
            city-scale planning, we turn aerial data into actionable insight.
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
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Licensed pilots
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Insurance-ready
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Secure workflows
            </span>
          </div>
        </div>

        {/* Hero image placeholder (swap later) */}
        <div className="mt-10 md:mt-0">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 ring-1 ring-neutral-200 shadow-sm flex items-center justify-center text-neutral-400">
            <span className="text-sm">[ Hero Image Placeholder ]</span>
          </div>
        </div>
      </section>

      {/* ───────────── Capabilities (Alternating rows) ───────────── */}
      <CapabilitiesSection />

      {/* ───────────── FAQ ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FAQ
            q="Are your flights DGCA compliant?"
            a="Yes. Certified pilots operate under DGCA guidelines. Permissions and documentation are shared with clients."
          />
          <FAQ
            q="How accurate are outputs?"
            a="Typical surveys achieve 2–5 cm horizontal and 3–8 cm vertical accuracy with ground control."
          />
          <FAQ
            q="What deliverables can I expect?"
            a="We provide CAD drawings, GIS layers, 3D point clouds, orthomosaics, DEM/DSM, and QA reports."
          />
          <FAQ
            q="Do you work in difficult terrains?"
            a="Yes. We operate in forests, urban areas, and brownfields with custom flight planning and smaller UAVs."
          />
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">Ready to map smarter?</h3>
          <p className="mt-2 opacity-90">
            Share your site boundary and deliverable list—our team will send a tailored
            plan and quote.
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

/* ───────────────────────── Sections & Reusable Blocks ───────────────────────── */

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-5 py-16">
      <header className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">Capabilities</h2>
        <p className="mt-2 text-neutral-600">
          Mix and match the modules you need. From <strong>boundary surveys</strong> to{" "}
          <strong>urban planning datasets</strong>, each workflow is tailored to
          engineering, mining, construction, and government needs.
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
/* One row: image + text (alternating). NO CTA here by design. */
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
        {/* Optional tags */}
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

        {/* Deliverables & Benefits */}
        {(cap.deliverables?.length || cap.benefits?.length) && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {cap.deliverables?.length ? (
              <div className="rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm hover:shadow-md transition">
                <h4 className="text-sm font-semibold text-neutral-800">
                  Deliverables
                </h4>
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