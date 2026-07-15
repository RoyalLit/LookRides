import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend } from '@/lib/email';
import { getAdminUser } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { SITE_URL, SITE_NAME } from '@/lib/config';

const sendEmailSchema = z.object({
  paymentLinkId: z.string().uuid()
});

export async function POST(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = sendEmailSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { paymentLinkId } = result.data;

    // Fetch link details
    const { data: link, error } = await supabaseAdmin
      .from('payment_links')
      .select('*')
      .eq('id', paymentLinkId)
      .single();

    if (error || !link) {
      return NextResponse.json({ error: 'Payment link not found' }, { status: 404 });
    }

    if (!link.customer_email) {
      return NextResponse.json({ error: 'No email address associated with this link' }, { status: 400 });
    }

    const payUrl = `${SITE_URL}/pay/${link.id}`;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Billing @ ${SITE_NAME} <info@lookride.in>`,
      to: [link.customer_email],
      subject: `Payment Request from ${SITE_NAME} - ₹${link.amount}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Payment Request</h2>
          <p>Hello,</p>
          <p>Please click the button below to complete your payment of <strong>₹${link.amount}</strong> for your LookRides booking.</p>
          ${link.purpose ? `<p><strong>Details:</strong> ${link.purpose}</p>` : ''}
          <div style="text-align: center; margin: 30px 0;">
            <a href="${payUrl}" style="background-color: #f5b754; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Pay ₹${link.amount} Now</a>
          </div>
          <p style="font-size: 14px; color: #666;">If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="font-size: 14px; color: #333; word-break: break-all;"><a href="${payUrl}">${payUrl}</a></p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
        </div>
      `
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: emailData?.id });
  } catch (error) {
    console.error('Send Email Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
