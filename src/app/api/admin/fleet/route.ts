import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/admin-auth';
import { rateLimit } from '@/lib/rate-limit';

const fleetSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  seats: z.number().int().min(1),
  bags: z.number().int().min(0),
  price_desc: z.string().max(200).optional(),
  image_url: z.string().max(500).optional(),
  is_active: z.boolean().optional(),
  order_index: z.number().int().optional(),
});

export async function GET() {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('fleet')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch fleet' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch fleet' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, retryAfter } = await rateLimit({
      key: `admin-fleet:${ip}`,
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
    const parsed = fleetSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('fleet').insert([parsed.data]);
    if (error) {
      return NextResponse.json({ error: 'Failed to add vehicle' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, retryAfter } = await rateLimit({
      key: `admin-fleet:${ip}`,
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
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const parsed = fleetSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('fleet').update(parsed.data).eq('id', id);
    if (error) {
      return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('fleet').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
