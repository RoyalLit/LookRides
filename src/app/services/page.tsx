import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Route, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Our Taxi Services | Airport Transfers & Outstation Cabs - LookRides',
  description: 'LookRides provides 24/7 airport transfers and outstation trips from Chandigarh and Zirakpur to Delhi, Himachal Pradesh, and across Punjab.',
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

export default function ServicesPage() {
  return (
    <div className={styles.page}>
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
