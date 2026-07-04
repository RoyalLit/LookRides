import type { Metadata } from 'next';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { SITE_URL } from '@/lib/config';

const title = 'Blog | LookRides — Travel Tips & Destination Guides';
const description = 'Read the latest travel tips, destination guides, and updates from LookRides. Discover the best routes, hidden gems, and travel hacks for the Tricity region and beyond.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: SITE_URL + '/blog' },
};

const blogIndexJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": SITE_URL + "/blog" },
      ],
    },
    {
      "@type": "CollectionPage",
      "name": "LookRides Travel Blog",
      "description": "Travel tips, destination guides, and route information for North India road trips.",
    },
  ],
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }} />
    <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)' }}>Travel Guides & Tips</h1>
      <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '3rem' }}>
        Discover the best routes, hidden gems, and travel hacks for the North Indian region and beyond.
      </p>

      {allPostsData.length === 0 ? (
        <p>No blog posts found. Check back soon!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <div key={slug} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>{date}</div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '1rem', lineHeight: '1.4' }}>
                <Link href={`/blog/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {title}
                </Link>
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '1.5rem', flexGrow: 1 }}>{excerpt}</p>
              <Link href={`/blog/${slug}`} style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Read Article &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
