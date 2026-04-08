import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';
import { HomeLocators } from '../locators/homepage.locators';

/**
 * Page Object for the Home Page.
 */
export class HomePage extends BasePage {
  public locators: HomeLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new HomeLocators(page);
  }

  async open() {
    await this.navigate('/');
  }

  async searchProduct(productName: string) {
    await this.locators.searchInput.fill(productName);
    await this.locators.searchBtn.click();
  }

  async navigateToLogin() {
    await this.locators.navLoginLink.click();
  }

  async getFeaturedProductsCount(): Promise<number> {
    return await this.locators.productCards.count();
  }
}
