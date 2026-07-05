'use client';

import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-inter)'
        }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#0B132B', fontFamily: 'var(--font-outfit)' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '400px' }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button onClick={reset} style={{
            padding: '0.75rem 2rem', background: '#0B132B', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
            fontSize: '1rem'
          }}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
