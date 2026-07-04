import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';

const title = 'Airport Transfers | LookRides — Chandigarh & Delhi Airport Taxi';
const description = 'Reliable airport transfers to and from Chandigarh International Airport (IXC) and Delhi IGI Airport. Book online for fixed pricing, 24/7 availability, and instant confirmation.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'airport transfers, Chandigarh airport taxi, Delhi IGI airport cab, IXC airport pickup, airport drop Chandigarh',
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: SITE_URL + '/airport-transfers' },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Airport Transfers", "item": SITE_URL + "/airport-transfers" },
      ],
    },
    {
      "@type": "Service",
      "serviceType": "Airport Transfer Taxi Service",
      "provider": { "@type": "LocalBusiness", "name": "LookRides" },
      "areaServed": [
        { "@type": "Airport", "name": "Shaheed Bhagat Singh International Airport (IXC)", "iataCode": "IXC" },
        { "@type": "Airport", "name": "Indira Gandhi International Airport (DEL)", "iataCode": "DEL" }
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "url": SITE_URL + "/airport-transfers"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much is a taxi from Chandigarh to Delhi Airport?",
          "acceptedAnswer": { "@type": "Answer", "text": "Chandigarh to Delhi IGI Airport taxi starts at ₹4,299 for a sedan and ₹6,499 for an Innova Crysta. Includes all tolls, fuel, and GST." }
        },
        {
          "@type": "Question",
          "name": "How early should I leave for a Delhi flight from Chandigarh?",
          "acceptedAnswer": { "@type": "Answer", "text": "For domestic flights, leave 4-5 hours before departure. For international flights, leave 6 hours before. We track your flight in real-time." }
        }
      ]
    }
  ]
};

export default function AirportTransfersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-navy)' }}>Premium Airport Transfers: IXC & IGI</h1>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            LookRides specializes in punctual and hassle-free airport transfers for both <strong>Shaheed Bhagat Singh International Airport (IXC) in Chandigarh</strong> and <strong>Indira Gandhi International Airport (DEL) in New Delhi</strong>. We understand that flight timings can be unforgiving, which is why our airport transfer fleet operates 24/7 with a 100% on-time guarantee.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Whether you need a late-night pickup from IGI Terminal 3 to travel to Chandigarh, or a spacious SUV for your family's luggage heading to IXC, our premium fleet of sedans (Etios, Dzire) and SUVs (Innova Crysta) are perfectly equipped for comfortable transit. 
          </p>
          
          <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Why Choose Our Airport Taxis?</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Flight Tracking</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>We monitor your flight status in real-time, adjusting pickup times automatically for early arrivals or delays at no extra cost.</p>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Fixed Fares</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Our airport pickup and drop pricing includes all airport parking fees, toll taxes, and driver allowance. No surge pricing ever.</p>
            </li>
            <li style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Meet & Greet</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Our chauffeurs wait for you at the arrivals gate with a personalized placard and assist you with your luggage.</p>
            </li>
          </ul>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/#booking-widget" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--accent-gold)', color: 'var(--primary-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Your Airport Transfer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
