import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');

    // PhonePe V2 Webhook uses Basic Authentication
    // Please configure Username: lookrides, Password: WebhookSecure2026 in PhonePe Dashboard
    const expectedAuth = 'Basic ' + Buffer.from('lookrides:WebhookSecure2026').toString('base64');
    
    // We allow bypassing auth in development or if an explicit Vercel ENV var is set
    const envAuth = process.env.PHONEPE_WEBHOOK_AUTH ? `Basic ${Buffer.from(process.env.PHONEPE_WEBHOOK_AUTH).toString('base64')}` : expectedAuth;

    if (!authHeader || authHeader !== envAuth) {
      console.error('Invalid Webhook Authorization', authHeader);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
