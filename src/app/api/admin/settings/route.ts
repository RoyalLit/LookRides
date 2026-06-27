import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const settingsSchema = z.object({
  key: z.string().min(1, 'Key is required').max(100),
  value: z.union([z.string(), z.number()]).transform(v => String(v)),
});

async function getAdminUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.is_admin !== true) return null;
  return user;
}

export async function GET() {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) {
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, retryAfter } = rateLimit({
      key: `admin-settings:${ip}`,
      limit: 30,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    const { key, value } = parsed.data;

    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' });

    if (error) {
      return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
