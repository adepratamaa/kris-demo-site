import { Locator, Page, expect } from '@playwright/test';

export class EsubmissionPage {
  readonly page: Page;
  readonly emergencyLevel: Locator;
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
  readonly approveReasonInput: Locator;
  readonly terminateDrawerBtn: Locator;
  readonly drawerTitle: Locator;
  readonly participatedTab: Locator;
  readonly participatedTable: Locator;
  readonly tableSubmissionTitle: Locator;
  readonly tableSubmissionStatus: Locator;
  readonly myTaskTitle: Locator;
  readonly approveBtn: Locator;
  readonly approveBtnDrawer: Locator;
  readonly submissionTitleInParticipatedMenu: Locator;
  readonly searchInput: Locator;
  readonly submissionTitleInMyTask: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emergencyLevel = page.getByTestId('emergencyId');
    this.createNewSubmissionBtn = page.getByRole('button', {
      name: 'New Submission',
    });
    this.forApprovalMenu = page
      .getByRole('listitem')
      .filter({ hasText: /^For Approval$/ });
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
      .locator('div.viewheader-title');
    this.headerInfoTitle = page
      .getByTestId('headerInformation')
      .locator('div:nth-child(1)')
      .locator('div.Information-value')
      .first();
    this.terminateBtn = page
      .getByTestId('bottomId')
      .getByText('Terminate')
      .nth(1);
    this.terminateReasonInput = page
      .getByTestId('nextStepInput')
      .getByRole('textbox');
    this.approveReasonInput = page
      .getByTestId('nextStepInput')
      .locator('textarea');
    this.terminateDrawerBtn = page.locator('section').getByText('Terminate');
    this.drawerTitle = page
      .getByTestId('nextStepNotify')
      .locator('.succmessage')
      .locator('div')
      .nth(0);
    this.participatedTab = page.getByTestId('tab-1');
    this.participatedTable = page.getByTestId('pane-1');
    this.tableSubmissionTitle = this.participatedTable
      .locator('li')
      .nth(1)
      .locator('div.inprogress-submissiodtitle1');
    this.tableSubmissionStatus = this.participatedTable.locator(
      'li:nth-child(1) div.inprogress-status1',
    );
    this.myTaskTitle = page.locator(
      '#pane-0 li:nth-child(1) .approve-submissiodtitle1 .item-text',
    );
    this.approveBtn = page
      .getByTestId('bottomId')
      .locator('div:nth-child(1) .approvebtn .approvebtn-text');
    this.approveBtnDrawer = page.locator(
      '.el-drawer__body .actionBtn .postbtn-text',
    );
    this.submissionTitleInMyTask = page.locator(
      '#app div.search-submissionTitle .search-submission-text',
    );
    this.searchInput = page.getByPlaceholder(
      'Search submission title or ID...',
    );
    this.submissionTitleInParticipatedMenu = page.locator(
      '#pane-1 li:nth-child(1) div.inprogress-submissiodtitle1 .search-submission-text',
    );
  }

  async verifyEsubmissionPage() {
    await expect(this.createNewSubmissionBtn).toBeVisible();
  }

  async createNewApprovalSubmission() {
    await expect(this.createNewSubmissionBtn).toBeVisible();
    await this.createNewSubmissionBtn.click();
    await expect(this.forApprovalMenu).toBeVisible();
    await this.forApprovalMenu.click();
    await expect(this.requestTitleInput).toBeVisible();
  }

  async fillTheTitle(title: string) {
    await this.requestTitleInput.pressSequentially(title, { delay: 50 });
  }

  async uploadDocuments() {
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
  }

  async addToFolder() {
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
  }

  async assignAccountOfficer() {
    await this.addStepBtn.click();
    await this.approvalType.click();
    await this.page
      .getByRole('listitem')
      .filter({ hasText: 'For Approval' })
      .click();
    await this.actionOfficerInput.pressSequentially(process.env.USER_ID_2, {
      delay: 50,
    });
    await expect(
      this.page.getByRole('treeitem', { name: process.env.USER_ID_2 }),
    ).toBeVisible();
    await this.page
      .getByRole('treeitem', { name: process.env.USER_ID_2 })
      .click();
    await this.designationInput.click();
    await this.financialControllerOption.click();
    await this.addSDBtn.click();
    await this.addRoutingBtn.click();
  }

  async submitAprrovalSubmission(title: string) {
    if (title.includes('Submission')) {
      await this.submitBtn.click();
      await this.submitBtnPopMenu.click();
    } else if (title.includes('Approval')) {
      await this.approveBtnDrawer.click();
    }
  }

  async verifyNotifMessage(arg: string) {
    if (arg.includes('Submitted successfully')) {
      await expect(
        this.page.getByRole('heading', { name: `${arg}.` }),
      ).toBeVisible();
      await expect(
        this.page.getByRole('heading', { name: `${arg}.` }),
      ).toBeHidden();
    } else if (arg.includes('Approved')) {
      await expect(
        this.page.locator('#nextStepNotify div.succmessage div:nth-child(1)'),
      ).toBeVisible();
      await expect(
        this.page.locator('#nextStepNotify div.succmessage div:nth-child(1)'),
      ).toContainText(arg);
      // await this.approveBtnDrawer.click();
      await this.page.getByRole('button', { name: 'close drawer' }).click();
    }
  }

  async verifyTitle(title: string) {
    await expect(this.headerInfoTitle).toHaveText(title);
  }

  async verifySubmissionCode(arg: string) {
    await expect(this.viewHeaderTitle).toContainText(arg);
  }

  async verifySubmissionStatus(arg: string) {
    const text = await this.viewHeaderTitle.textContent();
    expect(text?.trim()).toContain(arg);
  }

  async inputReason(arg: string) {
    if (arg.includes('Terminates')) {
      await this.terminateBtn.click();
      await this.terminateReasonInput.pressSequentially('terminate', {
        delay: 50,
      });
    } else if (arg.includes('Approves')) {
      await this.approveReasonInput.pressSequentially('Approve', {
        delay: 50,
      });
    }
  }

  async terminateSubmission() {
    await this.terminateDrawerBtn.click();
  }

  async verifyMessage(text: string) {
    if (text.includes('Terminated')) {
      await expect(this.drawerTitle).toBeVisible();
      await expect(this.drawerTitle).toContainText(text);
      await this.page.getByRole('button', { name: 'close drawer' }).click();
    } else if (text.includes('Approved')) {
      await expect(this.drawerTitle).toBeVisible();
      await expect(this.drawerTitle).toContainText(text);
      await this.approveBtnDrawer.click();
      await this.page.getByRole('button', { name: 'close drawer' }).click();
    }
  }

  async openPartecipatedMenu() {
    await this.page.getByText('Participated').first().click();
  }

  async openCompletedTab() {
    await expect(this.participatedTab).toBeVisible();
    await this.participatedTab.click();
  }

  async verifySubmissionName(title: string) {
    await expect(this.participatedTable).toBeVisible();
    await expect(this.submissionTitleInParticipatedMenu).toContainText(title);
  }

  async verifyStatusInColumn(status: string) {
    await expect(this.participatedTable).toBeVisible();
    await expect(this.tableSubmissionStatus).toBeVisible();
    await expect(this.tableSubmissionStatus).toContainText(status);
  }

  async openPreviousTask(title: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.pressSequentially(title, { delay: 50 });
    await this.searchInput.press('Enter');
    await expect(this.submissionTitleInMyTask.first()).toHaveText(title);
    await this.submissionTitleInMyTask.click();
  }

  async approveTask(arg: string) {
    if (arg.includes('Approve')) {
      await expect(this.approveBtn).toBeVisible();
      await this.approveBtn.click();
    }
  }
}
