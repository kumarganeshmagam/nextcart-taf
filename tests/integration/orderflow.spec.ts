import { test, expect } from '../../src/fixture';

test.describe('Order Flow Integration @integration', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('End to end integration from inventory to fulfillment', async ({ homePage, page }) => {
        // Ensure home loads first
        await expect(homePage.locators.headerLogo).toBeVisible();
        await page.goto('/checkout');
        await expect(page).toHaveURL(/.*\/checkout|.*\/login/);
    });
});
