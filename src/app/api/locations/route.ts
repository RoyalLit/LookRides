import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const { allowed, retryAfter } = await rateLimit({
    key: `locations:${ip}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 3) {
    return NextResponse.json({ features: [] });
  }

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&location_bias_scale=0.5&bbox=68.1,6.5,97.4,35.5`;

    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'LookRides/1.0 (contact@lookrides.com)',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Photon API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ features: [] }, { status: 500 });
  }
}
