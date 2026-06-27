import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostData } from '@/lib/markdown';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Cache for 1 hour

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
      <article style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <Link href="/blog" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 'bold', marginBottom: '2rem', display: 'inline-block' }}>
          &larr; Back to Blog
        </Link>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)', lineHeight: '1.2' }}>{post.title}</h1>
          <div style={{ color: '#64748b', fontSize: '1rem' }}>
            Published on {post.date}
          </div>
        </header>

        {/* Global Markdown Styles inside the article */}
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
        
        <style>{`
          .markdown-content { font-size: 1.1rem; line-height: 1.8; color: #334155; }
          .markdown-content h2 { font-size: 2rem; color: var(--primary-navy); margin-top: 3rem; margin-bottom: 1rem; }
          .markdown-content h3 { font-size: 1.5rem; color: var(--primary-navy); margin-top: 2rem; margin-bottom: 1rem; }
          .markdown-content p { margin-bottom: 1.5rem; }
          .markdown-content ul, .markdown-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
          .markdown-content li { margin-bottom: 0.5rem; }
          .markdown-content a { color: var(--accent-gold); text-decoration: underline; font-weight: 600; }
          .markdown-content strong { color: var(--primary-navy); }
          .markdown-content blockquote { border-left: 4px solid var(--accent-gold); padding-left: 1rem; margin-left: 0; font-style: italic; color: #64748b; }
        `}</style>
      </article>
    </>
  );
}
