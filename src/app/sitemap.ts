import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { allRoutes } from '@/lib/routes-data';
import { getAllPostSlugs } from '@/lib/markdown';
import { SITE_URL } from '@/lib/config';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function getFileDate(filePath: string, fallback: string): Date {
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime;
  } catch {
    return new Date(fallback);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticPages = [
    { url: baseUrl, lastModified: new Date('2026-07-01'), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/fleet`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/cities`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/cities/chandigarh`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/cities/mohali`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/cities/zirakpur`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/airport-transfers`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/routes`, lastModified: new Date('2026-07-01'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/cancellation`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const topRoutes = ['chandigarh-to-delhi', 'chandigarh-to-manali', 'chandigarh-to-shimla'];

  const routePages = allRoutes.map((r) => ({
    url: `${baseUrl}/routes/${r.slug}`,
    lastModified: new Date('2026-07-01'),
    changeFrequency: topRoutes.includes(r.slug) ? ('daily' as const) : ('weekly' as const),
    priority: topRoutes.includes(r.slug) ? 0.95 : 0.9,
  }));

  const blogPages = getAllPostSlugs().map((post) => {
    const postFile = path.join(postsDirectory, `${post.slug}.md`);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: getFileDate(postFile, '2026-07-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...routePages, ...blogPages];
}
