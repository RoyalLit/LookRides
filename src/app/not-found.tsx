import Link from 'next/link';
import styles from './error-page.module.css';

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
