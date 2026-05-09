import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance: compress responses
  compress: true,

  // Images: allow remote domains + optimize
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Security & SEO headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Redirect old WordPress-style URLs to new pages
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-fleet", destination: "/fleet", permanent: true },
      { key: "source", source: "/contact-us", destination: "/contact", permanent: true } as any,
    ].filter(r => !('key' in r));
  },
};

export default nextConfig;
