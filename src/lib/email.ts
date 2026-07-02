import { Resend } from 'resend';
import { supabaseAdmin } from './supabase-admin';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

function htmlEscape(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

import { SITE_NAME } from './config';

const fromEmail = process.env.RESEND_FROM_EMAIL || `${SITE_NAME} <onboarding@resend.dev>`;

export const sendBookingNotification = async (bookingDetails: {
  pickup_location?: string;
  drop_location?: string;
  passenger_name?: string;
  phone?: string;
  date?: string;
  time?: string;
  notes?: string;
}) => {
  try {
    const { data: settings } = await supabaseAdmin.from('site_settings').select('*');

    const targetEmail = settings?.find(s => s.key === 'notification_email')?.value || 'info@lookride.in';
    const tgChatId = settings?.find(s => s.key === 'telegram_chat_id')?.value;

    const emailSubject = `New Booking: ${bookingDetails.pickup_location} to ${bookingDetails.drop_location}`;

    const pn = htmlEscape(bookingDetails.passenger_name);
    const ph = htmlEscape(bookingDetails.phone);
    const pu = htmlEscape(bookingDetails.pickup_location);
    const dr = htmlEscape(bookingDetails.drop_location);
    const da = htmlEscape(bookingDetails.date);
    const ti = htmlEscape(bookingDetails.time);
    const nt = htmlEscape(bookingDetails.notes);

    const emailPromise = resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: emailSubject,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0B132B;">
          <h2 style="color: #FCA311;">New Booking Request</h2>
          <p><strong>Customer:</strong> ${pn}</p>
          <p><strong>Phone:</strong> ${ph}</p>
          <p><strong>Pickup:</strong> ${pu}</p>
          <p><strong>Drop:</strong> ${dr}</p>
          <p><strong>Date:</strong> ${da}</p>
          <p><strong>Time:</strong> ${ti}</p>
          ${nt ? `<p><strong>Notes:</strong> ${nt}</p>` : ''}
          <hr/>
          <p><a href="https://lookrides.in/admin/bookings" style="background: #FCA311; color: #0B132B; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Manage in Dashboard</a></p>
        </div>
      `,
    });

    let telegramPromise: Promise<unknown> = Promise.resolve();
    if (TELEGRAM_BOT_TOKEN && tgChatId) {
      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      telegramPromise = fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: `New Booking Request\n\nName: ${bookingDetails.passenger_name || 'N/A'}\nPhone: ${bookingDetails.phone || 'N/A'}\nFrom: ${bookingDetails.pickup_location}\nTo: ${bookingDetails.drop_location}\nDate: ${bookingDetails.date} at ${bookingDetails.time}`,
        }),
      });
    }

    await Promise.allSettled([emailPromise, telegramPromise]);
    return { success: true };
  } catch (err) {
    console.error('Notification system failed:', err);
    return { success: false, error: err };
  }
};

export const sendContactNotification = async (contactDetails: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  try {
    const { data: settings } = await supabaseAdmin.from('site_settings').select('*');

    const targetEmail = settings?.find(s => s.key === 'notification_email')?.value || 'info@lookride.in';
    const tgChatId = settings?.find(s => s.key === 'telegram_chat_id')?.value;

    const n = htmlEscape(contactDetails.name);
    const e = htmlEscape(contactDetails.email);
    const p = htmlEscape(contactDetails.phone);
    const m = htmlEscape(contactDetails.message);

    const emailSubject = `Contact Form: ${contactDetails.name}`;

    const emailPromise = resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: emailSubject,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0B132B;">
          <h2 style="color: #FCA311;">New Contact Message</h2>
          <p><strong>Name:</strong> ${n}</p>
          <p><strong>Email:</strong> ${e}</p>
          ${p ? `<p><strong>Phone:</strong> ${p}</p>` : ''}
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #FCA311;">${m}</blockquote>
        </div>
      `,
    });

    let telegramPromise: Promise<unknown> = Promise.resolve();
    if (TELEGRAM_BOT_TOKEN && tgChatId) {
      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      telegramPromise = fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: `Contact Form\n\nName: ${contactDetails.name}\nEmail: ${contactDetails.email}\nMessage: ${contactDetails.message}`,
        }),
      });
    }

    await Promise.allSettled([emailPromise, telegramPromise]);
    return { success: true };
  } catch (err) {
    console.error('Contact notification failed:', err);
    return { success: false, error: err };
  }
};
