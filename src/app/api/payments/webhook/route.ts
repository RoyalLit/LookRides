import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const xVerify = request.headers.get('x-verify') || request.headers.get('X-VERIFY');

    if (!xVerify) {
      return NextResponse.json({ error: 'No signature found' }, { status: 400 });
    }

    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';

    if (!saltKey) {
      return NextResponse.json({ error: 'Configuration missing' }, { status: 500 });
    }

    let jsonBody;
    try {
      jsonBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!jsonBody.response) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Verify Checksum
    const checksum = crypto.createHash('sha256').update(jsonBody.response + saltKey).digest('hex') + "###" + saltIndex;

    if (checksum !== xVerify) {
      console.error('Invalid signature:', { expected: checksum, received: xVerify });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Decode response
    const decodedStr = Buffer.from(jsonBody.response, 'base64').toString('utf8');
    const decoded = JSON.parse(decodedStr);

    const { merchantTransactionId, code } = decoded;

    let newStatus = 'pending';
    if (code === 'PAYMENT_SUCCESS') {
      newStatus = 'success';
    } else if (code === 'PAYMENT_ERROR' || code === 'PAYMENT_DECLINED') {
      newStatus = 'failed';
    }

    // Update Database
    if (merchantTransactionId) {
      await supabaseAdmin
        .from('payment_links')
        .update({ status: newStatus })
        .eq('transaction_id', merchantTransactionId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
