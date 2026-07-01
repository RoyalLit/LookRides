import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';

export async function getActiveFleet() {
  const { data, error } = await supabase
    .from('fleet')
    .select('*')
    .eq('is_active', true)
    .order('order_index');

  if (error) {
    console.error('Error fetching active fleet:', error);
    return [];
  }
  return data;
}

export async function getFleet() {
  const { data, error } = await supabase
    .from('fleet')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching fleet:', error);
    return [];
  }
  return data;
}

export async function getPricingRoutes() {
  const { data, error } = await supabase
    .from('pricing_routes')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching pricing routes:', error);
    return [];
  }
  return data;
}

export async function getPricingRouteBySlug(slug: string) {
  const { data, error } = await supabase
    .from('pricing_routes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching route ${slug}:`, error);
    return null;
  }
  return data;
}

export async function getPricingRouteByCities(fromCity: string, toCity: string) {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
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
    .select('key, value');

  if (error) {
    console.error('Error fetching site settings:', error);
    return [];
  }
  return data;
}
