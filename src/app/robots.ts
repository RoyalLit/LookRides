import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/_next/',        // Internal Next.js build assets (chunks, fonts, etc.)
          '/*?*',           // Block all query-param variants (booking form, UTM spam, etc.)
        ],
      },
    ],
    sitemap: 'https://lookrides.com/sitemap.xml',
  };
}
