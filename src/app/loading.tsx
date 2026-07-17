import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container} role="status" aria-label="Loading page">
      <div className={styles.spinner} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
