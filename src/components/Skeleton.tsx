'use client';

import styles from './Skeleton.module.css';

interface SkeletonBlockProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SkeletonBlock({ width = '100%', height = '1rem', borderRadius, className = '', style = {} }: SkeletonBlockProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <SkeletonBlock height="180px" borderRadius="0" />
          <div className={styles.skeletonCardBody}>
            <SkeletonBlock height="1.15rem" width="60%" />
            <SkeletonBlock height="0.85rem" width="90%" />
            <SkeletonBlock height="0.85rem" width="40%" />
            <SkeletonBlock height="0.8rem" width="30%" style={{ marginTop: 'auto' }} />
          </div>
        </div>
      ))}
    </>
  );
}

export function SkeletonSlide({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonSlide}>
          <SkeletonCard count={1} />
        </div>
      ))}
    </>
  );
}

export function SkeletonReviewCard({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonReviewCard}>
          <div className={styles.skeletonReviewRow}>
            <SkeletonBlock width="48px" height="48px" borderRadius="50%" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <SkeletonBlock height="0.9rem" width="60%" />
              <SkeletonBlock height="0.75rem" width="35%" />
            </div>
          </div>
          <SkeletonBlock height="0.75rem" width="35%" />
          <SkeletonBlock height="2.5rem" width="100%" />
          <SkeletonBlock height="0.75rem" width="45%" />
        </div>
      ))}
    </>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className={styles.skeletonTableContainer}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.skeletonTableRow}>
          <SkeletonBlock height="1rem" width="100%" />
          <SkeletonBlock height="1rem" width="100%" />
          <SkeletonBlock height="1rem" width="100%" />
          <SkeletonBlock height="1rem" width="80px" />
          <SkeletonBlock height="1rem" width="60px" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonForm({ fields = 4 }: { fields?: number }) {
  return (
    <div className={styles.skeletonFormContainer}>
      {Array.from({ length: Math.max(fields - 1, 0) }).map((_, i) => (
        <SkeletonBlock key={i} height="2.5rem" width="100%" />
      ))}
      <SkeletonBlock height="6rem" width="100%" />
      <SkeletonBlock height="2.5rem" width="160px" />
    </div>
  );
}

export function Spinner({ size = 18, light = false }: { size?: number; light?: boolean }) {
  return (
    <span
      className={`${styles.spinner} ${light ? styles.spinnerLight : styles.spinnerDark}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-hidden="true"
    />
  );
}
