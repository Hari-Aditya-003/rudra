"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Got a question, demo request, or partnership idea? We’d love to hear from you.
          </p>
        </div>

        {/* Card row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: details */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Get In Touch</h3>
            <p className="text-gray-600 mb-8">
              Reach us using the details below or send a message—we typically respond within 24 hours.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 grid place-items-center">
                  <MapPin size={20}/>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">RUDRA HQ, Bengaluru, IN</p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 grid place-items-center">
                  <Phone size={20}/>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone Number</p>
                  <p className="text-gray-600">+91 12345 67890</p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 grid place-items-center">
                  <Mail size={20}/>
                </div>
                <div>
                  <p className="font-medium text-gray-900">E-Mail</p>
                  <p className="text-gray-600">hello@yourcompany.com</p>
                </div>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-8">
              <p className="font-medium text-gray-900 mb-3">Follow Us:</p>
              <div className="flex gap-3">
                <a className="h-9 w-9 grid place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200" href="#" aria-label="Facebook"><Facebook size={18}/></a>
                <a className="h-9 w-9 grid place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200" href="#" aria-label="Twitter"><Twitter size={18}/></a>
                <a className="h-9 w-9 grid place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200" href="#" aria-label="Instagram"><Instagram size={18}/></a>
                <a className="h-9 w-9 grid place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200" href="#" aria-label="YouTube"><Youtube size={18}/></a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h3>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="How can we help?"
                />
              </div>

              <p className="text-xs text-gray-500">
                By submitting, you agree to the processing of your personal data as described in our Privacy Policy.
              </p>

              <button
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-60"
              >
                {status === "sending" ? "Submitting…" : "Submit"}
              </button>

              {status === "success" && (
                <p className="text-sm text-emerald-600">Thanks! We’ll get back to you shortly.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
          <iframe
            title="RUDRA Location"
            src="https://www.google.com/maps?q=Bengaluru&output=embed"
            className="w-full h-[340px] grayscale"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}