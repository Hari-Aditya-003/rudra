// src/app/auth/page.tsx  (client)
"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function establishSession(idToken: string) {
    const res = await fetch("/api/session/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error("Server session failed");
  }

  async function handleEmailLogin() {
    setBusy(true); setMsg(null);
    try {
      const r = await signInWithEmailAndPassword(auth, email, password);
      const token = await r.user.getIdToken();
      await establishSession(token);
      window.location.href = "/events";
    } catch (e: any) {
      // If user not found, create it
      if (e?.code === "auth/invalid-credential" || e?.code === "auth/user-not-found") {
        try {
          const r2 = await createUserWithEmailAndPassword(auth, email, password);
          const token = await r2.user.getIdToken();
          await establishSession(token);
          window.location.href = "/events";
          return;
        } catch (e2: any) {
          setMsg(e2?.message || "Sign up failed");
        }
      } else {
        setMsg(e?.message || "Login failed");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true); setMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      const r = await signInWithPopup(auth, provider);
      const token = await r.user.getIdToken();
      await establishSession(token);
      window.location.href = "/events";
    } catch (e: any) {
      setMsg(e?.message || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    // client sign-out + tell server to clear cookie
    await fbSignOut(auth);
    await fetch("/api/session/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2 w-full"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button
        disabled={busy}
        onClick={handleEmailLogin}
        className="w-full p-2 rounded bg-blue-600 text-white"
      >
        {busy ? "Working..." : "Login / Create"}
      </button>

      <div className="text-center text-sm text-slate-500">or</div>

      <button
        disabled={busy}
        onClick={handleGoogle}
        className="w-full p-2 rounded bg-red-600 text-white"
      >
        {busy ? "Working..." : "Continue with Google"}
      </button>

      <button
        onClick={handleLogout}
        className="w-full p-2 rounded border"
      >
        Logout
      </button>

      {msg && <p className="text-sm text-red-600">{msg}</p>}
      <p className="text-xs text-slate-500">
        Make sure Email/Password sign-in is enabled and <b>localhost</b> is in Firebase Authorized domains.
      </p>
    </div>
  );
}