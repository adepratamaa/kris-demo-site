# Test Automation Setup

## Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git

## 1. Clone the repository

```bash
git clone https://github.com/adepratamaa/kris-demo-site.git
cd kris-demo-site
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root

Contain:

    USER_ID_1=username
    PASSWORD_1=password
    USER_ID_2=username
    PASSWORD_2=password
    BASE_URL=https://example-demo-site.com

This to avoid hardcoding credentials inside test scripts

## 4. Run the tests locally

Run all tests:

```bash
npx bddgen
```

```bash
npx playwright test
```

## 5. Trigger it manually

This project includes a CI/CD workflow using GitHub Actions.
So you can run the tests manually:

```bash
1. Go to the Actions tab in the repository
2. Select Test Workflow
3. Click Run workflow
```

<img width="1326" height="882" alt="Screenshot 2026-03-06 at 18 57 14" src="https://github.com/user-attachments/assets/733e969d-91d5-4b54-bbb9-20e3a591c23d" />

# Test Structure Explanation

### Feature Files

Feature files use BDD Gherkin syntax to describe system behavior more readable

### Step Definitions

This contain the implementation of each Gherkin step

### Pages

This place where I store the selectors for each of module or page

Seperate between gherkin syntax, steps and

<img width="278" height="332" alt="Screenshot 2026-03-06 at 18 55 37" src="https://github.com/user-attachments/assets/be15b70c-970c-4558-9b54-fdeeb4b9f167" />

---

# Possible improvement areas

- Some buttons or fields do not have `data-testid` attributes, so a few selectors are still fragile. In the future, I would improve this by using more stable selectors to reduce test flakiness.
- Enable parallel test execution to reduce test runtime and obtain results faster. This would be especially useful for regression testing.
- Integrate test results with project management or communication tools such as Jira, ClickUp, or Slack so the team can easily track test outcomes in one place.
- Run tests across multiple browsers (Chrome, Firefox, WebKit) to ensure cross-browser compatibility.
- Improve the framework structure by adding helper utilities and refactoring files such as `esubmissionPage.ts` to improve maintainability.

---
