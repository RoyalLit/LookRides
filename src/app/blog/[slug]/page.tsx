import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostData } from '@/lib/markdown';
import { SITE_URL } from '@/lib/config';
import Link from 'next/link';
import styles from './blog.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} | LookRides Blog`,
      description: post.excerpt,
      keywords: post.keywords,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [`${SITE_URL}/og-image.png`],
      },
      alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;

  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": SITE_URL + "/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `${SITE_URL}/blog/${slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.coverImage || `${SITE_URL}/og-image.png`,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Organization", "name": "LookRides", "url": `${SITE_URL}/about` },
        "publisher": { "@type": "Organization", "name": "LookRides", "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className={styles.article}>
        <Link href="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.date}>
            Published on {post.date}
          </div>
        </header>
        <div
          className={styles.markdownContent}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </>
  );
}
