import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mountain, CheckCircle } from 'lucide-react';
import styles from '../chandigarh-to-delhi/routes.module.css';

export const metadata: Metadata = {
  title: 'Chandigarh to Shimla Taxi | Shimla Cab Service | LookRides',
  description: 'Book Chandigarh to Shimla taxi. Quick 4-hour scenic journey. Sedan ₹3,000, Innova ₹4,500. Visit Mall Road, Jakhu Temple, Kufri. 24/7 service.',
  keywords: ['chandigarh to shimla taxi', 'shimla cab service', 'shimla from chandigarh', 'shimla manali trip', 'himachal taxi'],
};

const routeData = {
  from: 'Chandigarh',
  to: 'Shimla',
  distance: '120 km',
  duration: '4-5 hours',
  sedanPrice: '₹3,000',
  suvPrice: '₹4,500',
  highlights: ['Mall Road access', 'Jakhu Temple visits', 'Kufri excursions', 'Professional hill drivers', 'All-weather vehicles'],
};

export default function ChandigarhToShimlaPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Chandigarh to Shimla</span>
          </nav>
          
          <h1 className={styles.heroTitle}>{routeData.from} to {routeData.to} Taxi Service</h1>
          <p className={styles.heroSubtitle}>
            Escape to the queen of hills. Premium taxi service from {routeData.from} to {routeData.to} 
            with experienced drivers and comfortable vehicles.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeData.distance}</span>
              <span className={styles.statLabel}>Distance</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeData.duration}</span>
              <span className={styles.statLabel}>Journey Time</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeData.sedanPrice}</span>
              <span className={styles.statLabel}>Starting Price</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className="container">
          <h2>Transparent Pricing</h2>
          <p className={styles.pricingSubtitle}>No hidden charges. All-inclusive fares.</p>
          
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Sedan</h3>
              <p className={styles.vehicle}>Toyota Etios / Maruti Dzire</p>
              <p className={styles.price}>{routeData.sedanPrice}</p>
              <p className={styles.priceLabel}>One-way trip</p>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary">
                Book Sedan <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.popularBadge}>Most Popular</span>
              <h3>SUV</h3>
              <p className={styles.vehicle}>Toyota Innova Crysta</p>
              <p className={styles.price}>{routeData.suvPrice}</p>
              <p className={styles.priceLabel}>One-way trip</p>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary">
                Book SUV <ArrowRight size={16} />
              </Link>
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
            <h2>Plan Your Shimla Trip</h2>
            <p>Book now for instant confirmation. Available 24/7.</p>
            <div className={styles.ctaActions}>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary btn-lg">
                Book Now <ArrowRight size={18} />
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
