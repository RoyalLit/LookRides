ALTER TABLE reviews ADD COLUMN IF NOT EXISTS google_review_id TEXT UNIQUE;

ALTER POLICY "Anyone can view visible reviews" ON reviews USING (is_visible = true);
