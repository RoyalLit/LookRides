import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress Turbopack root warning for monorepo-like setups
  turbopack: {
    root: process.cwd(),
  },

  // Performance: compress responses
  compress: true,

  // Images: allow remote domains + optimize
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Security & SEO headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: cspValue },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
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

  // SEO: www → non-www, trailing slash cleanup, WordPress ghost URL cleanup
  async redirects() {
    return [
      // www → bare domain (fixes "Page with redirect" GSC issue)
      // Note: www redirects are typically also handled at DNS/Vercel level
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.lookrides.com' }],
        destination: 'https://lookrides.com/$1',
        permanent: true,
      },
      // Trailing-slash cleanup: /contact/ → /contact, /blog/ → /blog
      {
        source: '/:slug([^/]+)/',
        destination: '/:slug',
        permanent: true,
      },
      // Trailing-slash cleanup for nested paths: /blog/slug/ → /blog/slug
      {
        source: '/:section([^/]+)/:slug([^/]+)/',
        destination: '/:section/:slug',
        permanent: true,
      },
      // WordPress ghost paths — redirect to homepage
      {
        source: '/category/:path+',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wordpress/:path+',
        destination: '/',
        permanent: true,
      },
    ];
  },

};

const cspValue = process.env.NODE_ENV === 'development'
  ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://www.google-analytics.com https://*.cartocdn.com; connect-src 'self' https://*.supabase.co https://www.google-analytics.com; font-src 'self'; frame-src 'self';"
  : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://www.google-analytics.com https://*.cartocdn.com; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://photon.komoot.io https://api.razorpay.com; font-src 'self'; frame-src 'self' https://api.razorpay.com; base-uri 'self'; form-action 'self';";

export default nextConfig;
