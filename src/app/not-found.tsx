import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', textAlign: 'center', padding: '2rem', fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#0b132b' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>Page not found</p>
      <Link href="/" style={{
        padding: '0.75rem 1.5rem', background: '#0b132b', color: '#fff',
        textDecoration: 'none', borderRadius: '6px', fontWeight: 600
      }}>
        Go Home
      </Link>
    </div>
  );
}
