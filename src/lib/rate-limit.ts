import { supabaseAdmin } from './supabase-admin';

export async function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<{ allowed: boolean; retryAfter: number }> {
  try {
    const now = Date.now();
    const windowStart = new Date(now).toISOString();
    const [ip, endpoint] = opts.key.split(':');

    const { data: existing } = await supabaseAdmin
      .from('rate_limits')
      .select('request_count, window_start')
      .eq('ip_address', ip)
      .eq('endpoint', endpoint)
      .maybeSingle();

    if (!existing) {
      await supabaseAdmin
        .from('rate_limits')
        .insert({ ip_address: ip, endpoint, request_count: 1, window_start: windowStart });
      return { allowed: true, retryAfter: 0 };
    }

    const existingStart = new Date(existing.window_start).getTime();
    if (now - existingStart > opts.windowMs) {
      await supabaseAdmin
        .from('rate_limits')
        .update({ request_count: 1, window_start: windowStart })
        .eq('ip_address', ip)
        .eq('endpoint', endpoint);
      return { allowed: true, retryAfter: 0 };
    }

    if (existing.request_count >= opts.limit) {
      const retryAfter = Math.ceil((existingStart + opts.windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    await supabaseAdmin
      .from('rate_limits')
      .update({ request_count: existing.request_count + 1 })
      .eq('ip_address', ip)
      .eq('endpoint', endpoint);
    return { allowed: true, retryAfter: 0 };
  } catch {
    return { allowed: false, retryAfter: 60 };
  }
}
