import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Plane, Clock, CheckCircle } from 'lucide-react';
import styles from '../chandigarh-to-delhi/routes.module.css';

export const metadata: Metadata = {
  title: 'Chandigarh to Delhi Airport Taxi | IGI Airport Cab Service | LookRides',
  description: 'Chandigarh to Delhi IGI Airport taxi service. Punctual pickups, flight tracking, professional drivers. Sedan ₹3,500, Innova ₹5,000. Available 24/7.',
  keywords: ['chandigarh to delhi airport taxi', 'chandigarh to igi airport cab', 'delhi airport pickup chandigarh', 'chandigarh airport transfer', 'ixc to igi taxi'],
};

const routeData = {
  from: 'Chandigarh',
  to: 'Delhi IGI Airport',
  distance: '280 km',
  duration: '4-5 hours',
  sedanPrice: '₹3,500',
  suvPrice: '₹5,000',
  highlights: ['Flight tracking', 'Meet & Greet', 'Flight delay handling', 'On-time guarantee', 'Terminal pickup'],
};

export default function ChandigarhToDelhiAirportPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Delhi Airport Transfer</span>
          </nav>
          
          <div className={styles.heroStats}>
            <Plane size={48} style={{ color: 'var(--accent-gold)' }} />
          </div>
          
          <h1 className={styles.heroTitle}>
            {routeData.from} to {routeData.to} Taxi
          </h1>
          <p className={styles.heroSubtitle}>
            Reliable airport transfer service. We track your flight and adjust pickup time accordingly. 
            Never miss a flight or wait at the airport.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeData.distance}</span>
              <span className={styles.statLabel}>Distance</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeData.duration}</span>
              <span className={styles.statLabel}>Drive Time</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>24/7</span>
              <span className={styles.statLabel}>Always Available</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className="container">
          <h2>Airport Transfer Pricing</h2>
          <p className={styles.pricingSubtitle}>Meet & Greet included. Flight delay handling at no extra cost.</p>
          
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Sedan</h3>
              <p className={styles.vehicle}>Toyota Etios / Dzire</p>
              <p className={styles.price}>{routeData.sedanPrice}</p>
              <p className={styles.priceLabel}>Fixed fare</p>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary">
                Book Sedan <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.popularBadge}>Recommended</span>
              <h3>SUV</h3>
              <p className={styles.vehicle}>Toyota Innova Crysta</p>
              <p className={styles.price}>{routeData.suvPrice}</p>
              <p className={styles.priceLabel}>Fixed fare</p>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary">
                Book SUV <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2>Airport Transfer Features</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Clock size={32} className={styles.featureIcon} />
              <h3>Real-Time Flight Tracking</h3>
              <p>We monitor your flight status. Early or delayed — we adjust pickup automatically.</p>
            </div>
            
            <div className={styles.featureCard}>
              <Plane size={32} className={styles.featureIcon} />
              <h3>Terminal Pickup</h3>
              <p>Driver meets you at arrivals with name board. No searching, no confusion.</p>
            </div>
            
            <div className={styles.featureCard}>
              <CheckCircle size={32} className={styles.featureIcon} />
              <h3>On-Time Guarantee</h3>
              <p>We build in buffer time. Your driver arrives early, you leave relaxed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        <div className="container">
          <h2>What&apos;s Included</h2>
          <ul className={styles.highlightList}>
            {routeData.highlights.map((h) => (
              <li key={h}><CheckCircle size={20} /> {h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Book Your Airport Transfer</h2>
            <p>Instant confirmation. Available 24/7 including holidays.</p>
            <div className={styles.ctaActions}>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary btn-lg">
                Book Airport Taxi <ArrowRight size={18} />
              </Link>
              <a href="tel:+919780426567" className="btn btn-outline btn-lg">
                Call +91 97804 26567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
