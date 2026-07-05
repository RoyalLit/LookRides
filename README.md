# LookRides 🚖 | Premium Intercity Taxi Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-45BA4B?style=flat-square&logo=playwright)](https://playwright.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

**Portfolio showcase** — A full-stack intercity taxi booking platform built for LookRides, a premium cab service operating across North India (Chandigarh, Mohali, Zirakpur, Delhi, Himachal Pradesh). Features an enterprise-grade booking engine, programmatic SEO architecture with 19 dynamic route pages, and a complete admin operations portal.

---

## ✨ Features

### Booking Engine
- Multi-step widget with route, date, vehicle, and passenger selection
- Zero-upfront payment model — confirm booking, pay later
- Real-time Telegram, Email, and WhatsApp notifications to dispatch team
- Razorpay payment integration with webhook verification

### Programmatic SEO
- 19 dynamic route pages (`/routes/[slug]`) with unique JSON-LD structured data
- 3 city landing pages (Chandigarh, Mohali, Zirakpur) with FAQPage schema
- Airport transfer pages with LocalBusiness markup
- Dynamic `sitemap.xml` with prioritized routes
- `BreadcrumbList` schema on every public page

### Admin Portal (`/admin`)
- JWT-authenticated dashboard with real-time counts
- Full CRUD: bookings, fleet, pricing, reviews, blog posts, messages, users, settings
- Google Reviews Sync via SerpAPI (free tier)
- CSV export for offline booking analysis
- Markdown blog editor with auto-slug, cover image, publish toggle

### Visual Experience
- WebGL-powered 3D circular gallery on homepage showcasing popular destinations
- GPU-accelerated scroll, touch, and keyboard-driven carousel with smooth lerp animation
- Dynamic canvas text rendering with configurable fonts, colors, and border radius

### Fleet & Pricing
- Vehicle catalog with images, capacity, pricing tiers, active/inactive toggle
- Route pricing with city-to-city pairs, sedan/SUV pricing, display ordering

### Notifications
- Telegram push for new bookings and contact messages
- Email via Resend (booking confirmations, contact alerts)
- WhatsApp click-to-chat deep links

---

## 🛡️ Security

| Layer | Implementation |
|:---|---:|
| **CSP Headers** | Strict `Content-Security-Policy` — restricts script/style sources, disallows `eval` in production |
| **Rate Limiting** | Supabase-backed table-based limiter with exponential backoff — fail-closed on error |
| **Origin Checking** | `isAllowedOrigin()` validates `Origin` header on all API routes |
| **Admin API Routes** | All admin ops through server-side routes with service role key + cookie-based `is_admin` verification |
| **Row Level Security** | PostgreSQL RLS requiring `is_admin` JWT claim for sensitive tables |
| **Middleware Auth** | Intercepts `/admin/*`, verifies Supabase session before page load |
| **Login Throttling** | Progressive cooldown (5s → exponential to 60s) after failed attempts |
| **Security Headers** | `X-Content-Type-Options`, `X-Frame-Options`, `HSTS`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy` |

---

## ⚡ Performance

| Optimization | Detail |
|:---|---:|
| **Image Optimization** | Next.js `Image` with AVIF/WebP, remote patterns, 30-day CDN cache TTL |
| **Lazy Loading** | Below-fold images use `loading="lazy"` with blur placeholder |
| **DNS Prefetch** | Early resolution for Supabase, Google Analytics, Komoot |
| **Caching** | Static pages: `revalidate: 60` ISR. Assets: `max-age=31536000, immutable` |
| **Compression** | Brotli/gzip response compression |
| **Fonts** | System font stack with `font-display: swap` — no render-blocking |
| **Code Splitting** | App Router automatic route-level splitting, dynamic imports |

---

## 🧪 Test Coverage

- **Vitest:** 13 unit tests (config validation, XSS sanitization, origin checks, route data integrity)
- **Playwright:** 3 E2E specs (homepage render, booking flow, mobile navigation)
- **ESLint:** 0 errors, 0 warnings (flat config with Next.js core-web-vitals + TypeScript parser + browser/Node globals)

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── admin/                # Admin portal (12 routes)
│   ├── api/                  # API routes (admin + public)
│   ├── blog/                 # Blog index + [slug]
│   ├── cities/               # City landing pages
│   ├── routes/               # 19 dynamic route pages
│   ├── airport-transfers/    # Airport transfer page
│   ├── fleet/                # Fleet showcase
│   ├── services/             # Services overview
│   ├── about/                # About page
│   ├── contact/              # Contact form
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms & conditions
│   ├── cancellation/         # Cancellation & refund policy
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts             # Robots.txt
│   └── page.tsx              # Homepage with booking widget
├── components/               # Shared components
│   ├── CircularGallery.tsx   # WebGL 3D destination carousel (OGL)
│   └── CircularGallery.css   # Gallery container styles
├── lib/                      # Utilities, queries, config, tests
├── middleware.ts             # Auth + redirect + security headers
└── test/                     # Vitest setup
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|---:|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | CSS Modules, Custom Design Tokens (navy `#0B132B` / gold `#FCA311`) |
| **Database** | Supabase PostgreSQL + Row Level Security |
| **Auth** | Supabase Auth with cookie-based `is_admin` verification |
| **Payments** | Razorpay (order creation + webhook verification) |
| **Email** | Resend API |
| **Testing** | Vitest 4 (unit), Playwright (E2E) |
| **Linting** | ESLint 9 flat config |
| **Notifications** | Telegram Bot API, WhatsApp Click-to-Chat |
| **Reviews Sync** | SerpAPI (Google Reviews, free tier) |
| **3D Rendering** | OGL (WebGL) — circular gallery with GPU-animated transforms & textures |
| **Media** | WebP/AVIF optimization, Embla Carousel |

---

## © License & Copyright

**All Rights Reserved.**

This repository is a freelance portfolio piece developed for **LookRides**. It is made public for **showcase purposes only**.

No license is granted for any commercial or personal use of the source code, design assets, or proprietary algorithms contained herein.

---

*Developed by Pahul.*
