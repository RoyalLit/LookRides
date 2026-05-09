-- Run this in your Supabase SQL Editor

-- 1. Create the booking_requests table
CREATE TABLE booking_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow anonymous users to insert new booking requests (from the frontend form)
CREATE POLICY "Allow public insert" ON booking_requests
  FOR INSERT WITH CHECK (true);

-- Only allow authenticated admins to view or update requests
CREATE POLICY "Allow admin select" ON booking_requests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update" ON booking_requests
  FOR UPDATE USING (auth.role() = 'authenticated');
