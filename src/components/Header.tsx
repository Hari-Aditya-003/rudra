"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Phone, Mail, Menu, X } from "lucide-react";
import NewsTicker from "./NewsTicker";
import ServicesMenu from "@/components/ServicesMenu";
import TrainingMenu from "@/components/TrainingMenu";
import LanguageMenu from "@/components/LanguageMenu";

type Me = { id: string; role: "USER" | "ADMIN" } | null;

/* ── Brand (light) ───────────────────────────────────────────── */
const NAVY = "#0D2348";
const STRIPE = "rgba(255,255,255,0.07)";
const NAV_BG = "rgba(255,255,255,.78)";
const ACCENT = "#F97316";
const ACCENT_HOVER = "#EA580C";

const TOPBAR_STYLE: React.CSSProperties = {
  backgroundColor: NAVY,
  backgroundImage: `
    repeating-linear-gradient(
      -45deg,
      ${STRIPE},
      ${STRIPE} 2px,
      transparent 2px,
      transparent 14px
    )
  `,
};

export default function Header() {
  const [me, setMe] = useState<Me>(null);
  const [open, setOpen] = useState(false);
  const isAdmin = me?.role === "ADMIN";

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        const data = await r.json();
        setMe(data.user ?? null);
      } catch {}
    })();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div style={TOPBAR_STYLE} className="text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+911234567890" className="inline-flex items-center gap-1 hover:opacity-90">
              <Phone className="h-4 w-4 opacity-90" />
              <span>+91 12345 67890</span>
            </a>
            <a href="mailto:hello@yourcompany.com" className="hidden sm:inline-flex items-center gap-1 hover:opacity-90">
              <Mail className="h-4 w-4 opacity-90" />
              <span>hello@yourcompany.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageMenu pillColor={NAVY} />
            {me ? (
              <div className="flex items-center gap-3">
                {isAdmin && <Link href="/dashboard" className="hover:underline">Admin</Link>}
                <Link href="/account" className="hover:underline">Account</Link>
                <form action="/api/logout" method="post"><button className="hover:underline">Logout</button></form>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hover:underline">Login</Link>
                <span className="opacity-60">/</span>
                <Link href="/signup" className="hover:underline">Sign up</Link>
              </div>
            )}
            <Link href="/cart" aria-label="Cart" className="ml-1 inline-flex hover:opacity-90">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className="border-b backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-[0_4px_16px_rgba(2,6,23,0.05)]"
        style={{ background: NAV_BG }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center gap-4">
            {/* Logo */}
            <Link href="/" aria-label="AAA–RUDRA Aviation" className="mr-auto flex items-center">
              <div className="relative grid grid-cols-[auto_auto] grid-rows-2 items-end leading-none select-none">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-xl blur-xl"
                  style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.22), rgba(249,115,22,0.06) 42%, transparent 70%)" }}
                />
                <span
                  className="row-span-2 font-extrabold tracking-[0.01em] text-[26px] md:text-[32px] lg:text-[34px]"
                  style={{ color: ACCENT, textShadow: "0 2px 10px rgba(249,115,22,0.25)" }}
                >
                  RUDRA
                </span>
                <span className="col-start-2 -mb-0.5 font-semibold text-[15px] md:text-[18px]" style={{ color: ACCENT }}>
                  Drone
                </span>
                <span className="col-start-2 mt-0.5 font-medium text-neutral-900 tracking-[0.32em] text-[13px] md:text-[15px]">
                  Aviation
                </span>
              </div>
              <span className="sr-only">AAA–RUDRA Aviation</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1.5 md:flex">
              <NavLink href="/about" accent={ACCENT}>About Us</NavLink>
              <ServicesMenu align="right" />
              <TrainingMenu />
              <NavLink href="/store" accent={ACCENT}>Store</NavLink>
              <NavLink href="/blogs" accent={ACCENT}>Blogs</NavLink>
            </nav>

            {/* Mobile toggle */}
            <button
              className="ml-2 inline-flex items-center justify-center rounded p-2 hover:bg-blue-500/10 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t bg-white md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="grid gap-1 text-neutral-800">
                <MobileItem href="/about" onClick={() => setOpen(false)}>About Us</MobileItem>
                <MobileItem href="/services" onClick={() => setOpen(false)}>Our Services</MobileItem>
                <MobileItem href="/training" onClick={() => setOpen(false)}>Training</MobileItem>
                <MobileItem href="/store" onClick={() => setOpen(false)}>Store</MobileItem>
                <MobileItem href="/blogs" onClick={() => setOpen(false)}>Blogs</MobileItem>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* News Ticker */}
      <NewsTicker
        background={ACCENT}
        textColor="#fff"
        items={[
          "DGCA Certified Training Now Open",
          "New: DJI Agras Service Centers in 6 Cities",
          "24hr Data Turnaround on Enterprise Plans",
        ]}
      />
    </header>
  );
}

function NavLink({ href, children, accent }: { href: string; children: React.ReactNode; accent: string }) {
  return (
    <Link href={href} className="group relative px-3.5 md:px-4 py-2 text-sm font-medium text-neutral-900 hover:text-neutral-950">
      {children}
      <span className="pointer-events-none absolute inset-x-3.5 -bottom-[2px] h-[2px] scale-x-0 transition-transform duration-200 group-hover:scale-x-100" style={{ background: accent }} />
    </Link>
  );
}

function MobileItem({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return <Link href={href} onClick={onClick} className="rounded px-2 py-2 hover:bg-neutral-100 active:bg-neutral-200">{children}</Link>;
}
