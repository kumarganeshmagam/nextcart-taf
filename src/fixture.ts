import { test as base } from '@playwright/test';
import { HomePage } from './pages/homepage';
import { CartPage } from './pages/cartpage';
import { CheckoutPage } from './pages/checkoutpage';
import { HealingProxy } from './healing/HealingProxy';

type MyFixtures = {
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/**
 * Custom fixture extending the base Playwright test.
 * Automatically injects the "HealedPage" proxy into the test arguments.
 */
export const test = base.extend<MyFixtures>({
  page: async ({ page }, use) => {
    // Transparently wrap the page with self-healing capabilities
    const healedPage = HealingProxy.wrap(page);
    await use(healedPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
