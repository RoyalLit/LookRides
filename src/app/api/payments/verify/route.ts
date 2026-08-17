import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';

export async function POST(request: Request) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                   (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://lookrides.com'));

  try {
    const formData = await request.formData();
    const payload: Record<string, string> = {};

    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

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

    if (!txnid || !linkId || !receivedHash) {
      console.error('PayU Verification error: Missing fields in payload', payload);
      return NextResponse.redirect(`${SITE_URL}/pay/${linkId}?status=failed`, 303);
    }

    // PayU Reverse Hash Verification Formula:
    // sha512(SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    // If additionalCharges is present:
    // sha512(additionalCharges|SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
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
      console.error('PayU Hash Mismatch:', { calculatedHash, receivedHash });
      return NextResponse.redirect(`${SITE_URL}/pay/${linkId}?status=failed&error=invalid_signature`, 303);
    }

    const isSuccess = status.toLowerCase() === 'success';
    const newStatus = isSuccess ? 'success' : 'failed';

    // Update Database
    await supabaseAdmin
      .from('payment_links')
      .update({
        status: newStatus,
        transaction_id: txnid,
        ...(isSuccess ? { paid_at: new Date().toISOString() } : {}),
      })
      .eq('id', linkId);

    if (isSuccess) {
      return NextResponse.redirect(`${SITE_URL}/pay/${linkId}?status=success`, 303);
    } else {
      return NextResponse.redirect(`${SITE_URL}/pay/${linkId}?status=failed`, 303);
    }
  } catch (error) {
    console.error('PayU Verify Route Error:', error);
    return NextResponse.redirect(`${SITE_URL}?status=error`, 303);
  }
}
