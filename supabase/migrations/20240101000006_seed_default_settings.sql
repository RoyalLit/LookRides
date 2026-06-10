INSERT INTO site_settings (key, value) VALUES
  ('google_rating', '"4.8"'),
  ('review_count', '"54"'),
  ('notification_email', '"info@lookride.in"')
ON CONFLICT (key) DO NOTHING;
