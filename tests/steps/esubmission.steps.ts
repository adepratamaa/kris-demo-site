import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';
import { faker } from '@faker-js/faker';

const { Given, When, Then } = createBdd(test);

const title = `QA-${faker.number.int({ min: 1, max: 9999 })}`;

Given(
  'the user opens the E-submission module',
  async ({ dashboardpage, esubmissionPage }) => {
    await dashboardpage.openEsubmissionPage();
    await esubmissionPage.verifyEsubmissionPage();
  },
);

When(
  'the user creates a new for approval submission',
  async ({ esubmissionPage }) => {
    esubmissionPage.createNewApprovalSubmission();
  },
);

When('fills the title', async ({ esubmissionPage }) => {
  await esubmissionPage.fillTheTitle(title);
});

When('uploads the required documents', async ({ esubmissionPage }) => {
  await esubmissionPage.uploadDocuments();
});

When('adds a folder from the recent tab', async ({ esubmissionPage }) => {
  await esubmissionPage.addToFolder();
});

When('assigns user as the action officer', async ({ esubmissionPage }) => {
  await esubmissionPage.assignAccountOfficer();
});

When('submits the {string}', async ({ esubmissionPage }, arg: string) => {
  await esubmissionPage.submitAprrovalSubmission(arg);
});

Then(
  'the system should display {string}',
  async ({ esubmissionPage }, arg: string) => {
    await esubmissionPage.verifyNotifMessage(arg);
  },
);

Then(
  'the submission title should match the entered title',
  async ({ esubmissionPage }) => {
    await esubmissionPage.verifyTitle(title);
  },
);

Then(
  'the submission should have an ID containing {string}',
  async ({ esubmissionPage }, arg: string) => {
    await esubmissionPage.verifySubmissionCode(arg);
  },
);

Then(
  'the submission status should be {string}',
  async ({ esubmissionPage }, arg: string) => {
    await esubmissionPage.verifySubmissionStatus(arg);
  },
);

When(
  'the user {string} the submission with a valid reason',
  async ({ esubmissionPage }, arg: string) => {
    await esubmissionPage.inputReason(arg);
  },
);

Then(
  'the submission should be {string}',
  async ({ esubmissionPage }, arg: string) => {
    await esubmissionPage.terminateSubmission();
    await esubmissionPage.verifyMessage(`${arg}.`);
    // await esubmissionPage.verifyNotifMessage(arg);
    // await esubmissionPage.verifyTermindatedMessage(`${arg}.`);
  },
);

When(
  'the user go to Participated > Completed tab',
  async ({ esubmissionPage }) => {
    await esubmissionPage.openPartecipatedMenu();
    await esubmissionPage.openCompletedTab();
  },
);

Then('the submission is listed there', async ({ esubmissionPage }) => {
  await esubmissionPage.verifySubmissionName(title);
});

Then(
  'It has {string} status in the status column',
  async ({ esubmissionPage }, arg: string) => {
    await esubmissionPage.verifyStatusInColumn(arg);
  },
);

When('the user logout', async ({ loginPage }) => {
  await loginPage.clickLogout();
});

Then('the user should on login page', async ({ loginPage }) => {
  await loginPage.verifyLoginPage();
});

When(
  'the user selects the submission created earlier',
  async ({ esubmissionPage }) => {
    await esubmissionPage.openPreviousTask(title);
  },
);

When('clicks the {string} button', async ({ esubmissionPage }, arg: string) => {
  await esubmissionPage.approveTask(arg);
});
