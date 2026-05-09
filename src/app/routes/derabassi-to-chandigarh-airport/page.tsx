import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Plane, CheckCircle } from 'lucide-react';
import styles from '../chandigarh-to-delhi/routes.module.css';

export const metadata: Metadata = {
  title: 'Derabassi to Chandigarh Airport Taxi | IXC Airport Transfer | LookRides',
  description: 'Affordable Derabassi to Chandigarh Airport taxi. Quick 30-min transfer. Sedan ₹800, Innova ₹1,200. 24/7 service, professional drivers. Book now!',
  keywords: ['derabassi to chandigarh airport taxi', 'derabassi to ixc airport', 'chandigarh airport cab', 'zirakpur airport taxi', 'local airport transfer'],
};

const routeData = {
  from: 'Derabassi',
  to: 'Chandigarh Airport',
  distance: '35 km',
  duration: '30-45 min',
  sedanPrice: '₹800',
  suvPrice: '₹1,200',
  highlights: ['Quick 30-min transfer', '24/7 availability', 'Flight tracking', 'Terminal pickup', 'Corporate accounts welcome'],
};

export default function DerabassiToAirportPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Airport Transfer</span>
          </nav>
          
          <Plane size={48} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
          
          <h1 className={styles.heroTitle}>
            {routeData.from} to {routeData.to} Taxi
          </h1>
          <p className={styles.heroSubtitle}>
            Fast, reliable airport transfer from {routeData.from} area. Quick 30-minute journey 
            to Chandigarh International Airport. Perfect for early flights or late arrivals.
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
              <span className={styles.statValue}>from {routeData.sedanPrice}</span>
              <span className={styles.statLabel}>Starting Price</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className="container">
          <h2>Airport Transfer Pricing</h2>
          <p className={styles.pricingSubtitle}>Transparent pricing. No surge charges.</p>
          
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Sedan</h3>
              <p className={styles.vehicle}>Toyota Etios</p>
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

      <section className={styles.highlights}>
        <div className="container">
          <h2>Why Book Airport Transfer with Us?</h2>
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
            <h2>Need Airport Transfer?</h2>
            <p>Book now — instant confirmation. Available 24/7.</p>
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
