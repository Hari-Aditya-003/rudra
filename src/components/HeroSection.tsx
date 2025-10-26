// src/components/HeroSection.tsx
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden">
      {/* Background image */}
      <img
        src="/hero.jpg"
        alt="Drone at sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content aligned right */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="ml-auto max-w-3xl text-right pt-28 md:pt-36">
          <h1
            className="font-extrabold tracking-tight text-white/95 leading-[1.05]
                       text-[40px] md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 6px 24px rgba(0,0,0,.35)" }}
          >
            <span className="block">Aerial Intelligence.</span>
            <span className="block bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
              Real Results.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed">
            Transform your operations with enterprise-grade drone solutions and
            AI-powered aerial data analytics
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            {["24hr Data Turnaround", "DGCA Certified", "10+ Industries"].map(
              (label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-sm text-white shadow-sm backdrop-blur-sm"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  {label}
                </span>
              )
            )}
          </div>

          {/* CTA Button (only one now) */}
          <div className="mt-8 flex justify-end">
            <button className="group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3
                               font-semibold text-white shadow-lg
                               bg-gradient-to-r from-blue-600 to-emerald-500
                               hover:from-blue-700 hover:to-emerald-600 transition-all">
              <span>Book Demo</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border-2 border-white/50">
          <div className="mx-auto mt-2 h-3 w-1 animate-pulse rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}