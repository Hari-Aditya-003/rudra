// src/app/not-found.tsx
"use client";

import Link from "next/link";
import { Wrench, Cog, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-5 text-white">
      <div className="text-center space-y-6">
        {/* Illustration */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          {/* slow spin using Tailwind arbitrary value */}
          <Cog className="h-24 w-24 text-indigo-400 animate-[spin_6s_linear_infinite]" />
          <Wrench className="absolute h-10 w-10 text-cyan-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">404</h1>
        <p className="text-lg text-slate-300">
          This page is under development or doesn’t exist yet.
        </p>
        <p className="text-sm text-slate-400">
          Our engineers are assembling the parts ⚙️ Please check back soon.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-700 transition"
        >
          <Home className="h-4 w-4" />
          Go back Home
        </Link>
      </div>
    </main>
  );
}