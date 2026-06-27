import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Cities | LookRides',
  description: 'Taxi services available in Chandigarh, Mohali, and Zirakpur.',
};

export default function CitiesPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1>Our Service Cities</h1>
      <p>We provide premium taxi services across the Tricity and beyond.</p>
      <ul style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li><Link href="/cities/chandigarh" style={{ color: 'var(--primary-color, #0070f3)', textDecoration: 'underline' }}>Chandigarh</Link></li>
        <li><Link href="/cities/mohali" style={{ color: 'var(--primary-color, #0070f3)', textDecoration: 'underline' }}>Mohali</Link></li>
        <li><Link href="/cities/zirakpur" style={{ color: 'var(--primary-color, #0070f3)', textDecoration: 'underline' }}>Zirakpur</Link></li>
      </ul>
    </div>
  );
}
