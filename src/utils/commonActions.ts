import { Page } from '@playwright/test';

/**
 * Utility class for reusable page actions like dropdown selection, handling popups, etc.
 */
export class CommonActions {
  public static async selectFromDropdown(page: Page, selector: string, value: string) {
    await page.selectOption(selector, value);
  }

  public static async scrollToElement(page: Page, selector: string) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }
}
