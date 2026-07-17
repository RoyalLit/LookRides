import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RoutePage from '@/components/RoutePage';
import { getRouteBySlug, getAllRouteSlugs } from '@/lib/routes-data';
import { getPricingRouteByCities } from '@/lib/queries';
import { SITE_URL } from '@/lib/config';

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
    openGraph: {
      title: route.metaTitle,
      description: route.metaDesc,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${route.from} to ${route.to} Taxi - LookRides` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: route.metaTitle,
      description: route.metaDesc,
      images: ['/og-image.png'],
    },
    alternates: { canonical: `${SITE_URL}/routes/${route.slug}` },
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
