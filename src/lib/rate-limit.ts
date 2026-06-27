const rateMap = new Map<string, { count: number; resetAt: number }>();

const CLEANUP_INTERVAL = 60_000;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (entry.resetAt <= now) rateMap.delete(key);
  }
}, CLEANUP_INTERVAL);

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const existing = rateMap.get(opts.key);

  if (!existing || existing.resetAt <= now) {
    rateMap.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (existing.count >= opts.limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  existing.count++;
  return { allowed: true, retryAfter: 0 };
}
