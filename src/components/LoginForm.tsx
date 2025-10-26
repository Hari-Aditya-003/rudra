"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase"; // ✅ from src/lib/firebase.ts
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Firebase client sign-in
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // Force refresh so custom claims (ADMIN) are included
      const idToken = await cred.user.getIdToken(true);

      // Tell the server to set the session cookie
      const r = await fetch("/api/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!r.ok) {
        throw new Error("Failed to start session");
      }

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full rounded border px-3 py-2"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full rounded border px-3 py-2"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 px-3 py-2 text-white"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}