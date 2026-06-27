import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={styles.page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{
          width: 36, height: 36, border: '3px solid var(--border)',
          borderTopColor: '#FFC83D', borderRadius: '50%',
          animation: 'spin 0.7s linear infinite', margin: '0 auto 1rem'
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading…</p>
      </div>
    </div>
  );
}
