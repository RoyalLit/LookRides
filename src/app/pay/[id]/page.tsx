import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import PaymentClient from './PaymentClient';

export const metadata = {
  title: 'Secure Payment Checkout | LookRides',
  description: 'Complete your secure payment for LookRides taxi booking.',
  robots: { index: false, follow: false },
};

export default async function PaymentPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  if (!id || id.length !== 36) {
    notFound();
  }

  // Fetch the payment link details
  const { data: link, error } = await supabaseAdmin
    .from('payment_links')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !link) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto', padding: '20px' }}>
        <PaymentClient link={link} />
      </div>
    </main>
  );
}
