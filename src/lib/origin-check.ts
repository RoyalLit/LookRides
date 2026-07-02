const ALLOWED_ORIGINS = [
  'https://lookrides.com',
  'https://www.lookrides.com',
  'https://lookrides.in',
  'https://www.lookrides.in',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
];

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  // Only check Origin header — referer is attacker-controlled (spoofable).
  // Browsers set Origin on all cross-origin POST requests; same-origin POSTs omit it.
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return ALLOWED_ORIGINS.some((allowed) => url.origin === allowed);
  } catch {
    return false;
  }
}
