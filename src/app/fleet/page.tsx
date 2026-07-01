'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Luggage, ArrowRight } from 'lucide-react';
import type { FleetVehicle } from '@/lib/supabase';
import { getActiveFleet } from '@/lib/queries';
import { SkeletonCard } from '@/components/Skeleton';
import styles from './fleet.module.css';

export default function FleetPage() {
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFleet() {
      const data = await getActiveFleet();
      if (data) setFleet(data as FleetVehicle[]);
      setLoading(false);
    }
    fetchFleet();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>Well-Maintained & Sanitized</p>
          <h1 className={styles.pageTitle}>Our Premium Fleet</h1>
          <p className={styles.headerSubtitle}>
            Every vehicle is thoroughly maintained, GPS-equipped, and driven by a verified professional chauffeur.
          </p>
        </div>
      </header>

      <section className={styles.fleetSection}>
        <div className="container">
          {loading ? (
            <div className={styles.fleetGrid}>
              <SkeletonCard count={3} />
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
                      style={{ objectFit: 'contain', padding: '1.5rem' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                    <Link href="/" className={`btn btn-primary ${styles.bookBtn}`}>
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
