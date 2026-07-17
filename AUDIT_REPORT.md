# LookRides Comprehensive Audit Report

**Date:** 2026-07-17
**Scope:** Full codebase — 20+ pages, 18 API routes, 30+ components, 11 lib modules, config, migrations
**Stack:** Next.js 16, Supabase (SSR + service role), PhonePe payments, Zod, Resend email
**Reviewers:** 7 subagents — SEO, Security, UI/Visual, UX, Performance, Code Quality, Accessibility

---

## Table of Contents

1. [Security](#1-security)
2. [SEO](#2-seo)
3. [Performance](#3-performance)
4. [UX / Conversion](#4-ux--conversion)
5. [UI / Visual Design](#5-ui--visual-design)
6. [Accessibility](#6-accessibility)
7. [Code Quality](#7-code-quality)
8. [Priority Action Matrix](#8-priority-action-matrix)

---

## 1. Security

### 🔴 CRITICAL

#### 1.1 Webhook hardcoded credentials in source
**File:** `src/app/api/payments/webhook/route.ts:11`
```ts
const expectedAuth = 'Basic ' + Buffer.from('lookrides:WebhookSecure2026').toString('base64');
```
PhonePe webhook username/password hardcoded. Anyone with repo access reads credentials.
**Fix:** Move to `PHONEPE_WEBHOOK_AUTH` env var. Rotate credentials.

#### 1.2 `is_admin` stored as string, middleware expects boolean — auth bypass/lockout
**Files:** `src/app/api/admin/users/route.ts:67`, `src/lib/admin-auth.ts:18`, `src/middleware.ts:137`
Invite API stores `is_admin: parsed.data.is_admin ? 'true' : 'false'` (string). Auth checks compare `user.user_metadata?.is_admin !== true` (strict boolean). `'true' !== true` → every invited user rejected as non-admin.
**Fix:** Store boolean `is_admin: !!parsed.data.is_admin`. Standardize type everywhere.

#### 1.3 `payment_links` RLS allows public read of all customer PII
**File:** `supabase/migrations/20260715000000_create_payment_links.sql:16-17`
```sql
create policy "Allow public to read payment links"
  on public.payment_links for select using (true);
```
Anyone with Supabase anon key enumerates payment links: UUIDs, amounts, customer emails/phones, transaction IDs.
**Fix:** Remove public SELECT policy. `/pay/[id]` already uses `supabaseAdmin`.

#### 1.4 Error details from PhonePe leaked to client
**File:** `src/app/api/payments/initiate/route.ts:66,97,102`
Raw PhonePe API responses and JS error objects (stack traces) returned to client.
**Fix:** Log server-side only. Return generic errors.

#### 1.5 Plaintext secrets in `.env` file
`.env` and `.env.local` contain live secrets (Razorpay keys, PhonePe salt, Supabase service role, Resend API key).
**Fix:** Rotate all secrets. Use secrets manager (Vercel env vars, Doppler). Verify never committed: `git log --all --diff-filter=A -- .env .env.local`.

#### 1.6 Payment webhook has no cryptographic signature verification
**File:** `src/app/api/payments/webhook/route.ts`
Only checks static Basic Auth header (credential from 1.1). PhonePe V2 supports HMAC signature verification.
**Fix:** Implement `X-VERIFY` header HMAC verification using `PHONEPE_SALT_KEY`.

#### 1.7 Payment initiation race condition — lost payments
**File:** `src/app/api/payments/initiate/route.ts:39-44`
Each call generates new `transactionId`, overwrites `payment_links.transaction_id`. Two clicks = TXN_A succeeds, DB has TXN_B, webhook can't match → payment stuck pending forever.
**Fix:** Check if `transaction_id` already set before creating new one. Return existing checkout URL if payment still pending.

#### 1.8 Fleet page exposes service role key to client bundle
**File:** `src/app/fleet/page.tsx`
Entire page `'use client'`, calls `getActiveFleet()` which uses `supabaseAdmin` (service role key). Key gets bundled into client JS.
**Fix:** Convert to server component. Fetch server-side.

### 🟡 HIGH

#### 1.9 No input validation on booking endpoint
**File:** `src/app/api/bookings/route.ts`
No Zod schema or manual validation on booking creation endpoint.

#### 1.10 `send-email` endpoint has no rate limiting
**File:** `src/app/api/payments/send-email/route.ts`
Authenticated admin can spam payment request emails without limit.

#### 1.11 Admin GET endpoints lack rate limiting
**Files:** `src/app/api/admin/users/route.ts` (GET), `src/app/api/admin/messages/route.ts` (GET), `src/app/api/admin/bookings/export/route.ts` (GET)
Stolen admin session could exfiltrate all data rapidly.

#### 1.12 Admin POST endpoints lack rate limiting
**Files:** `src/app/api/admin/payment-links/route.ts` (POST), `src/app/api/admin/bookings/route.ts` (POST)
No rate limiting on state-changing operations.

#### 1.13 No CSRF protection on mutation forms
Admin endpoints have no CSRF token verification. Supabase session cookies `SameSite` not explicitly configured.
**Fix:** Verify `SameSite=Lax` or `SameSite=Strict` on Supabase auth cookies. Add CSRF tokens for admin ops.

#### 1.14 Blog `dangerouslySetInnerHTML` — stored XSS vector
**File:** `src/app/blog/[slug]/page.tsx:95`
Blog content rendered via `dangerouslySetInnerHTML`. Compromised admin account could inject scripts.
**Fix:** Sanitize remark output with `DOMPurify` or `sanitize-html`.

#### 1.15 Email HTML templates vulnerable to injection
**File:** `src/app/api/payments/send-email/route.ts:53-54`
`link.purpose` and `link.amount` interpolated into HTML email without escaping.
**Fix:** HTML-escape all dynamic values. `htmlEscape` function exists in `email.ts` — use it.

#### 1.16 DELETE endpoints don't validate UUID format
**Files:** `src/app/api/admin/fleet/route.ts:131`, `src/app/api/admin/blog/route.ts:138`, `src/app/api/admin/reviews/route.ts:129`
**Fix:** Add `z.string().uuid()` validation.

#### 1.17 `payment_links.amount` has no maximum cap
**File:** `src/app/api/admin/payment-links/route.ts:7`
`z.number().positive()` — no upper bound. Add `.max(100000)`.

#### 1.18 Admin users POST leaks Supabase error messages
**File:** `src/app/api/admin/users/route.ts:71,103`
Supabase internal errors returned to client.
**Fix:** Return generic errors. Log server-side.

#### 1.19 HSTS not in middleware security headers
**File:** `src/middleware.ts:4-10`
HSTS set in `next.config.ts` but not in middleware (the canonical security layer).
**Fix:** Add HSTS to middleware.

#### 1.20 Rate limiter has read-then-write race condition
Concurrent requests could bypass rate limits.
**Fix:** Use atomic increment with Supabase RPC or advisory lock.

#### 1.21 `supabaseAdmin` falls back to anon key silently
**File:** `src/lib/supabase-admin.ts:8`
When `SUPABASE_SERVICE_ROLE_KEY` missing, falls back to anon key with `console.warn`.
**Fix:** Throw error if service role key missing.

### 💭 NITS

#### 1.22 CSP allows `'unsafe-inline'` for scripts
Needed for JSON-LD `<script>` tags. Fix with nonces.

#### 1.23 `X-XSS-Protection` header deprecated
Remove it, CSP covers XSS.

#### 1.24 Middleware security headers not applied to `/api/*` routes
Potential gap if `next.config.ts` is not the intended source of truth.

---

## 2. SEO

### 🔴 CRITICAL

#### 2.1 Breadcrumb JSON-LD duplicated and globally wrong
**File:** `src/app/layout.tsx:99-108`
Root layout injects static BreadcrumbList (Home → Services → Fleet → Contact) on **every page**. Each page also has its own contextual breadcrumb. Every page has 2 BreadcrumbList schemas.
**Fix:** Remove static breadcrumb from `layout.tsx`. Each page already outputs correct breadcrumb.

#### 2.2 Fleet page breadcrumb duplicated
**Files:** `src/app/fleet/layout.tsx:27-46` + `src/app/fleet/page.tsx:12-23`
Both layout and page output BreadcrumbList → duplicate schema.
**Fix:** Remove from one. Keep in layout since page is client component.

#### 2.3 Fleet page fully client-side rendered — invisible to crawlers
**File:** `src/app/fleet/page.tsx` (line 1: `'use client'`)
Crawlers without JS execution see empty page with loading skeleton.
**Fix:** Convert to server component with metadata.

#### 2.4 Fleet images bypass Next.js optimization
**File:** `src/components/HomeClient.tsx:364`
`unoptimized={true}` on fleet carousel images.
**Fix:** Remove `unoptimized={true}`. Config already has `remotePatterns`.

#### 2.5 Pay page indexable — should be noindexed
**File:** `src/app/pay/[id]/page.tsx`
No `robots: { index: false }`. Unique UUID URLs waste crawl budget.
**Fix:** Add noindex metadata. Add `/pay/` to robots.txt.

#### 2.6 Markdown bold rendered as literal asterisks
**File:** `src/components/HomeClient.tsx:422`
`**quality control**` → users see `**quality control**` instead of bold.
**Fix:** Replace with `<strong>quality control</strong>`.

### 🟡 HIGH

#### 2.7 Missing canonical tags on 4 pages
| Page | File |
|------|------|
| `/services` | `src/app/services/page.tsx` |
| `/fleet` | `src/app/fleet/layout.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/cancellation` | `src/app/cancellation/page.tsx` (hardcoded URL instead of SITE_URL) |

#### 2.8 Missing Twitter card images on 5 pages
`/routes`, `/airport-transfers`, `/cities`, `/cancellation`, `/terms` — no `twitter.images`.

#### 2.9 Title tags too long (69-78 chars on city/service pages)
Google truncates around 55-60 chars.

#### 2.10 Sitemap uses `new Date()` for every `lastModified`
**File:** `src/app/sitemap.ts:9-41`
Every URL → Google sees everything as "just updated." Negates purpose.
**Fix:** Use fixed dates for static pages. Read `mtime` for blog posts.

#### 2.11 Route detail canonical uses hardcoded URL
**File:** `src/app/routes/[slug]/page.tsx:36`
`https://lookrides.com` instead of `SITE_URL`.
**Fix:** Use `${SITE_URL}/routes/${route.slug}`.

#### 2.12 City/route pages use inline styles
**Files:** `airport-transfers/page.tsx`, `cities/[city]/page.tsx` (3 files), `RoutePage.tsx`
Inline styles increase HTML size, no responsive breakpoints, no dark mode.

#### 2.13 Missing Organization schema `sameAs` links
**File:** `src/app/layout.tsx:110-205`
Only WhatsApp in `sameAs`. Missing Google Business Profile, Instagram, Facebook.

#### 2.14 Blog posts lack individual author attribution
**File:** `src/app/blog/[slug]/page.tsx:73`
Author is Organization, not Person. E-E-A-T signal weakness.

#### 2.15 "Read All Google Reviews" links to `/contact`
**File:** `src/components/HomeClient.tsx:534`
CTA says "Read All Google Reviews" but links to contact form. User confusion.

#### 2.16 Services page title template mismatch
**File:** `src/app/services/page.tsx:8`
Hardcodes full title instead of using root layout template.

### 💭 NITS

#### 2.17 Missing `<address>` semantic element on Contact page
#### 2.18 HSTS header may affect staging subdomains
#### 2.19 `X-XSS-Protection` deprecated header
#### 2.20 `.DS_Store` in `/public`
#### 2.21 `og-square.png` unused in `/public`
#### 2.22 Blog posts no reading time metadata
#### 2.23 Missing `data-nosnippet` on admin/payment pages

---

## 3. Performance

### 🔴 CRITICAL

#### 3.1 Fleet page client-side rendering + service role key exposure
**File:** `src/app/fleet/page.tsx`
Blank screen → spinner → content waterfall. No SEO. Exposes service role key to browser.
**Fix:** Convert to server component. Add `generateMetadata`.

#### 3.2 19× `select('*')` over-fetching
**File:** `src/lib/queries.ts` + API routes
Every Supabase query uses `select('*')`. Wasted bandwidth, larger RSC payload.
**Fix:** Replace with explicit column lists: `.select('id, name, seats, bags, ...')`.

#### 3.3 40KB monolithic `page.module.css`
**File:** `src/app/page.module.css` (1,890 lines, 41KB)
Imported into client component → entire file bundled into client JS. Blocks interactivity.
**Fix:** Split into section-level CSS modules. Extract interactive-specific styles.

#### 3.4 Inline `<style>` tags in RoutePage (5 instances)
**File:** `src/components/RoutePage.tsx`
5 `<style>` blocks with unscoped global CSS on every route page render. Cannot be cached, no deduplication.
**Fix:** Move to `RoutePage.module.css`.

#### 3.5 ScrollAnimations fragile DOM query
**File:** `src/components/ScrollAnimations.tsx`
`querySelectorAll('[class*="fadeUp"]')` — runs once, misses dynamically added elements. No MutationObserver. Competes with HomeClient's own IntersectionObserver.
**Fix:** Use `data-animate` attributes. Add MutationObserver or consolidate observers.

#### 3.6 Duplicate footer IntersectionObservers
**Files:** `WhatsAppButton.tsx` + `MobileStickyCta.tsx`
Two observers watching same element with different `rootMargin`. Both mount unconditionally on every page.
**Fix:** Merge into single `useFooterVisibility` hook.

#### 3.7 BookingForm eagerly loaded (600+ lines)
**File:** `src/components/HomeClient.tsx` (eager import)
Complex form with autocomplete, debounce, date parsing — loaded eagerly.
**Fix:** `dynamic(() => import("@/components/BookingForm"), { ssr: false })`.

#### 3.8 Missing Suspense boundaries — no streaming
**File:** `src/app/layout.tsx`
No Suspense around client components. `Promise.all` blocks rendering until all 3 queries complete.
**Fix:** Add Suspense for below-the-fold sections.

### 🟡 HIGH

#### 3.9 Image optimization gaps
| Issue | Location |
|-------|----------|
| `unoptimized={true}` | HomeClient fleet carousel |
| No `sizes` prop | Multiple `<Image>` components |
| Missing `avif` format | `next.config.ts` |
| All fleet images `priority={true}` | HomeClient (only first needs it) |

#### 3.10 Two font families (80KB total)
Inter + Outfit loaded on every page. Consider if Outfit is necessary.

#### 3.11 5 layout components mounted on every route
Header, Footer, WhatsAppButton, ScrollAnimations, MobileStickyCta on every page — including admin routes.
**Fix:** Move non-essential components to `<ClientShell>` scoped to public routes.

#### 3.12 100+ inline `style={{}}` instances
Can't be cached, no CSS specificity, no media queries.

#### 3.13 `getSiteSettings()` fetches all settings
**Fix:** Fetch specific keys or cache aggressively.

#### 3.14 No streaming Suspense for homepage sections
`Promise.all` blocks everything. Split into `<FleetSection>`, `<ReviewsSection>` with independent Suspense.

#### 3.15 `react-leaflet` + `leaflet` (46KB gzipped) for single office marker
**Fix:** Static image with "Get Directions" link.

#### 3.16 CircularGallery OGL (~50KB) for single WebGL gallery
Already dynamically imported. WebGL context expensive on low-end mobile.

#### 3.17 No `React.memo` on fleet/review cards
Scroll events cause full re-renders of fleet + review sections.

#### 3.18 `MapInner.tsx` setTimeout no cleanup
**Fix:** `return () => clearTimeout(timeoutId)`.

### 💭 NITS

#### 3.19 `gray-matter` runtime dep — unused if data pre-processed
#### 3.20 `pg-sdk-node` dep unused (Supabase client handles DB)
#### 3.21 Only 2 blog posts — consider pre-rendering
#### 3.22 `loading.tsx` only at root level
#### 3.23 Hardcoded phone in WhatsAppButton vs config in MobileStickyCta
#### 3.24 `console.warn` on every cold start for missing service role key
#### 3.25 29 duplicated `@keyframes` across CSS files
#### 3.26 Hero glow animations running continuously (gradient animations)
#### 3.27 No `will-change` hints for animated elements
#### 3.28 Footer uses inline `style={{ marginTop }}`
#### 3.29 `loading` prop always `false` from server — dead prop
#### 3.30 `getFleetDetails()` called inside `.map()` — compute once

---

## 4. UX / Conversion

### 🔴 CRITICAL

#### 4.1 Date field is text input, not `<input type="date">`
**File:** `BookingForm.tsx:357-375`
Custom DD/MM/YYYY text input with strict regex. No mobile date picker. Error-prone for Indian users on older Android devices. **#1 friction point in booking flow.**
**Fix:** Replace with `<input type="date">` or date picker component.

#### 4.2 Route page "Book Now" doesn't pre-fill booking form
**File:** `RoutePage.tsx`
"Book Now" links to `/#booking-widget` without `?pickup=X&drop=Y`. BookingForm already supports URL pre-fill (`BookingForm.tsx:188-189`).
**Fix:** Append `?pickup={from}&drop={to}` to href.

#### 4.3 City page CTAs navigate to home, lose context
**Files:** `cities/chandigarh/page.tsx:137`, etc.
"Book Your Cab" → `/#booking-widget`. User leaves city page, loses context.
**Fix:** Link to `/?pickup={city}`.

#### 4.4 Fleet page "Book Now" links to `/`
**File:** `fleet/page.tsx:90`
Link text: "Book Now" → href: `/`. User loses fleet context.
**Fix:** Link to `/?vehicle={category}` or `/#booking-widget`.

#### 4.5 Services page "Book This Service" links to `/`
**File:** `services/page.tsx:122`
**Fix:** Link to `/?service={slug}`.

#### 4.6 Header "Book Now" doesn't scroll to form on home page
**File:** `Header.tsx:83`
Links to `/` with `scroll={false}`. On home page, user ends up at top of page, form is below.
**Fix:** On home page, scroll to `#booking-widget`. Use hash link.

#### 4.7 Mobile sticky CTA "Book Now" navigates away
**File:** `MobileStickyCta.tsx:52-58`
**Fix:** Link to `/#booking-widget`.

#### 4.8 No hero CTA to scroll to booking form on mobile
Home hero text has "Call Helpline" + "Book via WhatsApp" but no in-page scroll-to-form button. On mobile, form is below fold.
**Fix:** Add "Book Instantly ↓" CTA that scrolls to `#booking-widget`.

### 🟡 HIGH

#### 4.9 City pages use inline styles — no CSS modules
**Files:** `cities/*/page.tsx`
No responsive design, no hover states, no dark mode. Hardcoded prices baked into component.

#### 4.10 Fleet page client-side only — blank → skeleton → content flash
**File:** `fleet/page.tsx:29-36`
Three visual state transitions. No pricing on fleet cards. "Best For" hardcoded same for all vehicles.

#### 4.11 404 page has no navigation — only "Go Home"
**File:** `src/app/not-found.tsx`
No header, no footer, no popular routes suggestions.
**Fix:** Add route suggestions. Ensure layout renders.

#### 4.12 Booking form phone validation can miss partial entries
Phone only validates on blur and only after 10 chars. Partially-filled phones can submit without triggering validation.

#### 4.13 "Read All Google Reviews" links to `/contact`
**File:** `HomeClient.tsx:534`
Links to contact form instead of actual Google Business Profile. User expectation mismatch.

#### 4.14 No GSTIN or business registration displayed
Important trust signal for Indian cab market.

#### 4.15 Sticky CTA "Book Now" navigates away on internal pages
**File:** `MobileStickyCta.tsx:52-58`

#### 4.16 Autocomplete "No Results" has no suggestion text
**File:** `BookingForm.tsx:158-159`
**Fix:** Suggest "Try typing city name (e.g., 'IGI Airport', 'Manali')".

#### 4.17 Success message auto-dismisses after 8 seconds
**File:** `BookingForm.tsx:277`
If user navigates away and back, confirmation gone.
**Fix:** Persist in `sessionStorage`.

### 💭 NITS

#### 4.18 Review count inconsistency: hero uses `settings.review_count`, footer hardcodes "54"
#### 4.19 Routes dropdown missing Dharamshala, Dehradun, Jammu
#### 4.20 No "Cities" nav link for city SEO landing pages
#### 4.21 Mobile menu doesn't close on outside click
#### 4.22 Mohali page links to Chandigarh route pages — URL mismatch
#### 4.23 WhatsApp button hardcodes phone number instead of using `BUSINESS_PHONE`
#### 4.24 No retry button on booking form error state
#### 4.25 Error digest not shown to user in error boundary

---

## 5. UI / Visual Design

### 🔴 CRITICAL

#### 5.1 Blog index uses inline styles exclusively
**File:** `src/app/blog/page.tsx:41-66`
Zero CSS module. Hardcoded colors, px values, no design tokens.
**Fix:** Extract to `blog.module.css`.

#### 5.2 Skeleton components use hardcoded colors
**File:** `src/components/Skeleton.module.css:11,23,59,68,88`
`#e2e8f0`, `#f1f5f9`, `#fff` — no CSS variables. Dark mode impossible.
**Fix:** Replace with `var(--border)`, `var(--surface)`, `var(--surface-hover)`.

#### 5.3 ScrollAnimations queries DOM by CSS module class name substrings
**File:** `src/components/ScrollAnimations.tsx:19`
`querySelectorAll('[class*="fadeUp"]')` — CSS module hash collision risk. Unobservable breakage.
**Fix:** Use `data-animate` attributes.

#### 5.4 Blog index missing responsive layout for mobile
**File:** `src/app/blog/page.tsx:50`
`gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'` — overflows below 320px.

### 🟡 HIGH

#### 5.5 Header dropdown uses opacity toggle without `pointer-events: none`
**File:** `src/components/Header.module.css:117-125`
Menu items remain clickable while invisible.

#### 5.6 Hero search card no `position: relative`
**File:** `src/app/page.module.css:84-97`
Z-index stacking context undefined — booking form can render behind other elements.

#### 5.7 CTA button hover state inconsistent across pages
`translateY(-2px)` (globals), `translateY(-1px)` (fleet), `translateY(-5px)` (about).

#### 5.8 Loading spinner colors don't match skeleton spinner
**Files:** `loading.module.css:11-12`, `Skeleton.module.css:110-116`
Two different spinners, different colors/sizes.
**Fix:** Extract shared `Spinner` component.

#### 5.9 About page stats row no flex-wrap at 768-900px
**File:** `src/app/about.module.css:57-63`
Three stat items can overflow.

#### 5.10 Mobile sticky CTA no safe area padding
**File:** `src/components/MobileStickyCta.module.css:1-3`
No `env(safe-area-inset-bottom)` — clipped on iPhone with home indicator.

#### 5.11 Fleet `.noResults` uses hardcoded color
**File:** `src/app/fleet/fleet.module.css:402`
`color: #6b7280` → use `var(--text-muted)`.

#### 5.12 About page values cards use inline `animationDelay`
**File:** `src/app/about/page.tsx:129`
**Fix:** Use `--delay` CSS custom property.

### 💭 NITS

#### 5.13 Blog post date raw string — no formatting
#### 5.14 `loading.tsx` spinner no `role="status"` or `aria-label`
#### 5.15 `error.tsx` swallows `error.digest`
#### 5.16 About `.visualBox` no fallback for broken image
#### 5.17 `SkeletonSlide` magic number for flex-basis

---

## 6. Accessibility

### 🔴 CRITICAL

#### 6.1 Booking form keyboard focus invisible
**File:** `BookingForm.module.css:55`
`.inputWrap input { outline: none }` at specificity 0,2,0 overrides global `input:focus-visible` at 0,1,1. Keyboard users see no focus ring.
**Fix:** Add `.inputWrap input:focus-visible { outline: 2px solid var(--accent-gold); outline-offset: 2px; }`.

#### 6.2 Loading spinner has no screen reader announcement
**File:** `src/app/loading.tsx:5-7`
Bare `div` with spinning animation. No `role="status"`, no `aria-label`, no text.
**Fix:** Add `role="status" aria-label="Loading page"` and `.sr-only` text.

### 🟡 SERIOUS

#### 6.3 Mobile menu lacks focus trap and Escape key
**File:** `src/components/Header.tsx:86-118`
Keyboard users can Tab past menu into background. Escape doesn't close. Focus not managed.
**Fix:** Add focus trap, Escape handler, focus management on open/close.

#### 6.4 Fleet page loading state not announced
**File:** `src/app/fleet/page.tsx:53-56`
Screen readers hear silence during loading phase — skeleton cards have `aria-hidden`.
**Fix:** Wrap skeleton in `role="status"` with `sr-only` text.

#### 6.5 `prefers-reduced-motion` only covers one animation class
**File:** `src/app/globals.css:380-382`
Only `.reveal-on-scroll` covered. 28+ animations run unconditionally (hero glow, float, ping, shimmer, spin).
**Fix:** Add blanket rule: `*, *::before, *::after { animation-duration: 0.01ms !important; }` within `@media (prefers-reduced-motion: reduce)`.

#### 6.6 Map has no accessible name or alternative
**File:** `src/components/home/MapInner.tsx:48-53`
Leaflet `MapContainer` has no `aria-label`, `role`, or text alternative.
**Fix:** Add `aria-label` describing office location. Keep visible address below map.

### 🟠 MODERATE

#### 6.7 OfficeLocationMap loading spinner no announcement
Dynamic import loading state has no `role="status"`.
**Fix:** Add `role="status" aria-label="Loading map"`.

#### 6.8 CircularGallery WebGL canvas no text alternative
Three.js canvas renders fleet images — invisible to screen readers.
**Fix:** Add `aria-label` to Canvas. Provide sr-only list of vehicle names.

#### 6.9 Contact form validation errors lack field association
**File:** `ContactForm.tsx:44-52`
No `aria-invalid` or `aria-describedby` on form inputs. Error associations missing.

### 💭 MINOR

#### 6.10 Routes dropdown menu items lack arrow key navigation
#### 6.11 WhatsApp button ping animation not suppressed by reduced motion
#### 6.12 About page values card inline animationDelay (not reduced-motion safe)

### ✅ WHAT WORKS WELL
- Skip link at `layout.tsx:223` with CSS visibility on focus
- Clean `<main>` landmark with `id="main-content"`
- Clean heading hierarchy h1→h2→h3 across all pages
- Landmark regions: `<header>`, `<nav aria-label>`, `<footer>`
- Comprehensive global `focus-visible` styles at `globals.css:449-473`
- BookingForm validation: `aria-describedby`, `aria-live="polite"`
- Contact form: all inputs have `<label htmlFor>` with matching `id`
- Skeleton components: `aria-hidden="true"` for decorative states
- Routes dropdown: `aria-expanded`, `aria-haspopup`, `role="menu"`, Escape key
- Hamburger: `aria-label="Toggle menu"`, `aria-expanded`
- External links: `target="_blank"` includes `rel="noopener noreferrer"`
- Blog images: post title as alt text

---

## 7. Code Quality

### 🔴 CRITICAL

#### 7.1 Hardcoded webhook credentials (same as Security 1.1)
#### 7.2 `is_admin` type inconsistency (same as Security 1.2)
#### 7.3 Rate limiter race condition (same as Security 1.20)
#### 7.4 Supabase admin client fallback (same as Security 1.21)

### 🟡 HIGH

#### 7.5 Dual blog system — admin blog posts invisible on frontend
Blog posts stored in both filesystem (`/public/content/blog/`) and Supabase. Admin creates posts in Supabase but frontend reads from filesystem → admin posts invisible.

#### 7.6 No input validation on booking endpoint (repeated from Security)

#### 7.7 Security headers duplicated between middleware and `next.config.ts`

#### 7.8 Admin dashboard fetches same data twice on mount

#### 7.9 `SiteSetting.value: any` defeats TypeScript
**File:** type definition for site settings uses `any` for values.

#### 7.10 Admin pages show empty state on API failure — no error feedback

#### 7.11 BookingForm is monolithic 300+ line component

#### 7.12 Route data hardcoded in 700+ line file alongside Supabase table

#### 7.13 HTML escape test tests local function, not the real one

### 💭 NITS

#### 7.14 E2e coverage minimal (3 files)
#### 7.15 Admin uses `alert()`/`confirm()` instead of toast notifications
#### 7.16 Fleet page breadcrumb hardcodes URL instead of SITE_URL

---

## 8. Priority Action Matrix

### TIER 1 — Fix Immediately (Security + SEO blockers)

| # | Issue | Dimension | Effort | File(s) |
|---|-------|-----------|--------|---------|
| 1.1 | Hardcoded webhook credentials | Security | 10min | `payments/webhook/route.ts` |
| 1.2 | `is_admin` boolean vs string | Security | 15min | `admin/users/route.ts`, `admin-auth.ts`, `middleware.ts` |
| 1.3 | Payment links public RLS | Security | 10min | Migration file |
| 1.5 | Rotate exposed secrets | Security | 30min | `.env`, `.env.local` |
| 1.6 | Webhook HMAC verification | Security | 2h | `payments/webhook/route.ts` |
| 1.7 | Payment race condition | Security | 1h | `payments/initiate/route.ts` |
| 2.1 | Duplicate breadcrumb schemas | SEO | 10min | `layout.tsx` |
| 2.2 | Fleet breadcrumb duplicate | SEO | 5min | `fleet/layout.tsx`, `fleet/page.tsx` |
| 2.3 | Fleet client-side rendering | SEO + Perf | 2h | `fleet/page.tsx` |
| 2.4 | Fleet images unoptimized | SEO | 5min | `HomeClient.tsx` |
| 2.5 | Pay page not noindexed | SEO | 5min | `pay/[id]/page.tsx` |
| 2.6 | Markdown asterisks in HTML | SEO | 2min | `HomeClient.tsx` |

### TIER 2 — Strongly Recommended (Performance + UX)

| # | Issue | Dimension | Effort |
|---|-------|-----------|--------|
| 3.2 | `select('*')` over-fetching | Performance | 30min |
| 3.7 | BookingForm lazy loading | Performance | 15min |
| 3.9 | Image optimization | Performance | 20min |
| 4.1 | Date input type | UX | 30min |
| 4.2 | Route → form pre-fill | UX | 20min |
| 4.6 | Header Book Now scroll | UX | 10min |
| 6.1 | Booking form keyboard focus | Accessibility | 5min |
| 6.2 | Loading spinner announcement | Accessibility | 5min |
| 6.3 | Mobile menu focus trap | Accessibility | 1h |
| 6.5 | prefers-reduced-motion | Accessibility | 5min |
| 5.1 | Blog inline styles → CSS module | UI | 30min |
| 5.2 | Skeleton hardcoded colors | UI | 15min |
| 5.3 | ScrollAnimations attribute-based query | UI | 20min |

### TIER 3 — Sprint-Level (Should Fix)

| # | Issue | Dimension | Effort |
|---|-------|-----------|--------|
| 1.9-1.12 | API rate limiting | Security | 2h |
| 1.13 | CSRF protection | Security | 3h |
| 1.14 | Blog XSS sanitization | Security | 30min |
| 1.15 | Email HTML escaping | Security | 15min |
| 1.16-1.17 | Input validation caps | Security | 20min |
| 2.7 | Missing canonicals | SEO | 15min |
| 2.8 | Missing Twitter images | SEO | 15min |
| 2.9 | Title tag lengths | SEO | 10min |
| 2.10 | Sitemap lastModified | SEO | 20min |
| 3.8 | Suspense boundaries | Performance | 2h |
| 3.11 | ClientShell for layout | Performance | 1h |
| 4.9 | City pages CSS modules | UX | 2h |
| 4.11 | 404 page enrichment | UX | 30min |
| 6.4 | Fleet loading announcement | Accessibility | 5min |
| 6.6 | Map accessible name | Accessibility | 5min |
| 6.8 | Gallery text alternative | Accessibility | 15min |

### TIER 4 — Polish (Nice to Have)

All remaining nits — inline → CSS module migrations, hardcoded → token colors, duplicated keyframes, admin toasts, e2e tests, etc.

---

## Summary

| Dimension | Critical | High | Nits | Total |
|-----------|----------|------|------|-------|
| Security | 8 | 13 | 3 | 24 |
| SEO | 6 | 10 | 7 | 23 |
| Performance | 8 | 11 | 12 | 31 |
| UX / Conversion | 8 | 9 | 8 | 25 |
| UI / Visual | 4 | 8 | 5 | 17 |
| Accessibility | 2 | 4 | 3 | 9 |
| Code Quality | 4 | 9 | 3 | 16 |
| **Total** | **40** | **64** | **41** | **145** |

**Bottom Line:** Site has strong foundation — solid SEO structure, good trust architecture, clean heading hierarchy, multiple conversion channels. 145 issues across 7 dimensions. Fix Tier 1 (12 critical) immediately to close security holes and SEO blockers. Tier 2 (14 critical/high) for performance, UX, and accessibility wins.

Total estimated effort for all tiers: ~3-5 days of focused engineering work. Tier 1 alone: ~6-8 hours.
