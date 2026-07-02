import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Star, Banknote, Clock, Award, Users } from 'lucide-react';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About LookRides | Trusted Cab Service in Chandigarh Since 2014',
  description: 'Learn about LookRides — trusted taxi service in Chandigarh, Mohali, Zirakpur & Panchkula since 2014. Premium outstation cabs, airport transfers to IXC & IGI Delhi, verified drivers, fixed pricing.',
  openGraph: {
    title: 'About LookRides | Chandigarh Cab Service Since 2014',
    description: 'Chandigarh-based taxi service with verified drivers, 24/7 support. Serving Delhi, Manali, Shimla, Amritsar & all North India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About LookRides | Chandigarh Taxi Service',
    description: 'Trusted cab service in Chandigarh, Mohali, Zirakpur & Panchkula since 2014.',
  },
};

const values = [
  { Icon: Shield, title: 'Safety First', desc: 'All vehicles undergo regular maintenance. Drivers are background-verified and trained for long-distance safety.' },
  { Icon: Star, title: 'Premium Comfort', desc: 'From sedans to luxury SUVs — every ride is clean, sanitized, and equipped with modern amenities.' },
  { Icon: Banknote, title: 'Transparent Pricing', desc: 'No hidden toll surprises. You pay exactly what you are quoted. Fixed rates, zero surge pricing.' },
  { Icon: Clock, title: '24/7 Availability', desc: 'Early morning flights or late-night returns — our support team and fleet are on standby round the clock.' },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lookrides.com" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://lookrides.com/about" },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://lookrides.com/about",
      "name": "About LookRides — Premium Taxi Service Chandigarh Since 2014",
      "description": "Learn about LookRides — the leading provider of premium outstation cabs and airport transfers in Chandigarh, Mohali, and Zirakpur since 2014.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": "https://lookrides.com/#business",
        "name": "LookRides",
        "telephone": "+919780426567",
        "areaServed": ["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Derabassi"],
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>Our Story</p>
          <h1 className={styles.pageTitle}>About LookRides</h1>
          <p className={styles.headerSubtitle}>
            Redefining travel across North India with safety, comfort, and unmatched reliability.
          </p>
        </div>
      </header>

      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <h2>Why We Started</h2>
              <p>
                Founded with a simple mission — to make inter-city travel seamless and stress-free — LookRides has grown into the premier taxi and tour & travel service for the Tricity and North India.
              </p>
              <p>
                We realized travelers were tired of unpredictable pricing, unprofessional drivers, and poorly maintained vehicles. LookRides was built to solve exactly that. We meticulously maintain our fleet, thoroughly train our chauffeurs, and ensure complete transparency in billing.
              </p>
              <p>
                Today, with thousands of successful rides and consistently high ratings, we are proud to be the most trusted name in outstation travel across the tricity.
              </p>

              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <div className={styles.statIcon}><Award size={20} /></div>
                  <h3>12+</h3>
                  <span>Years of Service</span>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statIcon}><Users size={20} /></div>
                  <h3>5k+</h3>
                  <span>Happy Customers</span>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statIcon}><Star size={20} /></div>
                  <h3>4.9★</h3>
                  <span>Average Rating</span>
                </div>
              </div>
            </div>

            <div className={styles.storyVisual}>
              <div className={styles.visualBox}>
                <Image 
                  src="/company-fleet.jpg" 
                  alt="LookRides Fleet" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.storyImage}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <p className={styles.sectionLabel}>Our Pillars</p>
            <h2 className={styles.sectionTitle}>Why Choose LookRides?</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={v.title} className={styles.valueCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.valueIcon}><v.Icon size={24} strokeWidth={1.5} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
