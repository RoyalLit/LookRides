import { Resend } from 'resend';
import { supabase } from './supabase';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

/**
 * Fetches notification settings from Supabase and sends alerts via Email and Telegram
 */
export const sendBookingNotification = async (bookingDetails: any) => {
  try {
    // 1. Fetch settings from DB
    const { data: settings } = await supabase.from('site_settings').select('*');
    
    const targetEmail = settings?.find(s => s.key === 'notification_email')?.value || 'info@lookride.in';
    const tgToken = settings?.find(s => s.key === 'telegram_bot_token')?.value;
    const tgChatId = settings?.find(s => s.key === 'telegram_chat_id')?.value;

    const emailSubject = `🚕 New Booking: ${bookingDetails.pickup_location} to ${bookingDetails.drop_location}`;
    const messageBody = `
      New Booking Request Received:
      ---------------------------
      Customer: ${bookingDetails.passenger_name || 'N/A'}
      Phone: ${bookingDetails.phone || 'N/A'}
      Pickup: ${bookingDetails.pickup_location}
      Drop: ${bookingDetails.drop_location}
      Date: ${bookingDetails.date}
      Time: ${bookingDetails.time}
      
      Manage lead: https://lookrides.in/admin/bookings
    `;

    // 2. Send Email via Resend
    const emailPromise = resend.emails.send({
      from: 'LookRides <onboarding@resend.dev>',
      to: [targetEmail],
      subject: emailSubject,
      text: messageBody,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0B132B;">
          <h2 style="color: #FCA311;">🚕 New Booking Request</h2>
          <p><strong>Customer:</strong> ${bookingDetails.passenger_name}</p>
          <p><strong>Phone:</strong> ${bookingDetails.phone}</p>
          <p><strong>Pickup:</strong> ${bookingDetails.pickup_location}</p>
          <p><strong>Drop:</strong> ${bookingDetails.drop_location}</p>
          <p><strong>Date:</strong> ${bookingDetails.date}</p>
          <p><strong>Time:</strong> ${bookingDetails.time}</p>
          <hr/>
          <p><a href="https://lookrides.in/admin/bookings" style="background: #FCA311; color: #0B132B; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Manage in Dashboard</a></p>
        </div>
      `,
    });

    // 3. Send Telegram Alert (if configured)
    let telegramPromise = Promise.resolve();
    if (tgToken && tgChatId) {
      const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
      telegramPromise = fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: `🚕 *New Booking Request*\n\n👤 *${bookingDetails.passenger_name}*\n📞 ${bookingDetails.phone}\n📍 From: ${bookingDetails.pickup_location}\n🏁 To: ${bookingDetails.drop_location}\n📅 ${bookingDetails.date} at ${bookingDetails.time}`,
          parse_mode: 'Markdown'
        })
      });
    }

    await Promise.allSettled([emailPromise, telegramPromise]);
    return { success: true };
  } catch (err) {
    console.error('Notification system failed:', err);
    return { success: false, error: err };
  }
};
