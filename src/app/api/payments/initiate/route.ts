import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { z } from 'zod';
import crypto from 'crypto';

const initiateSchema = z.object({
  paymentLinkId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = initiateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Valid payment link ID is required' }, { status: 400 });
    }

    const { paymentLinkId } = parsed.data;

    const { data: link, error } = await supabaseAdmin
      .from('payment_links')
      .select('*')
      .eq('id', paymentLinkId)
      .single();

    if (error || !link) {
      return NextResponse.json({ error: 'Payment link not found' }, { status: 404 });
    }

    if (link.status !== 'pending') {
      return NextResponse.json({ error: 'Payment link is no longer pending' }, { status: 400 });
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

    const amountStr = Number(link.amount).toString();
    const productInfo = (link.purpose || 'LookRides Outstation Taxi').replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 80) || 'LookRides Taxi';
    const firstName = (link.customer_name || 'Customer').replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 40) || 'Customer';
    const email = link.customer_email || 'info@lookrides.com';
    const phone = (link.customer_phone || '9780426567').replace(/[^0-9]/g, '').slice(-10) || '9780426567';
    const udf1 = link.id;

    // PayU Input Hash: key|txnid|amount|productinfo|firstname|email|udf1|udf2|...|udf10|SALT
    const hashFields = [
      merchantKey, transactionId, amountStr, productInfo, firstName, email,
      udf1, '', '', '', '', '', '', '', '', '',
      merchantSalt,
    ];
    const hash = crypto.createHash('sha512').update(hashFields.join('|')).digest('hex').toLowerCase();

    const payuUrl = payuEnv === 'PROD'
      ? 'https://secure.payu.in/_payment'
      : 'https://test.payu.in/_payment';

    return NextResponse.json({
      success: true,
      payuUrl,
      fields: {
        key: merchantKey,
        txnid: transactionId,
        amount: amountStr,
        productinfo: productInfo,
        firstname: firstName,
        email,
        phone,
        surl: `${SITE_URL}/api/payments/verify`,
        furl: `${SITE_URL}/api/payments/verify`,
        hash,
        udf1,
        service_provider: 'payu_paisa',
      },
    });

  } catch (error) {
    console.error('PayU Initiate Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
