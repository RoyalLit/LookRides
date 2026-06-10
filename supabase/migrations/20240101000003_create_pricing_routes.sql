CREATE TABLE IF NOT EXISTS pricing_routes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  distance TEXT,
  sedan_price TEXT,
  suv_price TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE pricing_routes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active pricing routes" ON pricing_routes;
CREATE POLICY "Anyone can view active pricing routes"
  ON pricing_routes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage pricing routes" ON pricing_routes;
CREATE POLICY "Authenticated users can manage pricing routes"
  ON pricing_routes FOR ALL USING (auth.role() = 'authenticated');
