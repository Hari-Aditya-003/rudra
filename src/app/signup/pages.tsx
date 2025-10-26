"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", phone: "", place: "", email: "", password: "" });
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = "/events";
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg(j.error || "Signup failed");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={handleSignup} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Full name"
               value={form.name} onChange={onChange("name")} />
        <input className="w-full border rounded px-3 py-2" placeholder="Phone (optional)"
               value={form.phone} onChange={onChange("phone")} />
        <input className="w-full border rounded px-3 py-2" placeholder="Place (optional)"
               value={form.place} onChange={onChange("place")} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
               value={form.email} onChange={onChange("email")} />
        <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password"
               value={form.password} onChange={onChange("password")} />
        <button className="w-full bg-emerald-600 text-white rounded px-3 py-2">
          Create account
        </button>
      </form>
      {msg && <p className="text-sm text-red-600">{msg}</p>}
    </main>
  );
}