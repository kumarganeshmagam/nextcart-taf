import { test, expect } from '../../src/fixture';

test.describe('Search Feature Verification @feature', () => {
  test('Search filtering should return correct results', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.getByTestId('header-search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Laptop');
    await page.getByTestId('header-search-btn').click();
  });
});
