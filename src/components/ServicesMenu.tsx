"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, Plus, X, Search } from "lucide-react";

/* ------------------------- Data ------------------------- */

type Sub = { id: string; label: string };
type Category = { id: string; label: string; children?: Sub[] };

const CATEGORIES: Category[] = [
  {
    id: "surveying-mapping",
    label: "Surveying & Mapping",
    children: [
      { id: "topographical", label: "Topographical Survey" },
      { id: "gis", label: "GIS Services" },
      { id: "photogrammetry", label: "Aerial Photogrammetry" },
      { id: "lidar", label: "LIDAR Survey" },
      { id: "thermal", label: "Thermal Mapping" },
      { id: "bim", label: "BIM" },
      { id: "gpr", label: "GPR (Ground-penetrating Radar)" },
      { id: "bathymetric", label: "Bathymetric Survey" },
      { id: "cadastral", label: "Cadastral Survey" },
      { id: "volumetric", label: "Volumetric Analysis" },
      { id: "digital-twinning", label: "Digital Twinning" },
      { id: "urban", label: "Urban Planning" },
    ],
  },
  {
    id: "photography",
    label: "Photography & Videography",
    children: [
      { id: "aerial", label: "Aerial Photography" },
      { id: "progressive", label: "Progressive Photography" },
      { id: "telemetry", label: "Telemetry Videography" },
    ],
  },
  {
    id: "inspections",
    label: "Drone Inspections",
    children: [
      { id: "facade", label: "Facade Inspections" },
      { id: "industrial", label: "Industrial Inspections" },
      { id: "solar", label: "Solar Inspections" },
    ],
  },
  {
    id: "land",
    label: "Land Surveying",
    children: [
      { id: "boundary", label: "Boundary Surveying" },
      { id: "contour", label: "Contour Surveying" },
      { id: "topography", label: "Topography Surveying" },
    ],
  },
  { id: "enterprise", label: "Enterprise Solutions" },
  { id: "industries", label: "Industry Verticals" },
  {
    id: "agriculture",
    label: "Agriculture Solutions",
    children: [
      { id: "crop", label: "Crop Management" },
      { id: "soil", label: "Soil & Water Management" },
      { id: "livestock", label: "Livestock Management" },
      { id: "planting", label: "Planting & Reforestation" },
      { id: "harvesting", label: "Harvesting & Post-Harvest" },
    ],
  },
  {
    id: "defence",
    label: "Defence & Security",
    children: [
      { id: "target", label: "Target Acquisition & Tracking" },
      { id: "combat", label: "Combat Support" },
      { id: "strike", label: "Strike Operations" },
      { id: "logistics", label: "Logistics & Supply" },
      { id: "ammo", label: "Ammunition Drop & Payload Delivery" },
    ],
  },
];

/* ---------------------- Component ----------------------- */

export default function ServicesMenu({ align = "right" }: { align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return CATEGORIES;
    return CATEGORIES.map(c => {
      const matchCat = c.label.toLowerCase().includes(term);
      const kids = c.children?.filter(s => s.label.toLowerCase().includes(term)) ?? [];
      if (matchCat || kids.length) return { ...c, children: kids.length ? kids : c.children };
      return null;
    }).filter(Boolean) as Category[];
  }, [q]);

  function toggleMenu() {
    if (btnRef.current) setBtnRect(btnRef.current.getBoundingClientRect());
    setOpen(v => !v);
  }

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const sync = () => btnRef.current && setBtnRect(btnRef.current.getBoundingClientRect());

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);

    const t = setTimeout(() => firstLinkRef.current?.focus(), 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [open]);

  const margin = 10;
  const width =
    typeof window !== "undefined" ? Math.min(620, window.innerWidth * 0.96) : 620;
  const top = (btnRect?.bottom ?? 0) + margin;
  let left = margin;
  if (btnRect && typeof window !== "undefined") {
    left =
      align === "right"
        ? Math.max(margin, Math.min(btnRect.right - width, window.innerWidth - width - margin))
        : Math.max(margin, Math.min(btnRect.left, window.innerWidth - width - margin));
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggleMenu}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-neutral-800 hover:text-neutral-950"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Our Services
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[1000] bg-black/0" />

            <div
              ref={panelRef}
              className="fixed z-[1001] w-[min(96vw,620px)] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl backdrop-blur"
              style={{ top, left }}
              role="menu"
              aria-label="Our Services"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-neutral-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700">
                  Explore
                </span>
                <div className="relative ml-auto hidden sm:block">
                  <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search services…"
                    className="w-[220px] rounded-md border border-neutral-200 bg-white pl-8 pr-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 hover:bg-neutral-100"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[70vh] overflow-auto px-4 py-4">
                <ul className="space-y-4">
                  {filtered.map((c, i) => {
                    const hasKids = !!c.children?.length;
                    const isOpen = !!expanded[c.id];
                    return (
                      <li key={c.id} className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/services/${c.id}`}
                            ref={i === 0 ? firstLinkRef : undefined}
                            className="text-[17px] font-semibold text-neutral-900 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 rounded"
                            onClick={() => setOpen(false)}
                          >
                            {c.label}
                          </Link>

                          {hasKids && (
                            <button
                              onClick={() =>
                                setExpanded(s => ({ ...s, [c.id]: !s[c.id] }))
                              }
                              className="ml-auto inline-flex items-center rounded-md border border-neutral-200 px-2 py-1 text-neutral-700 hover:bg-neutral-50"
                              aria-expanded={isOpen}
                              aria-label={`Toggle sub-services for ${c.label}`}
                            >
                              <Plus className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                            </button>
                          )}
                        </div>

                        {hasKids && isOpen && (
                          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {c.children!.map(s => (
                              <li key={s.id}>
                                <Link
                                  href={`/services/${c.id}#${s.id}`}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-md px-2 py-1.5 text-[14px] text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                                >
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile search */}
                <div className="mt-4 sm:hidden">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search services…"
                      className="w-full rounded-md border border-neutral-200 bg-white pl-8 pr-2 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
