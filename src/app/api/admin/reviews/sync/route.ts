import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/admin-auth';
import { rateLimit } from '@/lib/rate-limit';

interface GoogleReviewResult {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

async function syncFromSerpApi(placeId: string): Promise<{
  rating: string | null;
  totalReviews: string | null;
  reviews: GoogleReviewResult[];
}> {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    throw new Error('SERPAPI_API_KEY not configured');
  }

  const url = `https://serpapi.com/search?engine=google_maps&place_id=${encodeURIComponent(placeId)}&api_key=${apiKey}&type=place`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  const placeData = data.place_results || {};
  const rating = placeData.rating?.toString() || null;
  const totalReviews = placeData.reviews?.toString() || placeData.user_ratings_total?.toString() || null;
  const rawReviews: { name?: string; rating?: number; snippet?: string; date?: string; link?: string }[] = data.reviews || [];

  const reviews: GoogleReviewResult[] = rawReviews.map((r, i) => ({
    author: r.name || `Google User ${i + 1}`,
    rating: r.rating || 5,
    text: r.snippet || '',
    relativeTime: r.date || `sync_${i}`,
  }));

  return { rating, totalReviews, reviews };
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, retryAfter } = await rateLimit({
      key: `admin-reviews-sync:${ip}`,
      limit: 5,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const { data: placeSetting } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'place_id')
      .single();

    const placeId = placeSetting?.value;
    if (!placeId) {
      return NextResponse.json({ error: 'No Place ID configured. Add your Google Business Place ID in Settings first.' }, { status: 400 });
    }

    let result: { rating: string | null; totalReviews: string | null; reviews: GoogleReviewResult[] };

    try {
      result = await syncFromSerpApi(placeId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return NextResponse.json({
        error: `Sync failed: ${msg}. To use the free SerpAPI: sign up at https://serpapi.com (no credit card), add SERPAPI_API_KEY to .env.local`,
      }, { status: 502 });
    }

    if (result.rating) {
      await supabaseAdmin.from('site_settings').upsert(
        { key: 'google_rating', value: result.rating },
        { onConflict: 'key' }
      );
    }

    if (result.totalReviews) {
      await supabaseAdmin.from('site_settings').upsert(
        { key: 'review_count', value: result.totalReviews },
        { onConflict: 'key' }
      );
    }

    let imported = 0;
    let skipped = 0;

    for (const review of result.reviews) {
      const googleReviewId = `${placeId}_${review.author}_${review.relativeTime}`;

      const { data: existing } = await supabaseAdmin
        .from('reviews')
        .select('id')
        .eq('google_review_id', googleReviewId)
        .maybeSingle();

      if (existing) {
        skipped++;
        continue;
      }

      const { error: insertError } = await supabaseAdmin.from('reviews').insert({
        author: review.author,
        text: review.text,
        rating: review.rating,
        city: 'Google Maps',
        is_visible: true,
        google_review_id: googleReviewId,
      });

      if (!insertError) imported++;
    }

    return NextResponse.json({
      success: true,
      rating: result.rating,
      total_reviews: result.totalReviews,
      imported,
      skipped,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Sync failed: ' + message }, { status: 500 });
  }
}
