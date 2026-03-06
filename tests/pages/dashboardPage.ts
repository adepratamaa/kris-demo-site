import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly topnavId: Locator;
  readonly moduleSwitcherMenu: Locator;
  readonly submissionForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topnavId = page.getByTestId('headerDivId').getByTestId('topnavId');
    this.moduleSwitcherMenu = page.getByTestId('moduleSwitcherId');
    this.submissionForm = page
      .getByTestId('qtip-10-content')
      .getByTestId('workflowEnableId');
  }

  async verifyDashboardPage() {
    await expect(this.topnavId).toBeVisible();
    await expect(this.moduleSwitcherMenu).toBeVisible();
  }

  async openEsubmissionPage() {
    await this.moduleSwitcherMenu.click();
    await expect(this.submissionForm).toBeVisible();
    await this.submissionForm.click();
  }
}
