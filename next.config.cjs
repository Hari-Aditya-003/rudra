/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },

  // ✅ Skip ESLint & TypeScript errors during production builds
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  turbopack: { root: __dirname },
};
