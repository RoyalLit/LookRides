import type { Metadata } from 'next';
import Link from 'next/link';
import { allRoutes } from '@/lib/routes-data';

export const metadata: Metadata = {
  title: 'All Popular Routes | LookRides',
  description: 'Explore all premium intercity outstation routes and airport transfer routes served by LookRides.',
};

export default function RoutesIndexPage() {
  const outstationRoutes = allRoutes.filter(r => r.category === 'outstation');
  const airportRoutes = allRoutes.filter(r => r.category === 'airport');

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#0b132b' }}>Our Popular Routes</h1>
      <p style={{ color: '#555', marginBottom: '30px' }}>
        Select your route to view detailed pricing, duration, highlights, and book a premium cab.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', borderBottom: '2px solid #0b132b', paddingBottom: '8px', marginBottom: '15px' }}>Outstation Cabs</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
            {outstationRoutes.map((r) => (
              <li key={r.slug}>
                <Link 
                  href={`/routes/${r.slug}`} 
                  style={{ color: 'var(--primary-color, #0070f3)', textDecoration: 'none', fontWeight: '500' }}
                >
                  {r.from} &rarr; {r.to} <span style={{ color: '#888', fontWeight: 'normal', fontSize: '14px' }}>({r.distance})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: '22px', borderBottom: '2px solid #0b132b', paddingBottom: '8px', marginBottom: '15px' }}>Airport Transfers</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
            {airportRoutes.map((r) => (
              <li key={r.slug}>
                <Link 
                  href={`/routes/${r.slug}`} 
                  style={{ color: 'var(--primary-color, #0070f3)', textDecoration: 'none', fontWeight: '500' }}
                >
                  {r.from} &rarr; {r.to} <span style={{ color: '#888', fontWeight: 'normal', fontSize: '14px' }}>({r.distance})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
