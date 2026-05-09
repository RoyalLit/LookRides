import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBookingNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickup_location, drop_location, date, time, passenger_name, phone } = body;

    if (!pickup_location || !drop_location || !date || !time || !phone) {
      return NextResponse.json(
        { error: 'Pickup, drop, date, time, and phone number are required.' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase
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

    // 2. Send email notification (non-blocking — don't fail booking if email fails)
    try {
      await sendBookingNotification({ pickup_location, drop_location, date, time });
    } catch (emailErr) {
      console.error('Email notification failed (booking saved):', emailErr);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
