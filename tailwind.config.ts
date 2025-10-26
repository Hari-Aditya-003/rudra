// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:  "#0B0B0D",   // near-black (header/top bar)
          mid:   "#14161A",   // page bg / card contrast
          red:   "#D21F26",   // primary accent (matches logo crimson)
          red2:  "#B5161C",   // darker hover/red gradient stop
          gray:  "#1C1F25",   // deep gray surfaces
          light: "#F4F5F7",   // app light background
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,.10)",
        cardHover: "0 10px 30px rgba(0,0,0,.16)",
      },
      ringColor: {
        brand: "#D21F26",
      },
    },
  },
  plugins: [],
};

export default config;