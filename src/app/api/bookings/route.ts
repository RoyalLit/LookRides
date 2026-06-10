import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { sendBookingNotification } from '@/lib/email';

const bookingSchema = z.object({
  pickup_location: z.string().min(1, 'Pickup location is required'),
  drop_location: z.string().min(1, 'Drop location is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  passengers: z.string().optional(),
  notes: z.string().optional(),
  passenger_name: z.string().optional(),
  phone: z.string().optional(),
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetTime < now) rateLimitMap.delete(key);
  }
}, 60_000);

function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { pickup_location, drop_location, date, time, passenger_name, phone, passengers, notes } = parsed.data;

    const { error: dbError } = await supabase
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
        { error: dbError.message || 'Failed to save booking. Please call us directly.' },
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

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
