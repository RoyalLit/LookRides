import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostData } from '@/lib/markdown';
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
      openGraph: { title: post.title, description: post.excerpt },
      alternates: { canonical: `https://lookrides.com/blog/${slug}` },
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
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "LookRides" },
    "publisher": { "@type": "Organization", "name": "LookRides", "logo": { "@type": "ImageObject", "url": "https://lookrides.com/logo.png" } }
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
