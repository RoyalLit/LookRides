import { supabaseAdmin } from './supabase-admin';

export async function getActiveFleet() {
  const { data, error } = await supabaseAdmin
    .from('fleet')
    .select('id, name, seats, bags, image_url, category, is_active, description, price_per_km, price_desc, order_index')
    .eq('is_active', true)
    .order('order_index');

  if (error) {
    console.error('Error fetching active fleet:', error);
    return [];
  }
  return data;
}

export async function getFleet() {
  const { data, error } = await supabaseAdmin
    .from('fleet')
    .select('id, name, seats, bags, image_url, category, is_active, description, price_per_km, luggage_capacity, ac, night_halt_charge, driver_allowance')
    .order('order_index');

  if (error) {
    console.error('Error fetching fleet:', error);
    return [];
  }
  return data;
}

export async function getPricingRoutes() {
  const { data, error } = await supabaseAdmin
    .from('pricing_routes')
    .select('id, from_location, to_location, from_city, to_city, slug, base_price, price_per_km, sedan_price, suv_price, category, is_active')
    .order('order_index');

  if (error) {
    console.error('Error fetching pricing routes:', error);
    return [];
  }
  return data;
}

export async function getPricingRouteBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('pricing_routes')
    .select('id, from_location, to_location, slug, base_price, price_per_km, distance_km, estimated_duration, category, is_active, description')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching route ${slug}:`, error);
    return null;
  }
  return data;
}

export async function getPricingRouteByCities(fromCity: string, toCity: string) {
  const { data, error } = await supabaseAdmin
    .from('pricing_routes')
    .select('sedan_price, suv_price')
    .eq('from_city', fromCity)
    .eq('to_city', toCity)
    .single();

  if (error) {
    console.error(`Error fetching route ${fromCity} to ${toCity}:`, error);
    return null;
  }
  return data;
}

export async function getVisibleReviews(limit = 6) {
  const { data, error } = await supabaseAdmin
    .from('reviews')
    .select('id, author, text, rating, city, is_visible, created_at')
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  return data;
}

export async function getSiteSettings() {
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('key, value')
    .in('key', ['google_rating', 'review_count', 'phone', 'email']);

  if (error) {
    console.error('Error fetching site settings:', error);
    return [];
  }
  return data;
}
