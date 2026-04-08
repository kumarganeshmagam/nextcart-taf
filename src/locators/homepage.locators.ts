import { Page, Locator } from '@playwright/test';
import { BaseLocators } from '../base/baseLocators';

/**
 * Locators for the Home Page.
 */
export class HomeLocators extends BaseLocators {
  public readonly heroCtaBtn: Locator;
  public readonly featuredProductsGrid: Locator;
  public readonly productCards: Locator;
  public readonly promoBanner: Locator;
  public readonly promoCode: Locator;

  constructor(page: Page) {
    super(page);
    this.heroCtaBtn = this.page.getByTestId('home-hero-cta-btn');
    this.featuredProductsGrid = this.page.getByTestId('home-featured-products-grid');
    this.productCards = this.page.getByTestId('product-card');
    this.promoBanner = this.page.getByTestId('home-promo-banner');
    this.promoCode = this.page.getByTestId('promo-code');
  }
}
