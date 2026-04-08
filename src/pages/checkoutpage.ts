import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';
import { CheckoutLocators } from '../locators/checkoutpage.locators';

export class CheckoutPage extends BasePage {
  public locators: CheckoutLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutLocators(page);
  }

  async open() {
    await this.navigate('/checkout');
  }

  async fillShippingDetails(name: string, email: string, address: string, city: string, state: string, zip: string) {
    await this.locators.nameInput.fill(name);
    await this.locators.emailInput.fill(email);
    await this.locators.addressInput.fill(address);
    await this.locators.cityInput.fill(city);
    await this.locators.stateInput.fill(state);
    await this.locators.zipInput.fill(zip);
  }

  async selectCreditCardPayment() {
    await this.locators.paymentCcRadio.click();
  }

  async selectPaypalPayment() {
    await this.locators.paymentPaypalRadio.click();
  }

  async placeOrder() {
    await this.locators.placeOrderBtn.click();
  }
}
