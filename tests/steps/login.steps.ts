import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user login with user id {string} and password {string}',
  async ({ loginPage, dashboardpage }, userId: string, password: string) => {
    await loginPage.navigateToURL();
    await loginPage.inputUserAndPassword(userId, password);
    await loginPage.clickLogin();
    await dashboardpage.verifyDashboardPage();
  },
);
