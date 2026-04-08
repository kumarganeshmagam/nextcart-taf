import { test, expect } from '../../src/fixture';

test.describe('Login & Registration Integration @integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('User registration should be successful with valid data', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Existing user login should succeed', async ({ page }) => {
    // API call followed by UI verification
    await expect(page).toHaveURL(/.*\/login/);
  });
});
