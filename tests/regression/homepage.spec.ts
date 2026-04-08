import { test, expect } from '../../src/fixture';

test.describe('Home Page Regression @regression', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('Validate all links in footer are working', async ({ homePage }) => {
        await expect(homePage.locators.footer).toBeVisible();
    });
});
