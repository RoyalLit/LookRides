'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({
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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', padding: '2rem', textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0B132B' }}>Dashboard Error</h1>
      <p style={{ marginBottom: '2rem', color: '#6b7280' }}>Something went wrong loading this page.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={reset} style={{
          padding: '0.75rem 1.5rem', background: '#0B132B', color: '#fff', border: 'none',
          borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>
          Try Again
        </button>
        <Link href="/admin" style={{
          padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#0B132B', border: '1px solid #d1d5db',
          borderRadius: '8px', textDecoration: 'none', fontWeight: '600'
        }}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
