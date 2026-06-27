import type { Metadata } from 'next';

const title = 'Taxi Services in Chandigarh | LookRides';
const description = 'Premium cab and taxi services in Chandigarh for local rides, airport transfers to IXC/DEL, and outstation trips to Manali, Shimla, Delhi and more. Book online for fixed pricing.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'Chandigarh taxi, Chandigarh cab service, taxi in Chandigarh, Chandigarh airport taxi, Chandigarh to Manali taxi',
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: 'https://lookrides.com/cities/chandigarh' },
};

const citySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "LookRides Chandigarh",
      "image": "https://lookrides.com/logo.png",
      "telephone": "+919780426567",
      "url": "https://lookrides.com/cities/chandigarh",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chandigarh",
        "addressRegion": "CH",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Intercity Taxi Service",
      "provider": { "@type": "LocalBusiness", "name": "LookRides" },
      "areaServed": { "@type": "City", "name": "Chandigarh" }
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
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Delhi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Fast and reliable transfers to IGI Airport or New Delhi.</p>
              <a href="/routes/chandigarh-to-delhi" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</a>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Manali</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Scenic hill-station rides with experienced mountain drivers.</p>
              <a href="/routes/chandigarh-to-manali" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</a>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Chandigarh to Shimla</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Comfortable climbs to the Queen of Hills.</p>
              <a href="/routes/chandigarh-to-shimla" style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>View Route &rarr;</a>
            </li>
          </ul>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a href="/#booking-widget" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Your Chandigarh Cab Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
