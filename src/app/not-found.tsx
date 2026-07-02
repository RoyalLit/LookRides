import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './error-page.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | LookRides',
  description: 'The page you are looking for does not exist. Find premium cab services in Chandigarh, Mohali & Zirakpur.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link href="/" className={styles.button}>
        Go Home
      </Link>
    </div>
  );
}
