import { Page, Locator } from '@playwright/test';

export class BaseLocators {
  protected page: Page;

  // Common locators: Header section
  public readonly headerLogo: Locator;
  public readonly searchInput: Locator;
  public readonly searchBtn: Locator;
  public readonly navProductsLink: Locator;
  public readonly navCartIcon: Locator;
  public readonly navLoginLink: Locator;
  public readonly navRegisterLink: Locator;
  public readonly navLogoutBtn: Locator;
  public readonly navAccountLink: Locator;

  // Common locators: Footer section
  public readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerLogo = this.page.getByTestId('header-logo-link');
    this.searchInput = this.page.getByTestId('header-search-input');
    this.searchBtn = this.page.getByTestId('header-search-btn');
    this.navProductsLink = this.page.getByTestId('nav-products-link');
    this.navCartIcon = this.page.getByTestId('nav-cart-icon');
    this.navLoginLink = this.page.getByTestId('nav-login-link');
    this.navRegisterLink = this.page.getByTestId('nav-register-link');
    this.navLogoutBtn = this.page.getByTestId('nav-logout-btn');
    this.navAccountLink = this.page.getByTestId('nav-account-link');
    
    this.footer = this.page.getByTestId('footer');
  }
}
