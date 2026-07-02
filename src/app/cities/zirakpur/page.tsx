import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_PHONE } from '@/lib/config';

const title = 'Taxi Services in Zirakpur | LookRides';
const description = 'Premium cab and taxi services in Zirakpur for local rides, airport transfers, and outstation trips. Conveniently located on the Chandigarh-Delhi highway. Book online for fixed pricing.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'Zirakpur taxi, Zirakpur cab service, taxi in Zirakpur, Zirakpur airport taxi, Zirakpur to Chandigarh taxi',
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: 'https://lookrides.com/cities/zirakpur' },
};

const citySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "LookRides Zirakpur",
      "image": "https://lookrides.com/logo.png",
      "telephone": BUSINESS_PHONE,
      "url": "https://lookrides.com/cities/zirakpur",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zirakpur",
        "addressRegion": "PB",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Intercity Taxi Service",
      "provider": { "@type": "LocalBusiness", "name": "LookRides" },
      "areaServed": { "@type": "City", "name": "Zirakpur" }
    }
  ]
};

export default function ZirakpurPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)' }}>Premium Taxi Services in Zirakpur</h1>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            LookRides offers top-tier intercity cab services originating from Zirakpur. As the primary gateway connecting Punjab, Haryana, and Himachal Pradesh, Zirakpur is our strategic hub. We provide rapid outstation rides to Delhi, Manali, Shimla, and hassle-free <strong>airport transfers to Shaheed Bhagat Singh International Airport (IXC)</strong>.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Enjoy our <strong>fixed, transparent pricing</strong> with absolutely no hidden fees. Our experienced drivers know the bustling Zirakpur traffic and the serene highway routes perfectly, guaranteeing a safe, comfortable, and punctual journey.
          </p>
          
          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Popular Routes from Zirakpur / Tricity</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Delhi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Fast and reliable transfers to IGI Airport or New Delhi directly via NH44.</p>
              <Link href="/routes/chandigarh-to-delhi" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Shimla</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Comfortable climbs to the Queen of Hills starting right from the Himalayan Expressway.</p>
              <Link href="/routes/chandigarh-to-shimla" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Manali</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Scenic hill-station rides with experienced mountain drivers.</p>
              <Link href="/routes/chandigarh-to-manali" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
          </ul>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/#booking-widget" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Your Zirakpur Cab Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
