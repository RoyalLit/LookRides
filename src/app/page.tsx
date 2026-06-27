import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60;

async function fetchData() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );

  const [fleetRes, pricingRes, reviewRes, settingsRes] = await Promise.all([
    supabase.from('fleet').select('*').eq('is_active', true).order('order_index'),
    supabase.from('pricing_routes').select('*').order('order_index'),
    supabase.from('reviews').select('*').eq('is_visible', true).order('created_at', { ascending: false }).limit(6),
    supabase.from('site_settings').select('key, value'),
  ]);

  const settingsMap: Record<string, string> = {};
  if (settingsRes.data) {
    for (const row of settingsRes.data) {
      settingsMap[row.key] = row.value;
    }
  }

  return {
    fleet: fleetRes.data || [],
    pricing: pricingRes.data || [],
    reviews: reviewRes.data || [],
    settings: {
      google_rating: settingsMap.google_rating || '4.8',
      review_count: settingsMap.review_count || '54',
    },
  };
}

export default async function Home() {
  const { fleet, pricing, reviews, settings } = await fetchData();

  return (
    <HomeClient
      fleet={fleet}
      pricing={pricing}
      reviews={reviews}
      settings={settings}
      loading={false}
    />
  );
}
