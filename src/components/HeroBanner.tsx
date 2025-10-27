"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string };

const ACCENT = "#F97316";
const ACCENT_HOVER = "#EA580C";

export default function HeroBanner({
  slides,
  headerOffset = 64,
  interval = 5000,
  children,
}: {
  slides: Slide[];
  headerOffset?: number;
  interval?: number;
  children?: ReactNode;
}) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);
  const startX = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(([e]) => (visibleRef.current = e.isIntersecting), { threshold: 0.25 });
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!hover && visibleRef.current) setI((p) => (p + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [hover, slides.length, interval]);

  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    setDragX(e.clientX - startX.current);
  };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    setDragX(0);
    if (Math.abs(delta) > 60) setI((p) => (delta < 0 ? (p + 1) % slides.length : (p - 1 + slides.length) % slides.length));
  };

  const H = `calc(100svh - ${headerOffset}px)`;

  return (
    <section
      ref={rootRef}
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      style={{ height: H }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(calc(${dragX}px - ${i * 100}%))` }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="relative h-full w-full shrink-0">
            <Image src={s.src} alt={s.alt ?? "hero"} fill priority={idx === 0} sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/35 backdrop-blur-[1.5px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent md:h-32" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent md:h-36" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
        <div className="mx-auto max-w-4xl text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]">{children}</div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 shadow-md transition hover:scale-105"
        style={{ background: ACCENT, color: "#fff" }}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => setI((p) => (p + 1) % slides.length)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 shadow-md transition hover:scale-105"
        style={{ background: ACCENT, color: "#fff" }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className="h-2.5 w-8 rounded-full transition"
            style={{ background: idx === i ? ACCENT : "rgba(255,255,255,.7)", boxShadow: idx === i ? `0 0 18px ${ACCENT}` : "none" }}
          />
        ))}
      </div>
    </section>
  );
}

export function HeroFeatureStrip({
  items,
}: {
  items: { icon: ReactNode; title: string; blurb: string }[];
}) {
  return (
    <div className="-mt-10 px-4 md:-mt-16">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white/95 p-5 shadow-xl ring-1 ring-black/5 backdrop-blur">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-200">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">{f.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{f.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
