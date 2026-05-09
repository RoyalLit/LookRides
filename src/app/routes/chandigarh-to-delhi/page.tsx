import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Shield, CheckCircle } from 'lucide-react';
import styles from './routes.module.css';

export const metadata: Metadata = {
  title: 'Chandigarh to Delhi Taxi | Outstation Cab Service | LookRides',
  description: 'Book affordable Chandigarh to Delhi taxi service. Sedan ₹3,500, Innova ₹5,500. Professional drivers, AC cabs, door-to-door service. 24/7 availability.',
  keywords: ['chandigarh to delhi taxi', 'chandigarh delhi cab', 'delhi airport taxi from chandigarh', 'chandigarh to igi airport cab', 'outstation taxi chandigarh delhi'],
};

const routeData = {
  from: 'Chandigarh',
  to: 'Delhi',
  distance: '250 km',
  duration: '4-5 hours',
  sedanPrice: '₹3,500',
  suvPrice: '₹5,500',
  highlights: [
    'Live GPS tracking for safety',
    'Professional highway drivers',
    'Complimentary water & Wi-Fi',
    'Toll & fuel included',
    'Sanitized & AC vehicles',
  ],
  stops: ['Panchkula', 'Ambala', 'Karnal', 'Panipat', 'Sonipat', 'Delhi Border'],
};

export default function ChandigarhToDelhiPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Chandigarh to Delhi</span>
          </nav>
          
          <h1 className={styles.heroTitle}>
            {routeData.from} to {routeData.to} Taxi Service
          </h1>
          <p className={styles.heroSubtitle}>
            Premium outstation cab service from {routeData.from} to {routeData.to}. 
            Comfortable, safe, and affordable — starting at just {routeData.sedanPrice}.
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
              <span className={styles.statValue}>24/7</span>
              <span className={styles.statLabel}>Availability</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className="container">
          <h2>Transparent Pricing</h2>
          <p className={styles.pricingSubtitle}>No hidden charges. Toll, fuel & GST included.</p>
          
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
              <span className={styles.popularBadge}>Most Popular</span>
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
          <h2>Why Choose LookRides for {routeData.from}-{routeData.to}?</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Shield size={32} className={styles.featureIcon} />
              <h3>Safety First</h3>
              <p>Background-verified drivers, live GPS tracking, and 24/7 emergency support.</p>
            </div>
            
            <div className={styles.featureCard}>
              <Clock size={32} className={styles.featureIcon} />
              <h3>Always On Time</h3>
              <p>Professional drivers with highway experience. We guarantee timely pickup and delivery.</p>
            </div>
            
            <div className={styles.featureCard}>
              <CheckCircle size={32} className={styles.featureIcon} />
              <h3>All-Inclusive Pricing</h3>
              <p>Toll, fuel, and GST included. No surprises at the end of your journey.</p>
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

      <section className={styles.route}>
        <div className="container">
          <h2>Route Overview</h2>
          <p className={styles.routeDesc}>
            Our Chandigarh to Delhi taxi takes the NH-44 highway via Panchkula, Ambala, Karnal, and Panipat. 
            The journey offers scenic views of Punjab and Haryana countryside.
          </p>
          <div className={styles.routeStops}>
            <span>{routeData.from}</span>
            {routeData.stops.map((stop) => (
              <span key={stop} className={styles.stop}>{stop}</span>
            ))}
            <span className={styles.finalStop}>{routeData.to}</span>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to travel {routeData.from} to {routeData.to}?</h2>
            <p>Book now and get instant confirmation via WhatsApp or phone call.</p>
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
