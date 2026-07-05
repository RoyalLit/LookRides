import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',        // Internal Next.js build assets (chunks, fonts, etc.)
        ],
      },
    ],
    sitemap: 'https://lookrides.com/sitemap.xml',
  };
}
