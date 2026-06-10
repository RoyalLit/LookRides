import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RoutePage from '@/components/RoutePage';
import { getRouteBySlug, getAllRouteSlugs } from '@/lib/routes-data';

interface Props {
  params: Promise<{ slug: string }>;
}

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
  const route = getRouteBySlug(slug);
  if (!route) notFound();
  return (
    <div style={{ paddingTop: '80px' }}>
      <RoutePage route={route} />
    </div>
  );
}
