import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';
import { CartLocators } from '../locators/cartpage.locators';

export class CartPage extends BasePage {
  public locators: CartLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocators(page);
  }

  async open() {
    await this.navigate('/cart');
  }

  async applyPromoCode(code: string) {
    await this.locators.cartPromoInput.fill(code);
    await this.locators.cartApplyPromoBtn.click();
  }

  async proceedToCheckout() {
    await this.locators.cartCheckoutBtn.click();
  }
}
