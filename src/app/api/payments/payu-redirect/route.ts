import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentLinkId = searchParams.get('id');

  if (!paymentLinkId) {
    return new Response('Payment link ID is required', { status: 400 });
  }

  const { data: link, error } = await supabaseAdmin
    .from('payment_links')
    .select('*')
    .eq('id', paymentLinkId)
    .single();

  if (error || !link) {
    return new Response('Payment link not found', { status: 404 });
  }

  if (link.status !== 'pending') {
    return new Response('Payment link is no longer pending', { status: 400 });
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

  const amountStr = Number(link.amount).toFixed(2);
  const productInfo = (link.purpose || 'LookRides Outstation Taxi').replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 80) || 'LookRides Taxi';
  const firstName = (link.customer_name || 'Customer').replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 40) || 'Customer';
  const email = link.customer_email || 'info@lookrides.com';
  const phone = (link.customer_phone || '9780426567').replace(/[^0-9]/g, '').slice(-10) || '9780426567';
  const udf1 = link.id;

  // PayU Input Hash Sequence: EXACT 17 fields joined by 16 '|' characters
  const hashFields = [
    merchantKey,
    transactionId,
    amountStr,
    productInfo,
    firstName,
    email,
    udf1,
    '', '', '', '', '', '', '', '', '',
    merchantSalt
  ];

  const hashSequence = hashFields.join('|');

  const hash = crypto
    .createHash('sha512')
    .update(hashSequence)
    .digest('hex')
    .toLowerCase();

  const payuUrl = payuEnv === 'PROD'
    ? 'https://secure.payu.in/_payment'
    : 'https://test.payu.in/_payment';

  const surl = `${SITE_URL}/api/payments/verify`;
  const furl = `${SITE_URL}/api/payments/verify`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting to PayU...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background-color: #0b132b;
      color: #ffffff;
      text-align: center;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 40px 30px;
      border-radius: 16px;
      max-width: 400px;
      width: 90%;
    }
    .spinner {
      border: 3px solid rgba(255, 255, 255, 0.1);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border-left-color: #fca311;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .btn {
      background: #fca311;
      color: #000000;
      border: none;
      padding: 12px 24px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 20px;
      text-decoration: none;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <h2>Connecting to PayU...</h2>
    <p style="color: #94a3b8; font-size: 0.95rem;">Transferring securely to PayU Payment Gateway.</p>
    
    <form id="payuForm" action="${payuUrl}" method="POST">
      <input type="hidden" name="key" value="${merchantKey}" />
      <input type="hidden" name="txnid" value="${transactionId}" />
      <input type="hidden" name="amount" value="${amountStr}" />
      <input type="hidden" name="productinfo" value="${productInfo}" />
      <input type="hidden" name="firstname" value="${firstName}" />
      <input type="hidden" name="email" value="${email}" />
      <input type="hidden" name="phone" value="${phone}" />
      <input type="hidden" name="surl" value="${surl}" />
      <input type="hidden" name="furl" value="${furl}" />
      <input type="hidden" name="hash" value="${hash}" />
      <input type="hidden" name="udf1" value="${udf1}" />
      <input type="submit" class="btn" value="Click here if not redirected automatically" />
    </form>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("payuForm").submit();
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
