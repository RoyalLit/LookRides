import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BookingRequest = {
  id: string;
  pickup_location: string;
  drop_location: string;
  date: string;
  time: string;
  passenger_name?: string;
  phone?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
};

export type FleetVehicle = {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  price_desc: string;
  image_url: string;
  is_active: boolean;
  order_index: number;
};

export type PricingRoute = {
  id: string;
  from_city: string;
  to_city: string;
  distance: string;
  sedan_price: string;
  suv_price: string;
  order_index: number;
};

export type GoogleReview = {
  id: string;
  author: string;
  text: string;
  rating: number;
  city: string;
  is_visible: boolean;
  created_at: string;
};
