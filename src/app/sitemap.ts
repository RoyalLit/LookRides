import type { MetadataRoute } from 'next';
import { allRoutes } from '@/lib/routes-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lookrides.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/fleet`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const routePages = allRoutes.map((r) => ({
    url: `${baseUrl}/routes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: r.slug === 'chandigarh-to-delhi' ? 0.95 : 0.9,
  }));

  return [...staticPages, ...routePages];
}
