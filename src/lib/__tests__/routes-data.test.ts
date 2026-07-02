import { describe, it, expect } from 'vitest';
import { allRoutes, getRouteBySlug, getAllRouteSlugs } from '@/lib/routes-data';

describe('routes-data', () => {
  it('exports allRoutes as a non-empty array', () => {
    expect(Array.isArray(allRoutes)).toBe(true);
    expect(allRoutes.length).toBeGreaterThan(0);
  });

  it('getRouteBySlug returns a route for known slugs', () => {
    const route = getRouteBySlug('chandigarh-to-delhi');
    expect(route).not.toBeNull();
    expect(route?.from).toBe('Chandigarh');
    expect(route?.to).toBe('Delhi');
  });

  it('getRouteBySlug returns undefined for unknown slugs', () => {
    expect(getRouteBySlug('nonexistent-route')).toBeUndefined();
  });

  it('getAllRouteSlugs returns all slugs', () => {
    const slugs = getAllRouteSlugs();
    expect(slugs.length).toBe(allRoutes.length);
    slugs.forEach(s => expect(s.slug).toBeDefined());
  });
});
