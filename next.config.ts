// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },

  // Skip ESLint & TS type errors during production builds
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  turbopack: { root: __dirname },
};

export default nextConfig;
