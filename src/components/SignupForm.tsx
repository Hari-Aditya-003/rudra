"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupForm() {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    if (!phone.trim()) return setErr("Phone is required.");
    if (pass !== confirm) return setErr("Passwords do not match.");

    try {
      // 1) Create account in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, pass);

      // 2) Sync to your backend/DB (Prisma User row)
      const name = `${firstName} ${lastName}`.trim();
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass, phone }),
      });

      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data?.error ?? "Signup sync failed");
      }

      // go to account or dashboard
      window.location.href = "/account";
    } catch (e: any) {
      setErr(`Error: ${e?.code ?? e?.message ?? "signup_failed"}`);
    }
  }

  return (
    <div className="space-y-3">
      {err && <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirst(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLast(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
        </div>

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <button className="w-full rounded bg-slate-900 px-4 py-2 text-white">Create account</button>
      </form>
    </div>
  );
}