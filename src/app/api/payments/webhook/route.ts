import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    // 1. Basic Auth check
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    const webhookAuth = process.env.PHONEPE_WEBHOOK_AUTH;
    if (!webhookAuth) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const expectedAuth = 'Basic ' + Buffer.from(webhookAuth).toString('base64');

    if (!authHeader || authHeader !== expectedAuth) {
      console.error('Invalid Webhook Authorization');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. HMAC signature verification
    const xVerify = request.headers.get('X-VERIFY');
    const saltKey = process.env.PHONEPE_SALT_KEY;
    if (!xVerify || !saltKey) {
      return NextResponse.json({ error: 'Missing verification headers' }, { status: 401 });
    }
    const hmac = crypto.createHmac('sha256', saltKey).update(rawBody).digest('hex');
    if (hmac !== xVerify) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 3. Parse and process webhook payload
    let jsonBody;
    try {
      jsonBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!jsonBody.response) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Decode response
    const decodedStr = Buffer.from(jsonBody.response, 'base64').toString('utf8');
    const decoded = JSON.parse(decodedStr);

    const { merchantOrderId, state } = decoded;

    let newStatus = 'pending';
    // PhonePe V2 uses 'COMPLETED', 'FAILED' in 'state'
    if (state === 'COMPLETED') {
      newStatus = 'success';
    } else if (state === 'FAILED') {
      newStatus = 'failed';
    }

    // Update Database using merchantOrderId (which maps to our transaction_id)
    if (merchantOrderId) {
      await supabaseAdmin
        .from('payment_links')
        .update({ status: newStatus })
        .eq('transaction_id', merchantOrderId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
