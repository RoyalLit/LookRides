import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendBookingNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { isAllowedOrigin } from '@/lib/origin-check';

const bookingSchema = z.object({
  pickup_location: z.string().min(1, 'Pickup location is required').max(200),
  drop_location: z.string().min(1, 'Drop location is required').max(200),
  date: z.string().min(1, 'Date is required').max(20),
  time: z.string().min(1, 'Time is required').max(20),
  passengers: z.string().max(10).optional(),
  notes: z.string().max(1000).optional(),
  passenger_name: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
});

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed, retryAfter } = await rateLimit({
      key: `booking:${ip}`,
      limit: 5,
      windowMs: 15 * 60 * 1000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { pickup_location, drop_location, date, time, passenger_name, phone, notes } = parsed.data;

    const { error: dbError } = await supabaseAdmin
      .from('booking_requests')
      .insert([{
        pickup_location,
        drop_location,
        date,
        time,
        passenger_name: passenger_name || null,
        phone: phone || null,
        status: 'pending',
      }]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save booking. Please call us directly.' },
        { status: 500 }
      );
    }

    try {
      await sendBookingNotification({
        pickup_location,
        drop_location,
        date,
        time,
        passenger_name,
        phone,
        notes,
      });
    } catch (emailErr) {
      console.error('Email notification failed (booking saved):', emailErr);
    }

    return NextResponse.json({ success: true }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
