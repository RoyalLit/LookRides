# LookRides 🚖 | Premium Intercity Taxi Platform

Full-stack Next.js booking platform for an intercity taxi and airport transfer service operating across North India (Chandigarh, Mohali, Zirakpur, Delhi, Himachal Pradesh).

---

## Features

### Public Site
- **Booking Form** — Frictionless widget with route/date/vehicle selection, submits to WhatsApp + Telegram notifications + email alerts
- **Dynamic Route Pages** — SEO-optimized landing pages for 15+ intercity routes with JSON-LD schema, pricing tables, and FAQs
- **Fleet Showcase** — Interactive carousel with vehicle details (Innova Crysta, Etios, Urbania, Tempo Traveller)
- **Reviews Carousel** — Live Google Reviews and manual testimonials
- **Blog** — Static markdown blog for long-tail SEO content
- **Contact Page** — Form with Supabase persistence + Telegram/email notifications
- **Legal Pages** — Privacy Policy, Terms & Conditions, Cancellation & Refund Policy

### Admin Portal (`/admin`)
- **Login** — Secure authentication via Supabase with `is_admin` claim check
- **Dashboard** — Overview with total bookings, contacts, reviews, fleet count
- **Bookings** — Full CRUD with search/filter (name, phone, route, status), status management (pending/confirmed/completed/cancelled), **CSV export**
- **Fleet** — Manage vehicles with image, capacity, pricing, active status, order index
- **Pricing** — CRUD for route pricing with city-to-city, vehicle types (sedan/SUV), and order index
- **Reviews** — Approve/hide testimonials, mark as Google-synced, **Google Reviews Sync** via SerpAPI
- **Messages** — View and manage contact form submissions with read/unread status
- **Blog** — Full CRUD with markdown editor, auto-slug, publish/unpublish, excerpt, cover image
- **Users** — Admin user management with invite and admin role toggle
- **Settings** — Manage site settings (Google rating, review count, notification email, Telegram chat ID, Place ID)

### Notifications
- **Telegram** — Real-time alerts for new bookings and contact messages
- **Email** — Booking/contact notifications via Resend
- **WhatsApp** — Booking submissions sent to dispatch via WhatsApp deep links

### Security
- Admin API routes use server-side `supabaseAdmin` + cookie-based `is_admin` auth (never anon key)
- Rate limiting on contact form and public API routes (fail-closed)
- CSP headers, origin checks, XSS protection
- RLS policies on all tables with `is_admin` JWT claim
- Input validation with Zod on all endpoints

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router), TypeScript |
| **Styling** | CSS Modules, Custom Design Tokens |
| **Database** | Supabase PostgreSQL with RLS |
| **Auth** | Supabase Auth with cookie-based sessions |
| **Email** | Resend |
| **Deployment** | Vercel |
| **Content** | gray-matter, remark (blog) |
| **SEO** | Dynamic JSON-LD, BreadcrumbList, LocalBusiness schema |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project (free tier)
- Resend API key (free tier: 100 emails/day)
- Telegram bot token (optional, for notifications)
- SerpAPI key (optional, for Google Reviews sync — free tier: 100 req/month, no credit card)

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (admin bypass) |
| `RESEND_API_KEY` | ✅ | Resend API key for email notifications |
| `NOTIFICATION_EMAIL` | ✅ | Where booking/contact emails are sent |
| `TELEGRAM_BOT_TOKEN` | ❌ | Telegram bot token for push notifications |
| `TELEGRAM_CHAT_ID` | ❌ | Telegram chat ID for notifications |
| `SERPAPI_API_KEY` | ❌ | SerpAPI key for Google Reviews sync |
| `GOOGLE_SITE_VERIFICATION` | ❌ | Google Search Console verification |

### Install & Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint check
npm run typecheck  # TypeScript check
```

### Database Migrations

Run migrations against your Supabase project:

```bash
# Link your project
npx supabase link --project-ref <project-id>

# Apply migrations
npx supabase db push
```

Key migrations:
- `20260627150000_rls_admin_jwt.sql` — RLS hardening with `is_admin` JWT claim
- `20260701000000_create_blog_posts.sql` — blog_posts table for admin CRUD
- `20260701000001_add_google_review_id.sql` — google_review_id column for review dedup

> **Important:** After applying the RLS migration, disable public signups in Supabase Dashboard > Authentication > Settings. Only invite specific admin users.

---

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin portal pages
│   │   ├── bookings/    # Booking management + CSV export
│   │   ├── blog/        # Blog CRUD with markdown editor
│   │   ├── fleet/       # Fleet management
│   │   ├── login/       # Admin login
│   │   ├── messages/    # Contact message inbox
│   │   ├── pricing/     # Route pricing CRUD
│   │   ├── reviews/     # Reviews + Google Sync
│   │   ├── settings/    # Site settings
│   │   └── users/       # User management
│   ├── api/
│   │   ├── admin/       # Server-side admin API routes
│   │   └── public/      # Public API routes (contact, settings)
│   ├── routes/          # Dynamic route pages (15+ routes)
│   ├── cancellation/    # Cancellation & Refund policy
│   ├── privacy/         # Privacy policy
│   ├── terms/           # Terms & Conditions
│   └── page.tsx         # Homepage
├── components/          # Shared React components
├── content/blog/        # Static markdown blog posts
└── lib/
    ├── admin-auth.ts    # Shared cookie-based admin auth
    ├── config.ts        # Business config (phone, site name)
    ├── queries.ts       # Server data fetching functions
    ├── rate-limit.ts    # Fail-closed rate limiter
    ├── routes-data.ts   # Central route data
    └── supabase.ts      # Supabase client setup
```

---

## License

All Rights Reserved. Proprietary code — public for portfolio showcase only.
