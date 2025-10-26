/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";

const NAVY = "#0B1F44";        // primary background
const NAVY_SOFT = "#132B57";   // panel/controls
const LINE = "#1E376B";        // dividers
const ACCENT = "#F97316";      // orange
const ACCENT_HOVER = "#EA580C";

/** Header-style wordmark, sized for footer and tuned for dark bg */
function RudraWordmark({
  accent = ACCENT,
  onDark = true,
  className = "",
}: {
  accent?: string;
  onDark?: boolean;
  className?: string;
}) {
  const aviationColor = onDark ? "rgba(255,255,255,0.96)" : "#111827";

  return (
    <div
      className={`relative select-none leading-none ${className}`}
      aria-label="AAA–RUDRA Aviation"
    >
      {/* soft aura */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(249,115,22,0.22), rgba(249,115,22,0.06) 42%, transparent 70%)",
        }}
      />
      {/* grid layout to position three lines exactly like the header */}
      <div className="grid grid-cols-[auto_auto] grid-rows-2 items-end">
        {/* RUDRA */}
        <span
          className="row-span-2 font-extrabold tracking-[0.01em]"
          style={{
            color: accent,
            fontSize: "32px",
            lineHeight: 1,
            textShadow: "0 2px 10px rgba(249,115,22,0.25)",
          }}
        >
          RUDRA
        </span>

        {/* Drone (top-right, slightly above baseline) */}
        <span
          className="col-start-2 -mb-0.5 font-semibold"
          style={{ color: accent, fontSize: "18px", lineHeight: 1 }}
        >
          Drone
        </span>

        {/* Aviation (bottom-right, spaced letters) */}
        <span
          className="col-start-2 mt-0.5 font-medium"
          style={{
            color: aviationColor,
            fontSize: "16px",
            letterSpacing: "0.32em",
            textShadow: "0 2px 8px rgba(0,0,0,0.35)",
          }}
        >
          Aviation
        </span>
      </div>
    </div>
  );
}

/** White rounded box with soft orange glow around the wordmark */
function LogoCard({ className = "" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* soft outer aura */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.18), transparent 60%)",
        }}
      />
      {/* white card */}
      <div
        className="glow relative inline-block rounded-2xl bg-white/98 px-4 py-3"
        style={{
          border: `2px solid ${ACCENT}`,
          boxShadow:
            "0 10px 28px rgba(249,115,22,0.14), 0 2px 0 rgba(17,24,39,0.04)",
        }}
      >
        <RudraWordmark onDark={false} />
      </div>

      {/* gentle breathing glow (remove .glow class if you don't want animation) */}
      <style jsx>{`
        @keyframes softPulse {
          0%, 100% {
            box-shadow: 0 10px 28px rgba(249,115,22,0.14), 0 2px 0 rgba(17,24,39,0.04);
          }
          50% {
            box-shadow: 0 14px 34px rgba(249,115,22,0.22), 0 2px 0 rgba(17,24,39,0.04);
          }
        }
        .glow { animation: softPulse 4.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 text-white">
      {/* ===== Top navy section (pattern background) ===== */}
      <section
        className="relative isolate"
        style={{
          backgroundColor: NAVY,
          backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0, rgba(255,255,255,.06) 2px, transparent 2px, transparent 16px)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
          {/* Headline row */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h3 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              <span className="opacity-90">Let’s </span>
              <span style={{ color: ACCENT }}>Connect </span>
              <span className="opacity-90">there</span>
            </h3>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-md transition"
              style={{ background: ACCENT }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  ACCENT_HOVER)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  ACCENT)
              }
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* divider */}
          <div
            className="my-6 h-px w-full"
            style={{ backgroundColor: LINE, opacity: 0.8 }}
          />

          {/* 4-column content */}
          <div className="grid gap-10 md:grid-cols-12">
            {/* Brand + blurb + socials */}
            <div className="md:col-span-4">
              <Link href="/" className="inline-block">
                <LogoCard className="scale-95" />
              </Link>

              <p className="mt-3 max-w-md text-sm text-slate-200/85">
                We deliver DGCA-compliant drone capture and CAD/BIM/GIS-ready
                deliverables across surveying, inspections, agriculture, and
                defence.
              </p>

              <div className="mt-5 flex items-center gap-2">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Youtube, href: "#" },
                  { Icon: Instagram, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-slate-200/90 transition"
                    style={{ borderColor: LINE, backgroundColor: NAVY }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = ACCENT;
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = NAVY;
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = LINE;
                    }}
                    aria-label="social-link"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-xl font-semibold">Navigation</h4>
              <ul className="mt-4 space-y-2 text-slate-200/90">
                <FooterLink href="/team">Our Team</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/testimonials">Testimonial</FooterLink>
                <FooterLink href="/faq">FAQs</FooterLink>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <h4 className="text-xl font-semibold">Contact</h4>
              <ul className="mt-4 space-y-3 text-slate-200/90">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 opacity-70" />
                  (000) 000-0000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 opacity-70" />
                  example@gmail.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 opacity-70" />
                  2464 Royal Ln. Mesa, <br /> New Jersey 45463
                </li>
              </ul>
            </div>

            {/* Subscribe */}
            <div className="md:col-span-2">
              <h4 className="text-xl font-semibold">
                Get the latest information
              </h4>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex overflow-hidden rounded-full"
                aria-label="Email subscribe"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 text-sm text-white placeholder:text-slate-300 outline-none"
                  style={{ background: NAVY_SOFT, border: `1px solid ${LINE}` }}
                />
                <button
                  className="grid place-items-center px-4 text-white"
                  style={{ background: ACCENT }}
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom orange legal bar ===== */}
      <section style={{ background: ACCENT }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-4 text-sm md:flex-row md:items-center">
          <p className="text-white/95">
            © {new Date().getFullYear()} RUDRA. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="text-white/95 hover:underline">
              User Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="text-white/95 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}

/* ---------- helpers ---------- */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="hover:underline">
        {children}
      </Link>
    </li>
  );
}