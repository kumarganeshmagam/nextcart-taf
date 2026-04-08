import { Page, expect } from '@playwright/test';

/**
 * Base class for all Page Objects.
 * Contains common actions and utility methods.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async fillInput(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async checkElement(selector: string) {
    await this.page.check(selector);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async hoverElement(selector: string) {
    await this.page.hover(selector);
  }
}
