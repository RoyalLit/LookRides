import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawText = await request.text();
    let payload: Record<string, string> = {};

    // Check if JSON or Form Data
    try {
      payload = JSON.parse(rawText);
    } catch {
      const searchParams = new URLSearchParams(rawText);
      searchParams.forEach((val, k) => {
        payload[k] = val;
      });
    }

    const status = payload.status || '';
    const txnid = payload.txnid || '';
    const amount = payload.amount || '';
    const productinfo = payload.productinfo || '';
    const firstname = payload.firstname || '';
    const email = payload.email || '';
    const linkId = payload.udf1 || '';
    const receivedHash = payload.hash || '';
    const key = payload.key || '';
    const additionalCharges = payload.additionalCharges || '';

    const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'MGWotrXq9kr8CGoBBOpSl3uP0OlUYGi1';

    if (!txnid || !receivedHash) {
      return NextResponse.json({ error: 'Missing required webhook payload fields' }, { status: 400 });
    }

    // PayU Reverse Hash Verification Formula:
    // sha512(SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    const udf2 = payload.udf2 || '';
    const udf3 = payload.udf3 || '';
    const udf4 = payload.udf4 || '';
    const udf5 = payload.udf5 || '';
    const udf6 = payload.udf6 || '';
    const udf7 = payload.udf7 || '';
    const udf8 = payload.udf8 || '';
    const udf9 = payload.udf9 || '';
    const udf10 = payload.udf10 || '';

    let hashSequence = `${merchantSalt}|${status}|${udf10}|${udf9}|${udf8}|${udf7}|${udf6}|${udf5}|${udf4}|${udf3}|${udf2}|${linkId}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

    if (additionalCharges) {
      hashSequence = `${additionalCharges}|${hashSequence}`;
    }

    const calculatedHash = crypto
      .createHash('sha512')
      .update(hashSequence)
      .digest('hex')
      .toLowerCase();

    if (calculatedHash !== receivedHash.toLowerCase()) {
      console.error('PayU Webhook Hash Mismatch:', { calculatedHash, receivedHash });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const isSuccess = status.toLowerCase() === 'success';
    const newStatus = isSuccess ? 'success' : 'failed';

    // Update Database
    if (linkId) {
      await supabaseAdmin
        .from('payment_links')
        .update({
          status: newStatus,
          transaction_id: txnid,
          ...(isSuccess ? { paid_at: new Date().toISOString() } : {}),
        })
        .eq('id', linkId);
    } else if (txnid) {
      await supabaseAdmin
        .from('payment_links')
        .update({
          status: newStatus,
          ...(isSuccess ? { paid_at: new Date().toISOString() } : {}),
        })
        .eq('transaction_id', txnid);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PayU Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
