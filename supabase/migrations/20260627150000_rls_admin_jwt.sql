-- ==========================================================
-- RLS Hardening: Restrict admin table writes to is_admin users
-- Defense-in-depth: even if anon key + user JWT is used,
-- only users with is_admin=true can modify these tables.
-- ==========================================================

-- 1. Fleet: ONLY admins can INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Authenticated users can manage fleet" ON fleet;
CREATE POLICY "Admins can manage fleet"
  ON fleet FOR ALL USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');

-- 2. Pricing Routes: ONLY admins can INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Authenticated users can manage pricing routes" ON pricing_routes;
CREATE POLICY "Admins can manage pricing routes"
  ON pricing_routes FOR ALL USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');

-- 3. Reviews: ONLY admins can INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON reviews;
CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');

-- 4. Booking Requests: ONLY admins can UPDATE/DELETE (anyone can INSERT via /api/bookings)
DROP POLICY IF EXISTS "Authenticated users can update booking requests" ON booking_requests;
CREATE POLICY "Admins can update booking requests"
  ON booking_requests FOR UPDATE USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');

DROP POLICY IF EXISTS "Authenticated users can delete booking requests" ON booking_requests;
CREATE POLICY "Admins can delete booking requests"
  ON booking_requests FOR DELETE USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');

-- 5. Site Settings: ONLY admins can INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON site_settings;
CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');
