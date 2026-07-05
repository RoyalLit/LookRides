'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error-page.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>500</h1>
      <p className={styles.message}>Something went wrong</p>
      <p className={styles.description}>
        An unexpected error occurred. Please try again or contact support.
      </p>
      <div className={styles.actions}>
        <button onClick={reset} className={styles.button}>
          Try Again
        </button>
        <Link href="/" className={styles.buttonSecondary}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
