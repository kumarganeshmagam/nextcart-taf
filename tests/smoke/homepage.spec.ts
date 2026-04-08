import { test, expect } from '../../src/fixture';

test.describe('Home Page Smoke Tests @smoke', () => {
  
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should load home page and display logo via getByTestId', async ({ homePage }) => {
    await expect(homePage.locators.headerLogo).toBeVisible();
    await expect(homePage.locators.headerLogo).toHaveText('NexCart');
  });

  test('should display featured products section', async ({ homePage }) => {
    await expect(homePage.locators.featuredProductsGrid).toBeVisible();
    const count = await homePage.getFeaturedProductsCount();
    expect(count).toBeGreaterThanOrEqual(1); // Real Next.js app has featured products
  });

  test('should navigate to login page using header nav link', async ({ homePage, page }) => {
    await homePage.navigateToLogin();
    await expect(page).toHaveURL(/.*\/login/);
  });
});
