import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Service Cities | LookRides — Chandigarh, Mohali & Zirakpur';
const description = 'LookRides provides premium taxi services in Chandigarh, Mohali, and Zirakpur. Local rides, airport transfers, and outstation trips with fixed transparent pricing.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'Chandigarh taxi, Mohali cab, Zirakpur taxi service, Tricity taxi, LookRides service cities',
  openGraph: { title, description, images: '/og-image.png' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: 'https://lookrides.com/cities' },
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
