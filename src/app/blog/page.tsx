import type { Metadata } from 'next';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { SITE_URL } from '@/lib/config';
import styles from './blog.module.css';

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
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Travel Guides & Tips</h1>
        <p>
          Discover the best routes, hidden gems, and travel hacks for the North Indian region and beyond.
        </p>
      </div>

      {allPostsData.length === 0 ? (
        <p className={styles.noPosts}>No blog posts found. Check back soon!</p>
      ) : (
        <div className={styles.grid}>
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <div key={slug} className={styles.card}>
              <div className={styles.cardMeta}>{date}</div>
              <h2 className={styles.cardTitle}>
                <Link href={`/blog/${slug}`}>
                  {title}
                </Link>
              </h2>
              <p className={styles.cardExcerpt}>{excerpt}</p>
              <Link href={`/blog/${slug}`} className={styles.readMore}>
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
