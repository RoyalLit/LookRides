import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RoutePage from '@/components/RoutePage';
import { getRouteBySlug, getAllRouteSlugs } from '@/lib/routes-data';
import { getPricingRouteByCities } from '@/lib/queries';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Cache for 60 seconds

export async function generateStaticParams() {
  return getAllRouteSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};
  return {
    title: route.metaTitle,
    description: route.metaDesc,
    keywords: route.keywords,
    openGraph: { title: route.metaTitle, description: route.metaDesc },
    alternates: { canonical: `https://lookrides.com/routes/${route.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const staticRoute = getRouteBySlug(slug);
  if (!staticRoute) notFound();

  // Fetch live pricing from Supabase via centralized query
  const dbRoute = await getPricingRouteByCities(staticRoute.fromCity, staticRoute.toCity);

  const route = {
    ...staticRoute,
    sedanPrice: dbRoute?.sedan_price || staticRoute.sedanPrice,
    suvPrice: dbRoute?.suv_price || staticRoute.suvPrice,
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <RoutePage route={route} />
    </div>
  );
}
