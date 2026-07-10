import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Route, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/config';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Taxi Services | Airport Transfers & Outstation Cabs in Chandigarh - LookRides',
  description: 'LookRides provides 24/7 cab services in Chandigarh — airport transfers to IXC & IGI Delhi, outstation trips to Manali, Shimla, Amritsar, Dehradun. Premium fleet, verified drivers, fixed pricing.',
  keywords: [
    'airport taxi chandigarh', 'outstation cab chandigarh',
    'intercity taxi service', 'chandigarh airport transfer',
    'delhi airport taxi chandigarh', 'one way cab chandigarh',
    'taxi booking chandigarh', 'cab service chandigarh',
    'chandigarh to delhi taxi', 'chandigarh to manali cab',
    'ixc airport taxi', 'chandigarh taxi near me',
  ],
  openGraph: {
    title: 'Cab Service in Chandigarh | Airport & Outstation Taxi | LookRides',
    description: '24/7 airport transfers to IGI Delhi & Chandigarh Airport. Outstation one-way and round-trip cabs across North India. Book sedan, Innova or Tempo Traveller. Fixed pricing.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'LookRides Cab Services Chandigarh' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookRides | Cab Service Chandigarh',
    description: 'Premium airport & outstation taxi service in Chandigarh, Mohali, Zirakpur. Available 24/7.',
  },
};

const servicesList = [
  {
    id: 'airport',
    Icon: Plane,
    title: 'Airport Transfers',
    description: 'Never miss a flight. We offer punctual, reliable pickup and drop services to Chandigarh International Airport and IGI Delhi. Our drivers track your flight so they are always on time.',
    features: ['24/7 Availability', 'Real-time Flight Tracking', 'Meet & Greet Service', 'Zero Waiting Charges'],
  },
  {
    id: 'outstation',
    Icon: Route,
    title: 'Outstation Journeys',
    description: 'Planning a trip to the hills or another city? We offer one-way drops and round-trip packages across North India. Travel comfortably to Manali, Shimla, Dharamshala, Delhi, or Amritsar with experienced mountain drivers.',
    features: ['Experienced Hill Drivers', 'Flexible Packages', 'Transparent Toll Billing', 'Comfortable Long Drives'],
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": SITE_URL + "/services" },
      ],
    },
    {
      "@type": ["ProfessionalService", "TaxiService"],
      "@id": SITE_URL + "/services",
      "name": "LookRides Taxi Services",
      "description": "24/7 airport transfers and outstation cab services from Chandigarh, Mohali, Zirakpur, Panchkula & Derabassi to Delhi, Manali, Shimla, Amritsar and across North India.",
      "provider": { "@type": "LocalBusiness", "@id": SITE_URL + "/#business" },
      "areaServed": [
        { "@type": "City", "name": "Chandigarh" },
        { "@type": "City", "name": "Mohali" },
        { "@type": "City", "name": "Zirakpur" },
        { "@type": "City", "name": "Panchkula" },
        { "@type": "City", "name": "Derabassi" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "State", "name": "Punjab" },
        { "@type": "State", "name": "Himachal Pradesh" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Taxi Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airport Transfer" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outstation One-Way Cab" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outstation Round-Trip" } },
        ],
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>What We Offer</p>
          <h1 className={styles.pageTitle}>Our Services</h1>
          <p className={styles.headerSubtitle}>
            Tailored transportation solutions designed for your comfort and safety, anywhere in North India.
          </p>
        </div>
      </header>

      <section className={styles.servicesSection}>
        <div className="container">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`${styles.serviceRow} ${index % 2 !== 0 ? styles.rowReverse : ''}`}
            >
              <div className={styles.serviceVisual}>
                <div className={styles.visualBox}>
                  <service.Icon size={72} strokeWidth={1} className={styles.serviceIcon} />
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.iconWrap}><service.Icon size={24} strokeWidth={1.5} /></div>
                <h2>{service.title}</h2>
                <p className={styles.description}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((f) => (
                    <li key={f}><CheckCircle size={16} className={styles.check} /> {f}</li>
                  ))}
                </ul>
                <Link href="/" className="btn btn-primary">Book This Service <ArrowRight size={16} /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to travel with us?</h2>
            <p>Book your premium ride today and experience the LookRides difference.</p>
            <Link href="/" className="btn btn-primary">Book Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
