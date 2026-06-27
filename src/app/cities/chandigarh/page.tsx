import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taxi Services in Chandigarh | LookRides',
  description: 'Premium cab and taxi services in Chandigarh for local, airport, and outstation rides.',
};

export default function ChandigarhPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1>Chandigarh Taxi Services</h1>
      <p>Welcome to our Chandigarh services page. We offer reliable and comfortable rides to and from Chandigarh.</p>
    </div>
  );
}
