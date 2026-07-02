import { describe, it, expect } from 'vitest';

function htmlEscape(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

describe('htmlEscape', () => {
  it('escapes ampersands', () => {
    expect(htmlEscape('AT&T')).toBe('AT&amp;T');
  });

  it('escapes angle brackets', () => {
    expect(htmlEscape('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('returns empty string for null/undefined', () => {
    expect(htmlEscape(null)).toBe('');
    expect(htmlEscape(undefined)).toBe('');
  });

  it('passes through normal strings unchanged', () => {
    expect(htmlEscape('hello world')).toBe('hello world');
  });
});
