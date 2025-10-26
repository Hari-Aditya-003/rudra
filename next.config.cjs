/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  // ✅ Skip lint & type errors in production builds
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  turbopack: { root: __dirname },
};
