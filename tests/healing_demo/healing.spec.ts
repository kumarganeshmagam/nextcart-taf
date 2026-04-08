import { test, expect } from '../../src/fixture';

test.describe('Self-Healing Demo', () => {

    test('Heal a broken login button locator', async ({ page }) => {
        // Use 'domcontentloaded' for faster/more stable navigation in demos
        await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

        // Interaction starts here (where the self-healing proxy kicks in)
        await page.click('[data-testid="incorrect-login-button"]');

        await expect(page).toHaveURL("http://localhost:3000/");
    });

});
