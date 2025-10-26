/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },

  // ✅ Skip ESLint and TypeScript during production builds
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  turbopack: { root: __dirname },
};
