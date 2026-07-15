import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { SITE_URL } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const { paymentLinkId } = await request.json();
    if (!paymentLinkId) {
      return NextResponse.json({ error: 'Payment Link ID required' }, { status: 400 });
    }

    // Fetch payment link details
    const { data: link, error: dbError } = await supabaseAdmin
      .from('payment_links')
      .select('*')
      .eq('id', paymentLinkId)
      .single();

    if (dbError || !link) {
      return NextResponse.json({ error: 'Payment link not found' }, { status: 404 });
    }

    if (link.status === 'success') {
      return NextResponse.json({ error: 'Payment already successful' }, { status: 400 });
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    const env = process.env.PHONEPE_ENV || 'UAT'; // UAT or PROD

    if (!merchantId || !saltKey) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const transactionId = `TXN_${Date.now()}_${link.id.substring(0, 8)}`;

    // Update link with new transaction ID
    await supabaseAdmin
      .from('payment_links')
      .update({ transaction_id: transactionId })
      .eq('id', link.id);

    // Clean phone number (PhonePe typically expects 10 digits without country code)
    const cleanPhone = link.customer_phone ? link.customer_phone.replace(/\D/g, '') : '';
    const phonepeMobile = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : undefined;
    const amountInPaise = Math.round(Number(link.amount) * 100);

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: `MUID_${link.id.substring(0, 8)}`,
      amount: amountInPaise, // Amount in paise
      redirectUrl: `${SITE_URL}/pay/${link.id}?status=redirect`,
      redirectMode: "REDIRECT",
      callbackUrl: `${SITE_URL}/api/payments/webhook`,
      mobileNumber: phonepeMobile,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksum = crypto.createHash('sha256').update(base64Payload + "/pg/v1/pay" + saltKey).digest('hex') + "###" + saltIndex;

    const host = env === 'PROD' ? 'https://api.phonepe.com/apis' : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
    
    const response = await fetch(`${host}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const data = await response.json();

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return NextResponse.json({ redirectUrl: data.data.instrumentResponse.redirectInfo.url });
    } else {
      console.error('PhonePe Error:', data);
      return NextResponse.json({ error: 'Failed to initiate payment', details: data }, { status: 500 });
    }
  } catch (error) {
    console.error('Initiate Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
