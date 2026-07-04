'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './OfficeLocationMap.module.css';

// Dynamically import the map to avoid SSR issues with Leaflet's window dependency
const DynamicMap = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className={styles.mapWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-gold)' }}></div>
    </div>
  )
});

export default function OfficeLocationMap() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.mapSection} reveal-on-scroll`} ref={revealRef} data-journey="location">
      <div className={styles.splitLayout}>
        <div className={styles.textContent}>
          <span className={styles.sectionLabel}>Our Location</span>
          <h2 className={styles.heading}>Visit Our Office</h2>
          <p className={styles.subtext}>Located securely in New Delhi, operating across the entire Tricity and North India region.</p>
        </div>
        <div className={styles.mapContainer}>
          <DynamicMap />
        </div>
      </div>
    </section>
  );
}
