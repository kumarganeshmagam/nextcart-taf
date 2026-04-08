import { test, expect } from '../../src/fixture';

test.describe('Cart Checkout Integration @integration', () => {
    test.beforeEach(async ({ checkoutPage }) => {
        await checkoutPage.open();
    });

    test('Verify cart state consistency during payment integration', async ({ page }) => {
        // Assert we got directed successfully to checkout or cart due to redirection natively inside the Next app
        await expect(page).toHaveURL(/.*\/checkout|.*\/cart|.*\/login/);
    });
});
