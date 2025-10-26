// src/components/LanguageMenu.tsx
"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

type Props = { pillColor?: string };

export default function LanguageMenu(props: Props) {
  // destructure after, so SWC never parses a typed-destructured param
  const { pillColor = "#0B0B0D" } = props;

  // keep the state simple to avoid any parsing quirks
  const [label, setLabel] = useState<"English" | "Hindi">("English");

  return (
    <button
      onClick={() => setLabel((l) => (l === "English" ? "Hindi" : "English"))}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white"
      style={{ background: pillColor, boxShadow: "0 0 0 2px #fff4" }}
      aria-label="Switch language"
      title="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}