import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taxi Services in Zirakpur | LookRides',
  description: 'Premium cab and taxi services in Zirakpur for local, airport, and outstation rides.',
};

export default function ZirakpurPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1>Zirakpur Taxi Services</h1>
      <p>Welcome to our Zirakpur services page. We offer reliable and comfortable rides to and from Zirakpur.</p>
    </div>
  );
}
