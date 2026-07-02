import { describe, it, expect } from 'vitest';
import { isAllowedOrigin } from '@/lib/origin-check';

describe('isAllowedOrigin', () => {
  const mockRequest = (origin?: string, referer?: string): Request =>
    new Request('https://lookrides.com/api/bookings', {
      headers: {
        ...(origin ? { origin } : {}),
        ...(referer ? { referer } : {}),
      },
    });

  it('allows lookrides.com origin', () => {
    const req = mockRequest('https://lookrides.com');
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it('allows www.lookrides.com origin', () => {
    const req = mockRequest('https://www.lookrides.com');
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it('blocks unknown origin', () => {
    const req = mockRequest('https://evil-site.com');
    expect(isAllowedOrigin(req)).toBe(false);
  });

  it('blocks request with no origin or referer', () => {
    const req = mockRequest();
    expect(isAllowedOrigin(req)).toBe(false);
  });
});
