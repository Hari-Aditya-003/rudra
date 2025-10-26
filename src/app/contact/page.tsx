// src/app/contact/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* ───────── Hero ───────── */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-16 px-5 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Contact Us</h1>
        <p className="mt-2 max-w-2xl mx-auto text-emerald-100">
          Have questions about our drone solutions? We’d love to hear from you.
        </p>
      </section>

      {/* ───────── Content ───────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 grid gap-12 md:grid-cols-2 items-stretch">
        {/* Left: Form */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm flex flex-col justify-center">
          <h2 className="text-xl font-bold">Send us a message</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Fill out the form and we’ll get back within 1 business day.
          </p>

          <form action="#" method="POST" className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">Message</label>
              <textarea
                rows={4}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="Tell us about your site, deliverables, or timeline…"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Send Message
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right: Background handset with perfectly aligned overlay card */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background image — pinned so the handset sits left; room for card on right */}
          <div
            className="
              relative h-[380px] md:h-full min-h-[380px]
              bg-[url('/contact-phone.jpg')] bg-cover
              bg-[position:70%_center]     /* keeps handset toward left */
              ring-1 ring-neutral-200 shadow-sm rounded-2xl
            "
          >
            {/* Soft gradient for readability (left darker, right lighter) */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/50 via-white/10 to-white/0" />

            {/* Overlay card anchored to the right */}
            <div className="absolute inset-0 grid items-center justify-end px-5 sm:px-8 md:px-10">
              <div
                className="
                  w-full max-w-[420px]
                  rounded-2xl bg-white/95 backdrop-blur
                  p-6 md:p-7 shadow-xl sm:mx-auto md:mx-0
                "
                style={{
                  boxShadow:
                    "0 10px 25px -8px rgba(16,24,40,0.25), 0 3px 10px -6px rgba(16,24,40,0.25)",
                }}
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-emerald-700">
                  Let’s talk
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                  Reach us via phone or email. Our support team responds quickly.
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-2 text-neutral-900 hover:text-emerald-700"
                  >
                    <Phone className="h-4 w-4 text-emerald-600" />
                    +91 12345 67890
                  </a>
                  <a
                    href="mailto:hello@yourcompany.com"
                    className="flex items-center gap-2 text-neutral-900 hover:text-emerald-700"
                  >
                    <Mail className="h-4 w-4 text-emerald-600" />
                    hello@yourcompany.com
                  </a>
                </div>

                <div className="mt-4 text-xs text-neutral-500">
                  Prefer WhatsApp?{" "}
                  <Link
                    href="/contact#whatsapp"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    Ping us here
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}