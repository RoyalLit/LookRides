import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/admin-auth';

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

    const headers = ['ID', 'Passenger Name', 'Phone', 'Pickup', 'Drop-off', 'Date', 'Time', 'Status', 'Created At'];
    const rows = (data || []).map(b => [
      b.id,
      b.passenger_name || '',
      b.phone || '',
      b.pickup_location,
      b.drop_location,
      b.date,
      b.time,
      b.status,
      b.created_at,
    ].map(cell => {
      const str = String(cell);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="bookings-export.csv"',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to export bookings' }, { status: 500 });
  }
}
