import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 3) {
    return NextResponse.json({ features: [] });
  }

  try {
    // We use Photon (OSM) via a backend proxy to avoid browser CORS/User-Agent blocking
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&location_bias_scale=0.5&bbox=68.1,6.5,97.4,35.5`;
    
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'LookRides/1.0 (contact@lookrides.com)', // Required by free OSM APIs
      },
      next: { revalidate: 3600 } // Cache results heavily to prevent rate-limiting
    });

    if (!res.ok) {
      throw new Error(`Photon API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Location API Proxy Error:', error);
    return NextResponse.json({ features: [] }, { status: 500 });
  }
}
