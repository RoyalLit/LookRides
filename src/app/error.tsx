'use client';

import styles from './error-page.module.css';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>500</h1>
      <p className={styles.message}>Something went wrong</p>
      <button onClick={reset} className={styles.button}>
        Try Again
      </button>
    </div>
  );
}
