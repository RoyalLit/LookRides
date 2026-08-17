import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawText = await request.text();
    let payload: Record<string, string> = {};

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

    const reverseFields = [
      additionalCharges || null,
      merchantSalt,
      status,
      payload.udf10 || '',
      payload.udf9 || '',
      payload.udf8 || '',
      payload.udf7 || '',
      payload.udf6 || '',
      payload.udf5 || '',
      payload.udf4 || '',
      payload.udf3 || '',
      payload.udf2 || '',
      linkId, // udf1
      email,
      firstname,
      productinfo,
      amount,
      txnid,
      key
    ].filter((item) => item !== null);

    const hashSequence = reverseFields.join('|');

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
