import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userIdInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly accountButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIdInput = page.getByTestId('userId');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('submitButton');
    this.accountButton = page.locator('.header-account.topnav');
    this.logoutButton = page.locator(
      '.el-dropdown-menu.el-popper li:nth-child(3) div',
    );
  }

  async navigateToURL() {
    await this.page.goto('');
  }

  async inputUserAndPassword(userId: string, password: string) {
    if (userId.includes('USER_ID_1') && password.includes('PASSWORD_1')) {
      await this.enterUserId(process.env.USER_ID_1);
      await this.enterPassword(process.env.PASSWORD_1);
    } else if (
      userId.includes('USER_ID_2') &&
      password.includes('PASSWORD_2')
    ) {
      await this.enterUserId(process.env.USER_ID_2);
      await this.enterPassword(process.env.PASSWORD_2);
    }
  }

  async enterUserId(userId: string) {
    await this.userIdInput.pressSequentially(userId, { delay: 50 });
  }

  async enterPassword(password: string) {
    await this.passwordInput.pressSequentially(password, { delay: 50 });
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickLogout() {
    await this.page.reload();
    await expect(this.accountButton).toBeVisible();
    await this.accountButton.click();
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
  }

  async verifyLoginPage() {
    await expect(this.userIdInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }
}
