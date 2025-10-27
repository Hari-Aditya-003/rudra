/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string; caption?: string };

const ACCENT = "#F97316";     // orange-500

export default function BannerCarousel({
  slides,
  interval = 4500,
  className = "",
  height = { base: 260, md: 360, lg: 480 },
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  height?: { base: number; md: number; lg: number };
}) {
  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const root = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!root.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(root.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hovered) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setI((p) => (p + 1) % slides.length), interval);
    return () => timer.current && clearTimeout(timer.current);
  }, [i, hovered, visible, interval, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function next() {
    setI((p) => (p + 1) % slides.length);
  }

  function prev() {
    setI((p) => (p - 1 + slides.length) % slides.length);
  }

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    setDragX(e.clientX - startX.current);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    setDragX(0);
    if (Math.abs(delta) > 60) (delta < 0 ? next : prev)();
  };

  const h = height;

  return (
    <div
      ref={root}
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{ height: h.base }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="region"
      aria-roledescription="carousel"
      aria-label="Landing banner"
    >
      <style jsx>{`
        @media (min-width: 768px) {
          div[data-banner-root] { height: ${h.md}px !important; }
        }
        @media (min-width: 1024px) {
          div[data-banner-root] { height: ${h.lg}px !important; }
        }
      `}</style>

      <div data-banner-root className="absolute inset-0" />

      <div
        className="absolute inset-0 flex select-none transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(calc(${dragX}px - ${i * 100}%))` }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="relative h-full w-full shrink-0">
            <Image
              src={s.src}
              alt={s.alt ?? "banner"}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
            {(s.caption || s.alt) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-6">
                <div
                  className="inline-flex max-w-[90%] items-center rounded-lg px-3 py-1.5 text-white backdrop-blur"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,.55), rgba(0,0,0,.25))",
                  }}
                >
                  <span className="text-sm md:text-base font-semibold">
                    {s.caption ?? s.alt}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-md transition hover:scale-105"
        style={{ background: ACCENT, color: "#fff" }}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-md transition hover:scale-105"
        style={{ background: ACCENT, color: "#fff" }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => {
          const active = idx === i;
          return (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className="h-2.5 w-8 rounded-full transition"
              style={{
                background: active ? ACCENT : "rgba(255,255,255,.65)",
                boxShadow: active ? `0 0 18px ${ACCENT}` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
