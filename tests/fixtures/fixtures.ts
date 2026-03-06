import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { EsubmissionPage } from '../pages/esubmissionPage';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardpage: DashboardPage;
  esubmissionPage: EsubmissionPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardpage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  esubmissionPage: async ({ page }, use) => {
    const esubmissionPage = new EsubmissionPage(page);
    await use(esubmissionPage);
  },
});
