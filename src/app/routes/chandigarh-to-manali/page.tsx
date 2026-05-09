import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Shield, Mountain, CheckCircle } from 'lucide-react';
import styles from '../chandigarh-to-delhi/routes.module.css';

export const metadata: Metadata = {
  title: 'Chandigarh to Manali Taxi | Hill Station Cab Service | LookRides',
  description: 'Book Chandigarh to Manali taxi service. Scenic journey through mountains. Sedan ₹4,500, Innova ₹6,500. Experienced hill drivers, safe mountain roads. 12-hour journey.',
  keywords: ['chandigarh to manali taxi', 'manali cab from chandigarh', 'manali hill station cab', 'chandigarh manali car rental', 'kullu manali taxi'],
};

const routeData = {
  from: 'Chandigarh',
  to: 'Manali',
  distance: '310 km',
  duration: '10-12 hours',
  sedanPrice: '₹4,500',
  suvPrice: '₹6,500',
  via: 'Kullu',
  highlights: [
    'Experienced mountain drivers',
    'Scenic mountain passes',
    'Break stops at quality hotels',
    'AC vehicles for comfort',
    'Himalayan views',
  ],
};

export default function ChandigarhToManaliPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Chandigarh to Manali</span>
          </nav>
          
          <div className={styles.heroStats}>
            <Mountain size={48} style={{ color: 'var(--accent-gold)' }} />
          </div>
          
          <h1 className={styles.heroTitle}>
            {routeData.from} to {routeData.to} Taxi Service
          </h1>
          <p className={styles.heroSubtitle}>
            Scenic mountain journey from {routeData.from} to the beautiful hill station of {routeData.to}. 
            Travel comfortably with experienced drivers who know every mountain curve.
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
              <span className={styles.statValue}>via {routeData.via}</span>
              <span className={styles.statLabel}>Route</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className="container">
          <h2>Transparent Pricing</h2>
          <p className={styles.pricingSubtitle}>All-inclusive fares. Toll, fuel & driver allowance included.</p>
          
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Sedan</h3>
              <p className={styles.vehicle}>Toyota Etios / Maruti Dzire</p>
              <p className={styles.capacity}><CheckCircle size={16} /> 4 Passengers</p>
              <p className={styles.capacity}><CheckCircle size={16} /> 3 Bags</p>
              <p className={styles.price}>{routeData.sedanPrice}</p>
              <p className={styles.priceLabel}>One-way trip</p>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary">
                Book Sedan <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.popularBadge}>Best for Hills</span>
              <h3>SUV</h3>
              <p className={styles.vehicle}>Toyota Innova Crysta</p>
              <p className={styles.capacity}><CheckCircle size={16} /> 6 Passengers</p>
              <p className={styles.capacity}><CheckCircle size={16} /> 5 Bags</p>
              <p className={styles.price}>{routeData.suvPrice}</p>
              <p className={styles.priceLabel}>One-way trip</p>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary">
                Book SUV <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2>Why Choose LookRides for Hill Journeys?</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Shield size={32} className={styles.featureIcon} />
              <h3>Safe Mountain Driving</h3>
              <p>Drivers experienced in hill roads, fog, and mountain conditions. Vehicle safety checks before every trip.</p>
            </div>
            
            <div className={styles.featureCard}>
              <Clock size={32} className={styles.featureIcon} />
              <h3>Comfort-First Journey</h3>
              <p>AC vehicles, comfortable seating, and strategic break stops at quality hotels along the route.</p>
            </div>
            
            <div className={styles.featureCard}>
              <Mountain size={32} className={styles.featureIcon} />
              <h3>Scenic Route Knowledge</h3>
              <p>Drivers know the best viewpoints, restaurants, and photo spots along Chandigarh-Manali Highway.</p>
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
            <h2>Ready for the Hills?</h2>
            <p>Book your Manali adventure today. Instant confirmation via WhatsApp.</p>
            <div className={styles.ctaActions}>
              <Link href={`/?pickup=${encodeURIComponent(routeData.from)}&drop=${encodeURIComponent(routeData.to)}`} className="btn btn-primary btn-lg">
                Book Manali Trip <ArrowRight size={18} />
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
