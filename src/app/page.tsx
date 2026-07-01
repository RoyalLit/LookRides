import HomeClient from '@/components/HomeClient';
import { getActiveFleet, getPricingRoutes, getVisibleReviews, getSiteSettings } from '@/lib/queries';

export const revalidate = 60;

async function fetchData() {
  const [fleet, pricing, reviews, settingsRes] = await Promise.all([
    getActiveFleet(),
    getPricingRoutes(),
    getVisibleReviews(6),
    getSiteSettings(),
  ]);

  const settingsMap: Record<string, string> = {};
  if (settingsRes) {
    for (const row of settingsRes) {
      settingsMap[row.key] = row.value;
    }
  }

  return {
    fleet: fleet || [],
    pricing: pricing || [],
    reviews: reviews || [],
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
