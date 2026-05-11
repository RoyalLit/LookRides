import type { Metadata } from 'next';
import RoutePage from '@/components/RoutePage';
import { getRouteBySlug } from '@/lib/routes-data';

const route = getRouteBySlug('chandigarh-to-jammu')!;

export const metadata: Metadata = {
  title: route.metaTitle,
  description: route.metaDesc,
  keywords: route.keywords,
  openGraph: { title: route.metaTitle, description: route.metaDesc },
  alternates: { canonical: `https://lookrides.com/routes/${route.slug}` },
};

export default function Page() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <RoutePage route={route} />
    </div>
  );
}
