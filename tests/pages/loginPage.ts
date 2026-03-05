import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userIdInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly headerDiv: Locator;
  readonly moduleSwitcherMenu: Locator;
  readonly submissionForm: Locator;
  readonly createNewSubmissionBtn: Locator;
  readonly forApprovalMenu: Locator;
  readonly requestTitleInput: Locator;
  readonly uploadBtn: Locator;
  readonly uploadAttachment: Locator;
  readonly descriptionSection: Locator;
  readonly addFolderBtn: Locator;
  readonly fileSearchInput: Locator;
  readonly checkBoxInput: Locator;
  readonly updateBtn: Locator;
  readonly addStepBtn: Locator;
  readonly approvalType: Locator;
  readonly actionOfficerInput: Locator;
  readonly designationInput: Locator;
  readonly qualityControlOption: Locator;
  readonly financialControllerOption: Locator;
  readonly addSDBtn: Locator;
  readonly addRoutingBtn: Locator;
  readonly submitBtn: Locator;
  readonly submitBtnPopMenu: Locator;
  readonly viewHeaderTitle: Locator;
  readonly headerInfoTitle: Locator;
  readonly terminateBtn: Locator;
  readonly terminateReasonInput: Locator;
  readonly terminateDrawerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIdInput = page.getByTestId('userId');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('submitButton');
    this.headerDiv = page.getByTestId('headerDivId');
    this.moduleSwitcherMenu = page.getByTestId('moduleSwitcherId');
    this.submissionForm = page
      .getByTestId('qtip-10-content')
      .getByTestId('workflowEnableId');
    this.createNewSubmissionBtn = page.getByRole('button', {
      name: 'New Submission',
    });
    this.forApprovalMenu = page
      .locator('.newesubtitle')
      .getByText('For Approval', { exact: true })
      .nth(1);
    this.requestTitleInput = page.getByTestId('wfRequest.title');
    this.uploadBtn = page.getByTestId('uploadBtn').getByText('Upload');
    this.uploadAttachment = page.getByTestId('uploadedAttachment');
    this.descriptionSection = page.getByPlaceholder('Description');
    this.addFolderBtn = page
      .getByTestId('FileReGuide')
      .getByText('Add', { exact: true });
    this.fileSearchInput = page.getByTestId('fileSearchInput').locator('input');
    this.checkBoxInput = page
      .getByTestId('classificationTabs')
      .getByRole('checkbox');
    this.updateBtn = page.getByTestId('addBtn');
    this.addStepBtn = this.page
      .getByTestId('RoutingGuide')
      .getByText('Add Step', { exact: true });
    this.approvalType = page.getByTestId('approvalTypeId');
    this.actionOfficerInput = page
      .getByTestId('actionOfficer')
      .locator('input[type="search"]');
    this.designationInput = page
      .getByTestId('selectDesignationId')
      .getByPlaceholder('Select one...');
    this.qualityControlOption = page.getByText('Quality Control');
    this.financialControllerOption = page.getByText('Financial Controller');
    this.addSDBtn = page.getByTestId('addSDBtn');
    this.addRoutingBtn = page
      .getByTestId('routingProfileDialog')
      .getByTestId('addBtn');
    this.submitBtn = page.getByTestId('newsubBottomId').getByText('Submit');
    this.submitBtnPopMenu = page
      .getByLabel('Submit This Submission')
      .getByText('Submit', { exact: true });
    this.viewHeaderTitle = page
      .getByTestId('viewheaders')
      .locator('.viewheader-title');
    this.headerInfoTitle = page
      .getByTestId('pageContentId')
      .getByTestId('headerInformation')
      .locator('.Information-value');
    this.terminateBtn = page
      .getByTestId('bottomId')
      .getByText('Terminate')
      .nth(1);
    this.terminateReasonInput = page
      .getByTestId('nextStepInput')
      .getByRole('textbox');
    this.terminateDrawerBtn = page.locator('section').getByText('Terminate');
  }

  async navigateToURL() {
    await this.page.goto('');
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

  async verifyDashboardPage() {
    await expect(this.headerDiv).toBeVisible();
    await expect(this.moduleSwitcherMenu).toBeVisible();
  }

  async openSubmissionPage() {
    await this.moduleSwitcherMenu.click();
    await expect(this.submissionForm).toBeVisible();
    await this.submissionForm.click();
    await expect(this.createNewSubmissionBtn).toBeVisible();
  }

  async createNewApprovalSubmission(title: string) {
    await this.createNewSubmissionBtn.click();
    await expect(this.forApprovalMenu).toBeVisible();
    await this.forApprovalMenu.click();
    await expect(this.requestTitleInput).toBeVisible();
    await this.requestTitleInput.pressSequentially(title, { delay: 50 });
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadBtn.click();
    const fileChooser = await fileChooserPromise;
    const responseSavePDF = this.page.waitForResponse('**/KRISADMIN/savePDF');
    await fileChooser.setFiles('files/test.pdf');
    await responseSavePDF;
    const responseUploadAttach = this.page.waitForResponse(
      '**/KRISADMIN/uploadAttachment',
    );
    await this.uploadAttachment.setInputFiles('files/test.pdf');
    await responseUploadAttach;
    await expect(this.descriptionSection).toBeVisible();
    await this.page.mouse.wheel(0, 5000);
    await this.addFolderBtn.click();
    const responsePromise = this.page.waitForResponse(
      '**/KRISADMIN/getFileReferenceByInput',
    );
    await this.fileSearchInput.pressSequentially(
      'QA - Submission Official(Open)',
      { delay: 50 },
    );
    await responsePromise;
    await this.checkBoxInput.click();
    await this.updateBtn.click();
    await this.addStepBtn.click();
    await this.approvalType.click();
    await this.page
      .getByRole('listitem')
      .filter({ hasText: 'For Approval' })
      .click();
    await this.actionOfficerInput.pressSequentially(process.env.USER_ID_2, {
      delay: 75,
    });
    await this.page
      .getByRole('treeitem', { name: process.env.USER_ID_2 })
      .click();
    await this.designationInput.click();
    await this.financialControllerOption.click();
    await this.addSDBtn.click();
    await this.addRoutingBtn.click();
  }

  async submitAprrovalSubmission(title: string) {
    await this.submitBtn.click();
    await this.submitBtnPopMenu.click();
    await expect(
      this.page.getByRole('heading', { name: 'Submitted successfully.' }),
    ).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Submitted successfully.' }),
    ).toBeHidden();
    await expect(this.viewHeaderTitle).toContainText('A23');
    await expect(this.headerInfoTitle.getByText(title)).toHaveText(title);
  }

  async terminateNewApprovalSubmission() {
    await this.terminateBtn.click();
    await this.terminateReasonInput.pressSequentially('terminate', {
      delay: 50,
    });
    await this.terminateDrawerBtn.click();
    await this.page.getByRole('button', { name: 'close drawer' }).click();
  }
}
