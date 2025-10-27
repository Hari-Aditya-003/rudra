"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, phone, email, password, confirm } = form;

    if (!phone.trim()) return setError("Phone is required.");
    if (password !== confirm) return setError("Passwords do not match.");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const name = `${firstName} ${lastName}`.trim();
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Signup failed");
      }

      window.location.href = "/account";
    } catch (e: any) {
      setError(`Error: ${e?.code ?? e?.message ?? "signup_failed"}`);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <Input
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="confirm"
        placeholder="Confirm password"
        value={form.confirm}
        onChange={handleChange}
        required
      />

      <Button type="submit" className="w-full">
        Create account
      </Button>
    </form>
  );
}
