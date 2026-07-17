import Image from 'next/image';
import Link from 'next/link';
import { Users, Luggage, ArrowRight } from 'lucide-react';
import { getActiveFleet } from '@/lib/queries';
import styles from './fleet.module.css';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Premium Fleet | LookRides Chandigarh',
  description: 'Choose from our range of sanitized, GPS-tracked, fully air-conditioned cabs — Sedans, SUVs, and Luxury vehicles — driven by verified highway specialists.',
};

export default async function FleetPage() {
  const fleet = await getActiveFleet() || [];

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>Well-Maintained &amp; Sanitized</p>
          <h1 className={styles.pageTitle}>Our Premium Fleet</h1>
          <p className={styles.headerSubtitle}>
            Every vehicle is thoroughly maintained, GPS-equipped, and driven by a verified professional chauffeur.
          </p>
        </div>
      </header>

      <section className={styles.fleetSection}>
        <div className="container">
          {fleet.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <p>Fleet information loading — please check back shortly.</p>
            </div>
          ) : (
            <div className={styles.fleetGrid}>
              {fleet.map((v, index) => (
                <article key={v.id} className={styles.fleetCard} style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className={styles.cardImageArea}>
                    <Image
                      src={v.image_url}
                      alt={`${v.name} - LookRides Taxi`}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                      style={{ objectFit: 'contain', padding: '1.5rem' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <span className={styles.cardBadge}>{v.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.carName}>{v.name}</h2>
                    <div className={styles.specRow}>
                      <div className={styles.spec}>
                        <Users size={16} />
                        <span>{v.seats} Passengers</span>
                      </div>
                      <div className={styles.spec}>
                        <Luggage size={16} />
                        <span>{v.bags} Bags</span>
                      </div>
                    </div>
                    <div className={styles.bestFor}>
                      <span className={styles.bestForValue}>Premium Intercity Cab</span>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <Link href="/#booking-widget" className={`btn btn-primary ${styles.bookBtn}`}>
                      Book Now <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
