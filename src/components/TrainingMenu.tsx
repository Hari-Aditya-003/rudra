// src/components/TrainingMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, Plus } from "lucide-react";

type Sub = { id: string; label: string; href?: string };
type Category = { id: string; label: string; href?: string; children?: Sub[] };

const TRAINING: Category[] = [
  {
    id: "on-field",
    label: "On-Field Action",
    href: "/training#on-field",
  },
  {
    id: "courses",
    label: "Courses",
    href: "/training#courses",
    children: [
      { id: "dgca-pilot", label: "DGCA Drone Pilot (Small/UAS)", href: "/training/courses#dgca-pilot" },
      { id: "mapping-gis", label: "Surveying, Photogrammetry & GIS", href: "/training/courses#mapping-gis" },
      { id: "industrial", label: "Industrial Inspections (Power/Oil & Gas)", href: "/training/courses#industrial" },
      { id: "agri-spraying", label: "Agriculture Spraying Ops", href: "/training/courses#agri-spraying" },
      { id: "advanced-fpv", label: "Advanced FPV / Kamikaze Ops", href: "/training/courses#advanced-fpv" },
    ],
  },
  {
    id: "schedule",
    label: "Schedule",
    href: "/training#schedule",
  },
  {
    id: "fees",
    label: "Fees & Financing",
    href: "/training#fees",
  },
  {
    id: "faqs",
    label: "FAQs",
    href: "/training#faqs",
  },
  {
    id: "admissions",
    label: "Contact Admissions",
    href: "/training#admissions",
  },
];

export default function TrainingMenu({ align = "right" as "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);

  const toggleMenu = () => {
    if (btnRef.current) setBtnRect(btnRef.current.getBoundingClientRect());
    setOpen((v) => !v);
  };

  const toggleCat = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const sync = () =>
      btnRef.current && setBtnRect(btnRef.current.getBoundingClientRect());

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [open]);

  const margin = 8;
  const width =
    typeof window !== "undefined" ? Math.min(560, window.innerWidth * 0.94) : 560;
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
      >
        Training
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[1000]" />
            <div
              ref={panelRef}
              className="fixed z-[1001] w-[min(94vw,560px)] rounded-2xl border border-black/10 bg-white shadow-2xl"
              style={{ top, left }}
            >
              <div className="flex items-center justify-between border-b px-5 py-3">
                <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Explore Training
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-1 text-neutral-500 hover:bg-neutral-50"
                >
                  ✕
                </button>
              </div>

              <div className="max-h-[70vh] overflow-auto p-6">
                <ul className="space-y-4">
                  {TRAINING.map((c) => {
                    const hasKids = !!c.children?.length;
                    const isOpen = !!expanded[c.id];
                    return (
                      <li key={c.id}>
                        <div className="flex items-center">
                          <Link
                            href={c.href ?? `/training#${c.id}`}
                            onClick={() => setOpen(false)}
                            className="text-[18px] font-medium text-neutral-900 hover:text-emerald-600"
                          >
                            {c.label}
                          </Link>

                          {hasKids && (
                            <button
                              onClick={() => toggleCat(c.id)}
                              className="ml-auto inline-flex items-center rounded-md border border-neutral-200 px-2 py-1 text-neutral-700 hover:bg-neutral-50"
                            >
                              <Plus className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                            </button>
                          )}
                        </div>

                        {hasKids && isOpen && (
                          <ul className="mt-3 ml-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {c.children!.map((s) => (
                              <li key={s.id}>
                                <Link
                                  href={s.href ?? `/training#${s.id}`}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-md px-2 py-1 text-[14px] text-neutral-700 hover:bg-neutral-100"
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
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}