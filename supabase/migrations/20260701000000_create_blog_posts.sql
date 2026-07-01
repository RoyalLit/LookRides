CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  keywords TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true')
  WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');
