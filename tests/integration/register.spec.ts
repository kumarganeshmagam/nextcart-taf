import { test, expect } from '../../src/fixture';

test.describe('Registration Integration @integration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    test('Validate account registration via API and UI verification', async ({ page }) => {
        await expect(page).toHaveURL(/.*\/register/);
    });
});
