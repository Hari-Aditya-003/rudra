"use client";

import React from "react";
import { useRouter } from "next/navigation";

export type Messages = Record<string, string>;

type Ctx = {
  locale: string;
  messages: Messages;
  t: (key: string) => string;
  setLocale: (next: string) => Promise<void>;
};

const I18nCtx = React.createContext<Ctx | null>(null);

export default function MessagesProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const t = React.useCallback(
    (key: string) => messages[key] ?? key,
    [messages]
  );

  const setLocale = React.useCallback(
    async (next: string) => {
      // persist in cookie (server will read it) and refresh UI
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    },
    [router]
  );

  return (
    <I18nCtx.Provider value={{ locale, messages, t, setLocale }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useT() {
  const ctx = React.useContext(I18nCtx);
  if (!ctx) throw new Error("useT must be used within <MessagesProvider>");
  return ctx.t;
}

export function useI18n() {
  const ctx = React.useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within <MessagesProvider>");
  return ctx;
}