CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  passenger_name TEXT,
  phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert booking requests" ON booking_requests;
CREATE POLICY "Anyone can insert booking requests"
  ON booking_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view booking requests" ON booking_requests;
CREATE POLICY "Authenticated users can view booking requests"
  ON booking_requests FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update booking requests" ON booking_requests;
CREATE POLICY "Authenticated users can update booking requests"
  ON booking_requests FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete booking requests" ON booking_requests;
CREATE POLICY "Authenticated users can delete booking requests"
  ON booking_requests FOR DELETE USING (auth.role() = 'authenticated');
