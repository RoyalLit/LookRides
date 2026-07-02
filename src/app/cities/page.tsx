import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Taxi Service Cities | LookRides — Chandigarh, Mohali, Zirakpur & Derabassi';
const description = 'LookRides provides premium taxi services in Chandigarh, Mohali, Zirakpur, Panchkula & Derabassi. Book airport transfers and outstation trips with fixed transparent pricing.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Chandigarh taxi', 'Mohali cab', 'Zirakpur taxi service', 'Tricity taxi', 'LookRides service cities', 'taxi in Panchkula', 'cab in Derabassi'],
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: 'https://lookrides.com/cities' },
};

const citiesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lookrides.com" },
        { "@type": "ListItem", "position": 2, "name": "Service Cities", "item": "https://lookrides.com/cities" },
      ],
    },
    {
      "@type": "CollectionPage",
      "name": "LookRides Service Cities",
      "description": "Premium taxi service locations across Tricity — Chandigarh, Mohali, Zirakpur, Panchkula & Derabassi.",
    },
  ],
};

export default function CitiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citiesJsonLd) }} />
    <div style={{ paddingTop: '100px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)' }}>Our Service Cities</h1>
      <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem' }}>We provide premium taxi services across the Tricity (Chandigarh, Mohali, Panchkula) and surrounding areas including Zirakpur and Derabassi.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>Chandigarh</h2>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '1rem' }}>Premium taxi and cab service in Chandigarh for airport transfers and outstation trips to Delhi, Manali, Shimla.</p>
          <Link href="/cities/chandigarh" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Chandigarh Services &rarr;</Link>
        </div>
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>Mohali (SAS Nagar)</h2>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '1rem' }}>Cab service in Mohali covering all sectors. Fast airport transfers to IXC and outstation rides.</p>
          <Link href="/cities/mohali" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Mohali Services &rarr;</Link>
        </div>
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>Zirakpur</h2>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '1rem' }}>Strategic location on NH44 — fastest highway exit for Delhi outstation trips and airport transfers.</p>
          <Link href="/cities/zirakpur" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Zirakpur Services &rarr;</Link>
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>Also Serving</h2>
        <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '1rem' }}>We also provide pickup and drop services in:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>Panchkula</span>
          <span style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>Derabassi</span>
          <span style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>Kharar</span>
          <span style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>New Chandigarh</span>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/#booking-widget" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Book a Cab Now
        </Link>
      </div>
    </div>
    </>
  );
}
