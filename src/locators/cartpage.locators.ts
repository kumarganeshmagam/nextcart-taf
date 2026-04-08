import { Page, Locator } from '@playwright/test';
import { BaseLocators } from '../base/baseLocators';

export class CartLocators extends BaseLocators {
  public readonly cartSummary: Locator;
  public readonly cartTotalPrice: Locator;
  public readonly cartPromoInput: Locator;
  public readonly cartApplyPromoBtn: Locator;
  public readonly cartCheckoutBtn: Locator;
  public readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.cartSummary = this.page.getByTestId('cart-summary');
    this.cartTotalPrice = this.page.getByTestId('cart-total-price');
    this.cartPromoInput = this.page.getByTestId('cart-promo-input');
    this.cartApplyPromoBtn = this.page.getByTestId('cart-apply-promo-btn');
    this.cartCheckoutBtn = this.page.getByTestId('cart-checkout-btn');
    this.cartItems = this.page.getByTestId('cart-item');
  }
}
