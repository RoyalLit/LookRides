CREATE TABLE IF NOT EXISTS fleet (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Sedan',
  seats INTEGER NOT NULL DEFAULT 4,
  bags INTEGER NOT NULL DEFAULT 2,
  price_desc TEXT DEFAULT 'Fixed fare',
  image_url TEXT DEFAULT '/etios.png',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active fleet" ON fleet;
CREATE POLICY "Anyone can view active fleet"
  ON fleet FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage fleet" ON fleet;
CREATE POLICY "Authenticated users can manage fleet"
  ON fleet FOR ALL USING (auth.role() = 'authenticated');
