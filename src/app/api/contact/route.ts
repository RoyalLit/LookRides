import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const ALLOWED_ORIGINS = ['https://lookrides.com', 'https://www.lookrides.com', 'https://lookrides.in', 'https://www.lookrides.in', 'http://localhost:3000'];

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required').max(200),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
});

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (!origin && !referer) return false;
  const check = origin || referer || '';
  return ALLOWED_ORIGINS.some((allowed) => check.startsWith(allowed));
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed, retryAfter } = rateLimit({
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

    await sendContactNotification({ name, email, phone, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
