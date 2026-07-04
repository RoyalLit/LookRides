import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_PHONE, SITE_URL } from '@/lib/config';

const title = 'Taxi in Chandigarh @ ₹499 | Premium Cab Service Chandigarh | LookRides';
const description = 'Book taxi in Chandigarh from ₹499. Premium cab service in Chandigarh for airport transfers, outstation trips to Delhi, Manali, Shimla. Fixed pricing, verified drivers, 24/7 availability.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Chandigarh taxi', 'Chandigarh cab service', 'taxi in Chandigarh', 'Chandigarh airport taxi', 'Chandigarh to Manali taxi', 'cab service Chandigarh'],
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: SITE_URL + '/cities/chandigarh' },
};

const citySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": SITE_URL + "/cities" },
        { "@type": "ListItem", "position": 3, "name": "Chandigarh", "item": SITE_URL + "/cities/chandigarh" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "name": "LookRides Chandigarh",
      "image": "https://lookrides.com/logo.png",
      "telephone": BUSINESS_PHONE,
      "url": SITE_URL + "/cities/chandigarh",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chandigarh",
        "addressRegion": "CH",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹",
      "areaServed": [
        { "@type": "City", "name": "Chandigarh" },
        { "@type": "City", "name": "Mohali" },
        { "@type": "City", "name": "Panchkula" }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Intercity Taxi Service",
      "provider": { "@type": "LocalBusiness", "name": "LookRides" },
      "areaServed": { "@type": "City", "name": "Chandigarh" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much is a taxi in Chandigarh?",
          "acceptedAnswer": { "@type": "Answer", "text": "Local taxi in Chandigarh starts from ₹499 for airport transfers. Outstation fares start from ₹1,999 for Ludhiana, ₹2,799 for Shimla, ₹3,499 for Amritsar, ₹3,999 for Delhi, and ₹5,499 for Manali. All fares include toll, fuel, and GST." }
        },
        {
          "@type": "Question",
          "name": "What is the best cab service in Chandigarh?",
          "acceptedAnswer": { "@type": "Answer", "text": "LookRides is rated 4.8★ on Google with verified drivers, fixed transparent pricing, and 24/7 support. We offer premium sedan and SUV fleet for airport transfers and outstation trips across North India." }
        }
      ]
    }
  ]
};

export default function ChandigarhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)' }}>Premium Taxi Services in Chandigarh</h1>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            LookRides provides top-tier intercity cab services originating from Chandigarh. Whether you need a reliable <strong>airport transfer from Shaheed Bhagat Singh International Airport (IXC)</strong>, a swift outstation ride to Delhi (IGI Airport), or a serene holiday trip to Manali or Shimla, our premium fleet of Sedans and SUVs is available 24/7.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            We pride ourselves on <strong>fixed, transparent pricing</strong> with absolutely no hidden fees. Our expert drivers are intimately familiar with both plain highways and challenging Himalayan terrains, ensuring your safety and comfort at every turn.
          </p>
          
          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Popular Routes from Chandigarh</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Delhi Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Fast 4.5 hr journey via NH44. Direct drop to IGI Airport or Delhi city. Starting ₹3,999.</p>
              <Link href="/routes/chandigarh-to-delhi" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Manali Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Scenic 7-8 hr hill-station ride via Kullu. Experienced mountain drivers. Starting ₹5,499.</p>
              <Link href="/routes/chandigarh-to-manali" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Shimla Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Quick 3 hr climb to the Queen of Hills via NH5. Perfect weekend getaway. Starting ₹2,799.</p>
              <Link href="/routes/chandigarh-to-shimla" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Amritsar Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Visit Golden Temple &amp; Wagah Border. 4 hr drive via NH344A. Starting ₹3,499.</p>
              <Link href="/routes/chandigarh-to-amritsar" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Dehradun Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Gateway to Mussoorie &amp; Rishikesh. Smooth NH7 highway. Starting ₹3,799.</p>
              <Link href="/routes/chandigarh-to-dehradun" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Dharamshala Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Scenic drive to McLeodganj &amp; Bhagsu. Kangra valley views. Starting ₹4,499.</p>
              <Link href="/routes/chandigarh-to-dharamshala" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
          </ul>

          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Airport Transfers from Chandigarh</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Delhi Airport Taxi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Direct transfer to IGI Terminal 1/3. Flight tracking included. Starting ₹4,299.</p>
              <Link href="/routes/chandigarh-to-delhi-airport" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</Link>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh Airport (IXC) Pickup</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Premium airport transfer from IXC to anywhere in Tricity. Starting ₹499.</p>
              <Link href="/airport-transfers" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Airport Transfers &rarr;</Link>
            </li>
          </ul>

          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Areas We Serve in Chandigarh</h2>
          <p>Our cab service covers all sectors and areas of Chandigarh including Sector 17, Sector 22, Sector 35, Sector 26 (IT Park), Sector 9 (Panjab University), Sector 12 (PGI Hospital), Sector 38 (Market), Manimajra, Industrial Area, and all residential sectors. We provide doorstep pickup from any location in Chandigarh for outstation trips and airport transfers.</p>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/#booking-widget" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Your Chandigarh Cab Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
