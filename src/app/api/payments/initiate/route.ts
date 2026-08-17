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
      return NextResponse.json({ error: 'Valid payment link ID is required' }, { status: 400 });
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

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                     (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://lookrides.com'));

    const redirectUrl = `${SITE_URL}/api/payments/payu-redirect?id=${link.id}`;

    return NextResponse.json({
      success: true,
      redirectUrl,
    });

  } catch (error) {
    console.error('PayU Initiate Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
