import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully and displays key content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LookRides/);
    await expect(page.locator('h1')).toContainText('Premium Intercity Cabs');
    await expect(page.locator('[data-journey="hero"]')).toBeVisible();
    await expect(page.locator('[data-journey="trust"]')).toBeVisible();
    await expect(page.locator('[data-journey="destinations"]')).toBeVisible();
  });

  test('skip to content link is focusable', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeVisible();
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });
});
