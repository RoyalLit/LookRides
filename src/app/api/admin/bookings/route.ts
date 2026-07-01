import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/admin-auth';
import { rateLimit } from '@/lib/rate-limit';

export async function GET() {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
});

export async function PUT(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, retryAfter } = await rateLimit({
      key: `admin-bookings:${ip}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { id, status } = parsed.data;

    const { error } = await supabaseAdmin
      .from('booking_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
