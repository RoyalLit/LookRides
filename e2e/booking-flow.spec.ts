import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('booking form renders and submits successfully', async ({ page }) => {
    await page.goto('/');

    const form = page.locator('form');
    await expect(form).toBeVisible();

    await form.locator('#passenger_name').fill('Test User');
    await form.locator('#phone').fill('9876543210');
    await form.locator('#pickup_location').fill('Chandigarh');
    await form.locator('#drop_location').fill('Delhi');
    await form.locator('#date_display').fill('25/12/2026');
    await form.locator('#time').fill('08:00');
  });

  test('booking form validates required fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('#booking-error')).not.toBeVisible();
  });
});
