import type { MetadataRoute } from 'next';
import { allRoutes } from '@/lib/routes-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lookrides.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/fleet`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const topRoutes = ['chandigarh-to-delhi', 'chandigarh-to-manali', 'chandigarh-to-shimla'];

  const routePages = allRoutes.map((r) => ({
    url: `${baseUrl}/routes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: topRoutes.includes(r.slug) ? ('daily' as const) : ('weekly' as const),
    priority: topRoutes.includes(r.slug) ? 0.95 : 0.9,
  }));

  return [...staticPages, ...routePages];
}
