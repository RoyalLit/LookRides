import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { z } from 'zod';

const initiateSchema = z.object({
  paymentLinkId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = initiateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Payment link ID is required' }, { status: 400 });
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

    // Check for existing pending transaction (race condition protection)
    if (link.transaction_id && link.status === 'pending') {
      // A transaction was already initiated — return it to prevent duplicates
      return NextResponse.json({ 
        transactionId: link.transaction_id,
        message: 'A payment session already exists for this link.',
      });
    }

    const clientId = process.env.PHONEPE_CLIENT_ID || 'SU2607141834113505542635';
    const clientSecret = process.env.PHONEPE_SALT_KEY;
    const envStr = process.env.PHONEPE_ENV || 'UAT';

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                     (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://lookrides.com'));
                     
    const transactionId = `TXN_${Date.now()}_${link.id.substring(0, 8)}`;

    await supabaseAdmin
      .from('payment_links')
      .update({ transaction_id: transactionId })
      .eq('id', link.id);

    const amountInPaise = Math.round(Number(link.amount) * 100);

    const authHost = envStr === 'PROD' 
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token' 
      : 'https://api-preprod.phonepe.com/apis/identity-manager/v1/oauth/token';

    const authRes = await fetch(authHost, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            client_version: '1',
            client_secret: clientSecret,
            grant_type: 'client_credentials'
        })
    });
    
    const authData = await authRes.json();
    
    if (!authRes.ok || !authData.access_token) {
        return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
    }

    const token = authData.access_token;
    const checkoutHost = envStr === 'PROD'
      ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/checkout/v2/pay';

    const payRes = await fetch(checkoutHost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `O-Bearer ${token}`
        },
        body: JSON.stringify({
            merchantOrderId: transactionId,
            amount: amountInPaise,
            paymentFlow: {
                type: "PG_CHECKOUT",
                merchantUrls: {
                    redirectUrl: `${SITE_URL}/pay/${link.id}?status=redirect`
                }
            }
        })
    });

    const payData = await payRes.json();

    if (payRes.ok && payData.redirectUrl) {
      return NextResponse.json({ success: true, redirectUrl: payData.redirectUrl });
    } else {
      return NextResponse.json({ error: 'Failed to generate redirect URL' }, { status: 500 });
    }

  } catch (error) {
    console.error('Initiate Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
