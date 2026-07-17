import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_PHONE, SITE_URL } from '@/lib/config';

const title = 'Taxi in Mohali @ ₹599 | LookRides';
const description = 'Book taxi in Mohali from ₹599. Premium cab service in Mohali (SAS Nagar) for airport transfers to IXC, outstation trips to Delhi, Manali, Shimla. Fixed pricing, verified drivers, 24/7 service.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Mohali taxi', 'Mohali cab service', 'taxi in Mohali', 'Mohali airport taxi', 'Mohali to Chandigarh taxi', 'cab service Mohali'],
  openGraph: { title, description, images: SITE_URL + '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description, images: SITE_URL + '/og-image.png' },
  alternates: { canonical: SITE_URL + '/cities/mohali' },
};

const citySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": SITE_URL + "/cities" },
        { "@type": "ListItem", "position": 3, "name": "Mohali", "item": SITE_URL + "/cities/mohali" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "name": "LookRides Mohali",
      "image": "https://lookrides.com/logo.png",
      "telephone": BUSINESS_PHONE,
      "url": SITE_URL + "/cities/mohali",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mohali",
        "addressRegion": "PB",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹",
      "areaServed": [
        { "@type": "City", "name": "Mohali" },
        { "@type": "City", "name": "Chandigarh" }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Intercity Taxi Service",
      "provider": { "@type": "LocalBusiness", "name": "LookRides" },
      "areaServed": { "@type": "City", "name": "Mohali" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much is a cab from Mohali to Chandigarh Airport?",
          "acceptedAnswer": { "@type": "Answer", "text": "A taxi from Mohali to Chandigarh Airport (IXC) starts at ₹599 for a sedan. The journey takes 20-30 minutes. All tolls and taxes are included." }
        },
        {
          "@type": "Question",
          "name": "What areas of Mohali do you cover?",
          "acceptedAnswer": { "@type": "Answer", "text": "We cover all sectors of Mohali including Sector 70, 71, 78, Phase 3B2, Phase 7, Aerocity, IT Park, and all residential areas for doorstep pickup." }
        }
      ]
    }
  ]
};

export default function MohaliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)' }}>Premium Taxi Services in Mohali (SAS Nagar)</h1>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            LookRides provides exceptional intercity cab services originating from Mohali (SAS Nagar). From convenient pickups around the PCA Stadium or Aerocity, to reliable <strong>airport transfers to Shaheed Bhagat Singh International Airport (IXC)</strong> just a short drive away. We specialize in fast outstation rides to Delhi, Manali, and Shimla.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            We pride ourselves on <strong>fixed, transparent pricing</strong> with absolutely no hidden fees. Our expert drivers are intimately familiar with both plain highways and challenging Himalayan terrains, ensuring your safety and comfort at every turn.
          </p>
          
          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Popular Routes from Mohali</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mohali to Chandigarh Airport Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Quick 20-min ride to IXC airport from any Mohali sector. Flight tracking included. Starting ₹599.</p>
              <Link href="/routes/mohali-to-chandigarh-airport" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mohali to Delhi Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Fast 4.5 hr journey via NH44. Direct drop to IGI Airport or Delhi city. Starting ₹3,999.</p>
              <Link href="/routes/chandigarh-to-delhi" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mohali to Manali Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Scenic 7-8 hr hill-station ride. Experienced mountain drivers. Starting ₹5,499.</p>
              <Link href="/routes/chandigarh-to-manali" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mohali to Shimla Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Quick 3 hr climb via NH5. Comfortable AC sedan or SUV. Starting ₹2,799.</p>
              <Link href="/routes/chandigarh-to-shimla" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mohali to Amritsar Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Visit Golden Temple. 4 hr drive via Kharar bypass. Starting ₹3,499.</p>
              <Link href="/routes/mohali-to-amritsar" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
          </ul>

          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Areas We Serve in Mohali</h2>
          <p>Our cab service covers all sectors and phases of Mohali (SAS Nagar) including Sector 70, 71, 78, Phase 3B2, Phase 5, Phase 7, Phase 9, Phase 11, Aerocity, IT Park, Industrial Area, and Mohali Hills. We provide doorstep pickup from any Mohali location for both outstation trips and airport transfers.</p>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/?pickup=Mohali" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Your Mohali Cab Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
