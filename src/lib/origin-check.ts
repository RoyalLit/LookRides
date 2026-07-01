const ALLOWED_ORIGINS = [
  'https://lookrides.com',
  'https://www.lookrides.com',
  'https://lookrides.in',
  'https://www.lookrides.in',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
];

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (!origin && !referer) return false;
  const check = origin || referer || '';
  try {
    const url = new URL(check);
    return ALLOWED_ORIGINS.some((allowed) => url.origin === allowed);
  } catch {
    return false;
  }
}
