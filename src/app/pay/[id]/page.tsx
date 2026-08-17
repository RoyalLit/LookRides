import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import PaymentClient from './PaymentClient';
import crypto from 'crypto';

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

  const merchantKey = process.env.PAYU_MERCHANT_KEY || 'r6UbC2';
  const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'MGWotrXq9kr8CGoBBOpSl3uP0OlUYGi1';
  const payuEnv = process.env.PAYU_ENV || 'PROD';

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                   (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://lookrides.com'));

  const transactionId = link.transaction_id || `TXN_${Date.now()}_${link.id.substring(0, 8)}`;

  if (!link.transaction_id) {
    await supabaseAdmin
      .from('payment_links')
      .update({ transaction_id: transactionId })
      .eq('id', link.id);
  }

  const amountStr = Number(link.amount).toFixed(2);
  const productInfo = (link.purpose || 'LookRides Outstation Taxi').replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 80) || 'LookRides Taxi';
  const firstName = (link.customer_name || 'Customer').replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 40) || 'Customer';
  const email = link.customer_email || 'info@lookrides.com';
  const phone = (link.customer_phone || '9780426567').replace(/[^0-9]/g, '').slice(-10) || '9780426567';
  const udf1 = link.id;

  // PayU Input Hash Sequence: EXACT 17 fields joined by 16 '|' characters
  // key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|SALT
  const hashFields = [
    merchantKey,     // 1: key
    transactionId,   // 2: txnid
    amountStr,       // 3: amount
    productInfo,     // 4: productinfo
    firstName,       // 5: firstname
    email,           // 6: email
    udf1,            // 7: udf1
    '',              // 8: udf2
    '',              // 9: udf3
    '',              // 10: udf4
    '',              // 11: udf5
    '',              // 12: udf6
    '',              // 13: udf7
    '',              // 14: udf8
    '',              // 15: udf9
    '',              // 16: udf10
    merchantSalt     // 17: SALT
  ];

  const hashSequence = hashFields.join('|');

  const hash = crypto
    .createHash('sha512')
    .update(hashSequence)
    .digest('hex')
    .toLowerCase();

  const payuUrl = payuEnv === 'PROD'
    ? 'https://secure.payu.in/_payment'
    : 'https://test.payu.in/_payment';

  const surl = `${SITE_URL}/api/payments/verify`;
  const furl = `${SITE_URL}/api/payments/verify`;

  const payuFields = {
    payuUrl,
    key: merchantKey,
    txnid: transactionId,
    amount: amountStr,
    productinfo: productInfo,
    firstname: firstName,
    email,
    phone,
    surl,
    furl,
    hash,
    udf1,
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto', padding: '20px' }}>
        <PaymentClient link={link} payuFields={payuFields} />
      </div>
    </main>
  );
}
