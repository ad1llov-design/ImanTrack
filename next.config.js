/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: false, // Let user choose when to update (SWUpdatePrompt handles this)
  disable: process.env.NODE_ENV === "development",
  cleanupOutdatedCaches: true,
  runtimeCaching: [
    {
      // Pages: always try network first
      urlPattern: /^\/(dashboard|hadith|adhkar|sunnah|quran|prayer|profile|stats).*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
        networkTimeoutSeconds: 5,
      },
    },
    {
      // API & Supabase: never cache
      urlPattern: /^https:\/\/.*supabase\.co\/.*/,
      handler: "NetworkOnly",
    },
    {
      // Static assets (JS, CSS, fonts, images)
      urlPattern: /\.(?:js|css|woff2?|png|jpg|jpeg|svg|gif|ico|webp|avif)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      // Everything else
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "others",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24, // 1 day
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cdn.quran.com",
      },
      {
        protocol: "https",
        hostname: "quran.com",
      }
    ],
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=()",
        },
      ],
    },
  ],
};

module.exports = withPWA(nextConfig);
