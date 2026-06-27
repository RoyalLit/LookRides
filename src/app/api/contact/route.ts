import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendContactNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { isAllowedOrigin } from '@/lib/origin-check';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required').max(200),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
});

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed, retryAfter } = await rateLimit({
      key: `contact:${ip}`,
      limit: 3,
      windowMs: 15 * 60 * 1000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, phone, message } = parsed.data;

    // Persist to DB first so messages are never lost
    const { error: dbError } = await supabaseAdmin
      .from('contact_messages')
      .insert([{ name, email, phone: phone || null, message }]);

    if (dbError) {
      console.error('Contact DB Error:', dbError);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    // Send notification (best-effort, don't block on failure)
    try {
      await sendContactNotification({ name, email, phone, message });
    } catch (notifErr) {
      console.error('Contact notification failed (message saved):', notifErr);
    }

    return NextResponse.json({ success: true }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
