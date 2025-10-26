"use client";

import Image from "next/image";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function AboutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-gradient-to-b from-[#0E1117] via-[#0B1220] to-[#0E1117] text-white">
      {/* ========== HERO ========== */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-emerald-400">Hi!</span>
            <br />
            Welcome to <span className="text-emerald-400">RUDRA — Aviation</span>
          </h1>

          <div className="space-y-4 text-lg text-gray-300">
            <p>
              At <strong>RUDRA</strong>, we believe the sky is no longer the limit —
              it’s the beginning. We are a next-generation drone technology company
              committed to delivering enterprise-grade solutions that empower
              industries to <em>see</em>, <em>sense</em>, and <em>scale</em> like never
              before.
            </p>
            <p>
              From training pilots and testing advanced systems to seamless
              deployment in the field, our end-to-end ecosystem is designed to
              unlock the true potential of aerial intelligence.
            </p>
            <p>
              We proudly serve sectors such as agriculture, defense,
              infrastructure, and smart cities—delivering solutions that are not
              only technologically superior but also DGCA certified and industry
              compliant.
            </p>
            <p>
              What sets us apart is our fusion of AI-powered analytics and
              precision drone engineering. This enables us to transform complex
              challenges into actionable insights—whether it’s optimizing crop
              yields, enhancing tactical operations, or streamlining industrial
              inspections.
            </p>
          </div>
        </div>

        {/* Right image */}
        <div className="flex justify-center">
          <div className="rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden">
            <Image
              src="/about_us_hi.jpg" // public/about_us_hi.jpg
              alt="RUDRA drone"
              width={720}
              height={540}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========== AT OUR CORE ========== */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-10">
            At our core, <span className="text-emerald-400">RUDRA</span> stands for:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Innovation First" desc="Pushing boundaries with cutting-edge drone systems." />
            <Card title="Safety & Compliance" desc="Building trust through certified, secure operations." />
            <Card title="AI-Powered Intelligence" desc="Enabling data-driven decision-making at scale." />
            <Card title="Impact-Driven Solutions" desc="Delivering measurable value across 10+ industries." />
          </div>
        </div>
      </section>

      {/* ========== CONTACT US ========== */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left contact info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
            <p className="text-gray-300 mb-6">
              Reach us by phone, email, or by filling out the form. We usually
              respond within 24 hours.
            </p>
            <ul className="space-y-3 text-gray-200">
              <li>
                <span className="font-medium text-emerald-400">Address:</span>{" "}
                Bengaluru, India
              </li>
              <li>
                <span className="font-medium text-emerald-400">Phone:</span>{" "}
                +91 12345 67890
              </li>
              <li>
                <span className="font-medium text-emerald-400">Email:</span>{" "}
                hello@yourcompany.com
              </li>
            </ul>
          </div>

          {/* Right form */}
          <div className="bg-[#0F172A] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] border border-white/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field
                label="Name"
                type="text"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+91 98765 43210"
              />
              <div>
                <label className="block text-sm mb-1 text-gray-300">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Tell us a bit about your project…"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 font-semibold text-white hover:opacity-95 disabled:opacity-50 transition"
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>

              {status === "success" && (
                <p className="text-emerald-400 text-sm">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- tiny helpers ---------- */

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-emerald-500/25 transition">
      <h3 className="text-xl font-semibold text-emerald-400 mb-2">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  type: "text" | "email" | "tel";
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
  );
}