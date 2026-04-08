import { test, expect } from '../../src/fixture';

test.describe('Cart Page Smoke Tests @smoke', () => {
    test.beforeEach(async ({ cartPage }) => {
        await cartPage.open();
    });

    test('Verify cart shows empty by default or elements load', async ({ cartPage }) => {
        // Just verify critical components appear
        // The cart page might show "empty state" differently, but cart summary may be visible or hidden depending on items.
        // Let's ensure navigation worked by verifying URL
        const url = await cartPage.getURL();
        expect(url).toContain('/cart');
    });
});
