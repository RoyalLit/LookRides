import { describe, it, expect } from 'vitest';
import { BUSINESS_PHONE_DISPLAY } from '@/lib/config';

describe('config', () => {
  it('exports a valid phone display string', () => {
    expect(BUSINESS_PHONE_DISPLAY).toMatch(/^\+91 \d{5} \d{5}$/);
  });
});
