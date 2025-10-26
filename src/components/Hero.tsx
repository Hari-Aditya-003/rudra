// src/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useT } from "@/components/i18n/MessagesProvider"; // <- use translations

export default function Hero() {
  const t = useT();
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  // subtle parallax for the background overlay
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"            // put your image in /public/hero.jpg
          alt={t("hero.bgAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient & vignette */}
      <div
        ref={parallaxRef}
        className="pointer-events-none absolute inset-0 -z-10 transition-transform duration-200"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 ring-1 ring-black/10" />
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)] bg-black/30" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
            {t("hero.h1.line1")}
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">
              {t("hero.h1.line2")}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-slate-200/90 text-base sm:text-lg">
            {t("hero.subtitle")}
          </p>

          {/* Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>✅ {t("hero.badge.turnaround")}</Badge>
            <Badge>✅ {t("hero.badge.dgca")}</Badge>
            <Badge>✅ {t("hero.badge.industries")}</Badge>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-emerald-400 transition"
            >
              {t("cta.bookDemo")}
              <svg viewBox="0 0 24 24" className="ml-2 h-4 w-4" fill="currentColor">
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </Link>

            <Link
              href="/#solutions"
              className="inline-flex items-center rounded-md border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition"
            >
              {t("cta.exploreServices")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="relative h-10 w-6 rounded-full border border-white/30">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur ring-1 ring-white/15">
      {children}
    </span>
  );
}