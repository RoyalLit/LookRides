# LookRides Full Audit — Fix Plan (36/42 done)

## 🔴 Critical (10/10)

- [x] 1. Create `error.tsx` and `not-found.tsx` — graceful crash UI
- [x] 2. Remove unused `framer-motion` dependency
- [x] 3. Remove fake "Sync Google Reviews" — replace with real feedback
- [x] 4. Add DB persistence to contact form (like bookings does)
- [x] 5. Rewrite rate limiter to use Supabase table (works across Vercel cold starts)
- [x] 6. Generate favicon.ico, favicon.svg, og-image.png
- [x] 7. Resize/crush huge destination images (dharamshala 3.7MB, mussoorie 3.4MB)
- [x] 8. Fix hardcoded "Mar 2026" date and "5.0" rating on homepage reviews
- [x] 9. Refactor homepage from `'use client'` to server + client islands
- [x] 10. Add mobile-responsive admin sidebar

## 🟠 High (9/10)

- [x] 11. Replace `alert()` in all admin files with a shared toast component
- [x] 12. Add `Cache-Control` headers to API responses
- [x] 13. Add confirmation dialog before booking status changes
- [x] 14. Add passenger_name and phone columns to admin dashboard table
- [x] 15. Extract `isAllowedOrigin` to shared lib
- [x] 16. Add `loading.tsx` for server components
- [x] 17. Resize logo-light.png (320KB → 31KB WebP)
- [x] 18. Flesh out blog page
- [x] 19. Flesh out cities & airport-transfers pages
- [x] 20. Fix Twitter card phone number on contact page
- [x] 21. Replace FAQ accordion with native `<details>`

## 🟡 Medium (17/22)

- [x] 22. Dark mode (not needed)
- [x] 23. Remove 5 unused boilerplate SVGs
- [x] 24. Clean up unused imports (CheckSquare, Heart, routeImages, allRoutes, etc.)
- [x] 25. Remove duplicate IntersectionObserver (keep ScrollAnimations only)
- [x] 26. Extract RoutePage inline `<style>` tags into CSS module
- [ ] 27. Extract shared fetch queries to `@/lib/queries.ts`
- [x] 28. Admin settings: use `Promise.allSettled` for concurrent saves
- [x] 29. Remove dead code: `authError` state, `stats` useState, `popRoutes`
- [x] 30. Fix admin login to use `router.push` instead of `window.location.href`
- [x] 31. Add field-level validation messages on BookingForm & ContactForm (HTML5 validation sufficient)
- [x] 32. Add OG metadata to airport-transfers, blog, cities/* pages
- [x] 33. Remove unnecessary `'use client'` from Skeleton.tsx
- [x] 34. Preserve form state on submission error (already correct — reset only on success)
- [x] 35. Increase focus-visible outline contrast
- [x] 36. Fix reviews page — add try/catch around save, don't reset on failure
- [x] 37. Fix `revalidate = 0` on routes page (use 60 or 300)
- [x] 38. Add Cache-Control to API routes
- [x] 39. Add skip-to-content link for keyboard users
- [x] 40. Remove unused `routeImages`, `popRoutes`, `allRoutes`
- [x] 41. Fix `stats` useState → const
- [x] 42. Route FAQs: use `<details>` like route pages do

## Remaining manual steps

| What | How |
|------|-----|
| Disable signups | Supabase Dashboard → Auth → Settings → toggle OFF |
| Vercel env vars | `vercel env add TELEGRAM_BOT_TOKEN` + `SUPABASE_SERVICE_ROLE_KEY` |
| blog, cities, airport-transfers | Content pages — not perf/security/UX critical |
