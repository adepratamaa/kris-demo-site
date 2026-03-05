import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';
import { faker } from '@faker-js/faker';

const { Given, When, Then } = createBdd(test);

const title = faker.word.words();

Given('I navigate to landing page', async ({ loginPage }, url) => {
  await loginPage.navigateToURL();
});

When('I input user id user_id_{int}', async ({ loginPage }, int) => {
  if (int === 1) {
    await loginPage.enterUserId(process.env.USER_ID_1);
  }
});

Then('I input password password_{int}', async ({ loginPage }, int) => {
  if (int === 1) {
    await loginPage.enterPassword(process.env.PASSWORD_1);
  }
});

Then('I click on login button', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

Then('I see dashboard page', async ({ loginPage }) => {
  await loginPage.verifyDashboardPage();
});

When('I open submission page', async ({ loginPage }) => {
  await loginPage.openSubmissionPage();
});

When('I create new approval submission', async ({ loginPage }) => {
  await loginPage.createNewApprovalSubmission(title);
});

When('I submit the approval submission', async ({ loginPage }) => {
  await loginPage.submitAprrovalSubmission(title);
});

Then('I terminate the approval submission', async ({ loginPage }) => {
  await loginPage.terminateNewApprovalSubmission();
});
