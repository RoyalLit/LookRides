import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airport Transfers | LookRides',
  description: 'Reliable airport transfers to and from Chandigarh International Airport (IXC) and Delhi IGI Airport.',
};

export default function AirportTransfersPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1>Airport Transfers</h1>
      <p>We provide punctual and hassle-free airport transfers for Chandigarh (IXC) and Delhi (IGI) airports.</p>
    </div>
  );
}
