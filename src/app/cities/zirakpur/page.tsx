import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_PHONE, SITE_URL } from '@/lib/config';

const title = 'Taxi in Zirakpur @ ₹799 | LookRides';
const description = 'Book taxi in Zirakpur from ₹799. Premium cab service in Zirakpur for Delhi outstation trips, Chandigarh airport transfers. Fixed pricing on NH44 highway. Verified drivers, 24/7 availability.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Zirakpur taxi', 'Zirakpur cab service', 'taxi in Zirakpur', 'Zirakpur airport taxi', 'Zirakpur to Delhi taxi', 'cab service Zirakpur'],
  openGraph: { title, description, images: SITE_URL + '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description, images: SITE_URL + '/og-image.png' },
  alternates: { canonical: SITE_URL + '/cities/zirakpur' },
};

const citySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": SITE_URL + "/cities" },
        { "@type": "ListItem", "position": 3, "name": "Zirakpur", "item": SITE_URL + "/cities/zirakpur" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "name": "LookRides Zirakpur",
      "image": "https://lookrides.com/logo.png",
      "telephone": BUSINESS_PHONE,
      "url": SITE_URL + "/cities/zirakpur",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zirakpur",
        "addressRegion": "PB",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹",
      "areaServed": [
        { "@type": "City", "name": "Zirakpur" },
        { "@type": "City", "name": "Derabassi" }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Intercity Taxi Service",
      "provider": { "@type": "LocalBusiness", "name": "LookRides" },
      "areaServed": { "@type": "City", "name": "Zirakpur" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much is a taxi from Zirakpur to Delhi?",
          "acceptedAnswer": { "@type": "Answer", "text": "Zirakpur to Delhi taxi starts at ₹3,499 for a sedan. Since Zirakpur sits right on NH44, you save 30-40 minutes of Chandigarh city traffic. All tolls and taxes are included." }
        },
        {
          "@type": "Question",
          "name": "What areas of Zirakpur do you serve?",
          "acceptedAnswer": { "@type": "Answer", "text": "We cover all of Zirakpur including VIP Road, Shimla-Kalka Highway, Paradise Colony, Emaar Digital Greens, Green Enclave, and all housing colonies." }
        }
      ]
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
          
          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Popular Routes from Zirakpur</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Delhi Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Fast NH44 highway journey. Avoid Chandigarh traffic entirely. Direct drop to IGI or Delhi city. Starting ₹3,499.</p>
              <Link href="/routes/zirakpur-to-delhi" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Chandigarh Airport Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>30-min ride to IXC airport via Airport Road. Flight tracking included. Starting ₹799.</p>
              <Link href="/routes/derabassi-to-chandigarh-airport" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Manali Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Scenic hill-station ride starting from the Himalayan Expressway. Starting ₹5,499.</p>
              <Link href="/routes/chandigarh-to-manali" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zirakpur to Shimla Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Comfortable climb to the Queen of Hills right from the Himalayan Expressway. Starting ₹2,799.</p>
              <Link href="/routes/chandigarh-to-shimla" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
          </ul>

          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Areas We Serve in Zirakpur</h2>
          <p>Our cab service covers all locations in Zirakpur including VIP Road, Shimla-Kalka Highway, Paradise Colony, Emaar Digital Greens, Green Enclave, Omaxe City, Lake Elsinore, and all residential colonies. Being located right on NH44, we offer the fastest exit to Delhi and convenient access to Chandigarh Airport.</p>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/?pickup=Zirakpur" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Your Zirakpur Cab Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
