-- ==========================================================
-- Security Fixes Batch
-- 1. Add missing passenger_name column to booking_requests
-- 2. Restrict booking_requests INSERT to authenticated only
-- 3. Restrict site_settings SELECT to authenticated only
-- 4. Create rate_limits table for persistent rate limiting
-- ==========================================================

-- 1. Add passenger_name column if missing (fixes C2 — broken booking form)
ALTER TABLE booking_requests ADD COLUMN IF NOT EXISTS passenger_name TEXT;

-- 2. Restrict booking_requests: only authenticated users can INSERT
--    (Public users go through /api/bookings which uses service_role key)
DROP POLICY IF EXISTS "Anyone can insert booking requests" ON booking_requests;
CREATE POLICY "Authenticated users can insert booking requests"
  ON booking_requests FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Restrict site_settings: only authenticated users can SELECT
--    (Public settings are served via /api/public/settings endpoint)
DROP POLICY IF EXISTS "Anyone can view site settings" ON site_settings;
CREATE POLICY "Authenticated users can view site settings"
  ON site_settings FOR SELECT USING (auth.role() = 'authenticated');

-- 4. Create rate_limits table for persistent rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
  ON rate_limits (ip_address, endpoint, window_start);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Only the service_role can manage rate_limits (no public access needed)
CREATE POLICY "Service role can manage rate limits"
  ON rate_limits FOR ALL USING (auth.role() = 'service_role');
