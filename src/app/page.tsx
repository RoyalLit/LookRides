import HomeClient from '@/components/HomeClient';
import { getActiveFleet, getVisibleReviews, getSiteSettings } from '@/lib/queries';

export const revalidate = 60;

async function fetchData() {
  const [fleet, reviews, settingsRes] = await Promise.all([
    getActiveFleet(),
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
    reviews: reviews || [],
    settings: {
      google_rating: settingsMap.google_rating || '4.8',
      review_count: settingsMap.review_count || '54',
    },
  };
}

export default async function Home() {
  const { fleet, reviews, settings } = await fetchData();

  return (
    <HomeClient
      fleet={fleet}
      reviews={reviews}
      settings={settings}
      loading={false}
    />
  );
}
