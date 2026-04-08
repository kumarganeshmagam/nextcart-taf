import { test, expect } from '../../src/fixture';

test.describe('Product Checkout Flows @e2e', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('Complete product purchase flow', async ({ homePage, cartPage, checkoutPage, page }) => {
        // 1. Validate on Homepage and search
        await homePage.searchProduct('Laptop');
        
        // Next.js routing should change to something like /products or /search
        await page.waitForTimeout(2000); // Basic wait for transition

        // 2. Click the first product and add to cart directly from the home page featured products
        await homePage.open();
        // Home page has featured products, let's grab the first product's add to cart button
        const addToCartBtn = page.getByTestId('product-card-add-to-cart-btn').first();
        await expect(addToCartBtn).toBeVisible();
        await addToCartBtn.click();

        // 3. Navigate to Cart
        await homePage.locators.navCartIcon.click();
        await expect(page).toHaveURL(/.*\/cart/);

        // 4. Verify inside Cart Page
        const cartSummary = cartPage.locators.cartSummary;
        await expect(cartSummary).toBeVisible();
        
        // 5. Proceed to Checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*\/checkout|.*\/login/); // Might redirect to login if unauthenticated
    });
});
