import { NextResponse } from 'next/server';
import { sendBookingNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    await sendBookingNotification({
      pickup_location: `Contact Form — ${name} (${email}${phone ? ', ' + phone : ''})`,
      drop_location: 'N/A',
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
