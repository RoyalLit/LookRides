import { supabaseAdmin } from './supabase-admin';

type RateLimitResult = { allowed: boolean; retryAfter: number };

export async function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<RateLimitResult> {
  try {
    const now = Date.now();
    const windowStart = new Date(now).toISOString();
    const [ip, endpoint] = opts.key.split(':');

    const { data: existing } = await supabaseAdmin
      .from('rate_limits')
      .select('request_count, window_start, blocked_until')
      .eq('ip_address', ip)
      .eq('endpoint', endpoint)
      .maybeSingle();

    // Check hard block first (exponential backoff for abuse)
    if (existing?.blocked_until) {
      const blockedUntil = new Date(existing.blocked_until).getTime();
      if (now < blockedUntil) {
        const retryAfter = Math.ceil((blockedUntil - now) / 1000);
        return { allowed: false, retryAfter: Math.min(retryAfter, 3600) };
      }
    }

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
        .update({ request_count: 1, window_start: windowStart, blocked_until: null })
        .eq('ip_address', ip)
        .eq('endpoint', endpoint);
      return { allowed: true, retryAfter: 0 };
    }

    if (existing.request_count >= opts.limit) {
      const retryAfter = Math.ceil((existingStart + opts.windowMs - now) / 1000);

      // Exponential backoff: if limit exceeded repeatedly, escalate block duration
      if (existing.request_count >= opts.limit * 3) {
        const blockMinutes = Math.min(60, 2 ** (Math.floor(existing.request_count / opts.limit) - 2));
        const blockedUntil = new Date(now + blockMinutes * 60 * 1000).toISOString();
        await supabaseAdmin
          .from('rate_limits')
          .update({ blocked_until: blockedUntil })
          .eq('ip_address', ip)
          .eq('endpoint', endpoint);
      }

      return { allowed: false, retryAfter };
    }

    await supabaseAdmin
      .from('rate_limits')
      .update({ request_count: existing.request_count + 1 })
      .eq('ip_address', ip)
      .eq('endpoint', endpoint);
    return { allowed: true, retryAfter: 0 };
  } catch {
    // Fail closed: deny on error
    return { allowed: false, retryAfter: 60 };
  }
}
