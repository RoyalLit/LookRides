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

    const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'eCwTWeBq';

    if (!txnid || !linkId || !receivedHash) {
      console.error('PayU Verification error: Missing fields in payload', payload);
      return NextResponse.redirect(`${SITE_URL}/pay/${linkId}?status=failed`, 303);
    }

    // PayU Reverse Hash Verification Formula:
    // sha512(SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    // If additionalCharges is present:
    // sha512(additionalCharges|SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
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
      console.error('PayU Hash Mismatch:', { calculatedHash, receivedHash });
      return NextResponse.redirect(`${SITE_URL}/pay/${linkId}?status=failed&error=invalid_signature`, 303);
    }

    const isSuccess = status.toLowerCase() === 'success';
    const newStatus = isSuccess ? 'success' : 'failed';

    // Update database record
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
