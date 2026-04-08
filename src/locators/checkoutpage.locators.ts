import { Page, Locator } from '@playwright/test';
import { BaseLocators } from '../base/baseLocators';

export class CheckoutLocators extends BaseLocators {
  public readonly nameInput: Locator;
  public readonly emailInput: Locator;
  public readonly addressInput: Locator;
  public readonly cityInput: Locator;
  public readonly stateInput: Locator;
  public readonly zipInput: Locator;
  public readonly countryDropdown: Locator;
  public readonly paymentCcRadio: Locator;
  public readonly paymentPaypalRadio: Locator;
  public readonly totalAmount: Locator;
  public readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = this.page.getByTestId('checkout-name-input');
    this.emailInput = this.page.getByTestId('checkout-email-input');
    this.addressInput = this.page.getByTestId('checkout-address-input');
    this.cityInput = this.page.getByTestId('checkout-city-input');
    this.stateInput = this.page.getByTestId('checkout-state-input');
    this.zipInput = this.page.getByTestId('checkout-zip-input');
    this.countryDropdown = this.page.getByTestId('checkout-country-dropdown');
    this.paymentCcRadio = this.page.getByTestId('checkout-payment-cc-radio');
    this.paymentPaypalRadio = this.page.getByTestId('checkout-payment-paypal-radio');
    this.totalAmount = this.page.getByTestId('checkout-total-amount');
    this.placeOrderBtn = this.page.getByTestId('checkout-place-order-btn');
  }
}
