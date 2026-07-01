import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const PUBLIC_KEYS = ['google_rating', 'review_count'];

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('key, value')
      .in('key', PUBLIC_KEYS);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    const result: Record<string, unknown> = {};
    (data || []).forEach((s) => { result[s.key] = s.value; });

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=120' },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
