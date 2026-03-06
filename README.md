# Test Automation Setup

## 1. Clone the repository

```bash
git clone https://github.com/adepratamaa/kris-demo-site.git
cd kris-demo-site
```

## 2. Install dependencies

Make sure Node.js is installed

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root

Example:

    USER_ID_1=username
    PASSWORD_1=password
    USER_ID_2=username
    PASSWORD_2=password
    BASE_URL=https://example-demo-site.com

This to avoid hardcoding credentials inside test scripts

## 4. Run the tests

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

This is contain the implementation of each Gherkin step

### Page Object Model

Page Object Model used to separate UI interactions from test logic
It makes everything reusable and easier to maintenance

<img width="278" height="332" alt="Screenshot 2026-03-06 at 18 55 37" src="https://github.com/user-attachments/assets/be15b70c-970c-4558-9b54-fdeeb4b9f167" />

---

# Improvement areas

```bash
Update the selector from using class to test-id, could prevent flakines
Enable parallel test execution to reduce test runtime
Integrate the result to project management tools or communication tools (jira, clickup, slack)
Run tests across multiple browsers (Chrome, Firefox, WebKit).
```

---
