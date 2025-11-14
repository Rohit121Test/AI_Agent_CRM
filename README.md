# AI Agent CRM - Automated Testing Suite

[![Cypress Tests](https://github.com/YOUR_USERNAME/AI_Agent_CRM/actions/workflows/cypress.yml/badge.svg)](https://github.com/YOUR_USERNAME/AI_Agent_CRM/actions)

End-to-end testing suite for the AI Agent CRM system using Cypress with automated CI/CD pipeline.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Coverage](#test-coverage)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Reports](#test-reports)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This repository contains automated end-to-end tests for the AI Agent CRM application. The test suite validates:
- Lead creation workflow through chat agents
- Form validation and error handling
- CRM contact verification
- API and UI consistency

**Technology Stack:**
- **Cypress** v15.6.0 - E2E testing framework
- **Mochawesome** v7.1.3 - HTML test reporting with charts and embedded screenshots
- **Faker.js** v10.1.0 - Random test data generation
- **cypress-iframe** v1.0.1 - Handle iframe interactions for chat widget
- **GitHub Actions** - CI/CD automation

---

## 🧪 Test Coverage

### Test Suite 1: `agent_crm_flow.cy.js`
**Purpose:** End-to-end positive flow for lead creation

**Test Case:** *Should submit agent lead form and verify contact data in CRM*
- Navigates to chat detail page
- Opens agent chat interface
- Fills lead form with random test data (name, email, phone, location, date)
- Submits form and validates API response (200 OK)
- Verifies lead appears in CRM contacts
- Validates data consistency between form submission and CRM

### Test Suite 2: `agentform_validations.cy.js`
**Purpose:** Form validation and error handling

**Test Case 1:** *Validate mandatory fields in lead form*
- Attempts to submit empty form
- Verifies no API call is made
- Validates required field error messages for:
  - Full Name (required)
  - Email (required)
  - Phone Number (required)
  - Location (required)
  - Date of birth (optional - no error expected)

**Test Case 2:** *Validate correct message for invalid field values*
- Tests invalid email format validation
- Tests invalid phone number format validation
- Verifies appropriate error messages are displayed

---

## ⚙️ Prerequisites

Before running tests, ensure you have:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v8 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- Access to the AI Agent CRM application (test environment)
- Valid test user credentials

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI_Agent_CRM.git
cd AI_Agent_CRM
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Cypress and all testing dependencies
- Mochawesome reporter for HTML reports
- Faker.js for test data generation
- cypress-iframe for handling chat widget interactions
- All required Cypress plugins

**Package Versions:**
- `cypress`: ^15.6.0
- `@faker-js/faker`: ^10.1.0
- `cypress-iframe`: ^1.0.1
- `cypress-mochawesome-reporter`: ^4.0.2
- `mochawesome`: ^7.1.3
- `mochawesome-merge`: ^4.3.3
- `mochawesome-report-generator`: ^6.0.1

### 3. Configure Environment Variables

Create a `cypress.env.json` file in the root directory:

```bash
touch cypress.env.json
```

Add your test credentials:

```json
{
  "TEST_USER": "your_test_username",
  "TEST_PASS": "your_test_password"
}
```

> ⚠️ **Important:** `cypress.env.json` is gitignored and should never be committed to version control.

### 4. Update Base URL (if needed)

The application is configured to run against the test environment:

**Base URL:** `https://test.wing.work`

If you need to test against a different environment, edit `cypress.config.js`:

```javascript
e2e: {
  baseUrl: 'https://test.wing.work', // Update this for different environments
  // ... other config
}
```

---

## 🏃 Running Tests

### Run Tests in Headless Mode (CI-like)

```bash
npm run cy:run
```

This will:
- Execute all tests in headless Chrome browser
- Generate Mochawesome HTML reports in `cypress/reports/html/`
- Capture screenshots on failures in `cypress/screenshots/`
- Record videos of test execution in `cypress/videos/`
- Apply browser optimizations for CI performance

### Run Tests in Interactive Mode (GUI)

```bash
npm run cy:open
```

This opens the Cypress Test Runner where you can:
- Select and run individual tests
- Debug tests in real-time with browser DevTools
- See live browser execution
- Time travel through test steps

### Generate Consolidated Test Report

After running tests, merge and generate a single HTML report:

```bash
npm run report:all
```

This runs:
1. `report:merge` - Combines all JSON reports from multiple test files
2. `report:generate` - Creates consolidated HTML report

Alternative: Run commands separately:
```bash
npm run report:merge      # Merge JSON reports
npm run report:generate   # Generate HTML from merged JSON
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/agent_crm_flow.cy.js"
```

### Run Tests with Different Browser

```bash
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Tests run automatically on:
- Every push to `main` branch
- Every pull request to `main` branch

**Workflow file:** `.github/workflows/cypress.yml`

```yaml
name: Run Cypress Tests

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
```

### What Happens in CI:

1. ✅ Checkout code from repository
2. ✅ Install Node.js dependencies
3. ✅ Run all Cypress tests
4. ✅ Generate test reports
5. ✅ Upload artifacts (reports, screenshots, videos)

### Viewing CI Test Results

1. Go to **Actions** tab in GitHub repository
2. Click on the latest workflow run
3. Scroll to **Artifacts** section at the bottom
4. Download:
   - **mochawesome-report** - Complete HTML test report
   - **cypress-screenshots** - Failure screenshots (if any)
   - **cypress-videos** - Test execution videos (if any)

---

## 📊 Test Reports

### Mochawesome HTML Report

After running tests, the HTML report is generated at:

```
cypress/reports/html/index.html
```

**To view locally:**

```bash
# On macOS
open cypress/reports/html/index.html

# On Linux
xdg-open cypress/reports/html/index.html

# On Windows
start cypress/reports/html/index.html
```

**Report Features:**
- ✅ Test execution summary (pass/fail counts)
- ⏱️ Execution duration for each test
- 📸 Embedded screenshots for failures
- 🔍 Detailed error messages and stack traces
- 📈 Visual charts and graphs
- 🎬 Inline video playback (when enabled)
- 📊 Test suite statistics

**Configuration Details:**
- Reports saved in: `cypress/reports/html/`
- Individual JSON files: `cypress/reports/html/.jsons/`
- Merged report: `cypress/reports/report.json`
- Charts enabled with embedded screenshots
- Inline assets for offline viewing

### Viewing CI Reports

1. Navigate to **Actions** tab in GitHub
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download **mochawesome-report.zip**
5. Extract and open `index.html` in browser

---

## 📁 Project Structure

```
AI_Agent_CRM/
├── .github/
│   └── workflows/
│       └── cypress.yml              # CI/CD workflow configuration
├── cypress/
│   ├── e2e/
│   │   ├── agent_crm_flow.cy.js     # End-to-end lead creation test
│   │   └── agentform_validations.cy.js # Form validation tests
│   ├── support/
│   │   ├── Pages/                    # Page Object Model (POM)
│   │   │   ├── contactCrm.js        # CRM contacts page actions
│   │   │   ├── globalChatDetail.js  # Chat detail page actions
│   │   │   └── manageAgent.js       # Agent management & chat actions
│   │   ├── commands.js              # Custom Cypress commands (login)
│   │   └── e2e.js                   # Global setup/configuration
│   ├── reports/
│   │   └── html/                    # Mochawesome HTML reports
│   ├── screenshots/                 # Failure screenshots
│   └── videos/                      # Test execution videos
├── cypress.config.js                # Cypress configuration
├── cypress.env.json                 # Environment variables (gitignored)
├── package.json                     # Project dependencies & scripts
└── README.md                        # This file
```

### Page Object Model (POM) Architecture

Tests use the **Page Object Model** design pattern for:
- **Maintainability** - Changes to UI only require updating page objects
- **Reusability** - Page methods can be shared across multiple tests
- **Readability** - Tests read like plain English

**Example:**
```javascript
// Instead of:
cy.get('input[type="email"]').type('test@example.com');

// We write:
manageAgent.fillEmail('test@example.com');
```

### Custom Commands

**Login Command** (`cypress/support/commands.js`):
```javascript
cy.login(username, password)
```

This custom command:
- Navigates to login page
- Fills credentials
- Submits the form
- Waits for authentication to complete
- Verifies successful login by checking URL redirect to `/myday`

**Usage in tests:**
```javascript
beforeEach(() => {
  cy.login(Cypress.env("TEST_USER"), Cypress.env("TEST_PASS"));
});
```

---

## ⚙️ Cypress Configuration

### Key Settings (`cypress.config.js`)

| Setting | Value | Purpose |
|---------|-------|---------|
| `baseUrl` | `https://test.wing.work` | Test environment URL |
| `video` | `true` | Record test execution videos |
| `videoCompression` | `15` | Balance between quality and file size |
| `screenshotOnRunFailure` | `true` | Auto-capture failures |
| `defaultCommandTimeout` | `30000ms` | Wait for commands to complete |
| `pageLoadTimeout` | `45000ms` | Wait for page loads |
| `viewportWidth` | `1920px` | Desktop resolution |
| `viewportHeight` | `1080px` | Desktop resolution |
| `chromeWebSecurity` | `false` | Allow cross-origin requests |
| `retries` | `0` | No automatic retries |

### Browser Optimizations

The configuration includes Chrome optimizations for CI stability:
- Disabled GPU acceleration
- Disabled dev-shm usage (prevents crashes)
- Disabled caching for consistent test runs
- Memory pressure management
- Increased Node.js heap size (4GB)

### Reporter Configuration

Mochawesome reporter is configured with:
- JSON output for test results
- HTML generation disabled (handled by merge/generate scripts)
- Charts and graphs enabled
- Embedded screenshots in reports
- Inline assets for offline viewing

---

## 🔐 Environment Variables

### Local Development

Set in `cypress.env.json`:

| Variable | Description | Example |
|----------|-------------|---------|
| `TEST_USER` | Test user username/email | `test@example.com` |
| `TEST_PASS` | Test user password | `TestPass123!` |

### GitHub Actions (CI)

Set in **Repository Settings → Secrets and variables → Actions**:

| Secret Name | Description |
|-------------|-------------|
| `TEST_USER` | Test user credentials for CI |
| `TEST_PASS` | Test user password for CI |

**To add secrets:**
1. Go to repository **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add `TEST_USER` and `TEST_PASS`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Inconsistent results"

**Cause:** Unstable system and loading time is high

**Solution:**
-Increase the timeout of the system so that cypress will wait in order to get the value
- Used defaultCommandTimeout: 30000, and 



#### 2. Iframe interactions initially didn't work.

**Cause:** Chat widget iframe not loaded or `cypress-iframe` not configured

**Solution:**
- Verify `cypress-iframe` is installed: `npm install cypress-iframe`
- Ensure iframe ID is correct: `#chat-widget-iframe`
- Check `getChatIframe()` method in `manageAgent.js`


---


## 🤝 Contributing

### Running Tests Before Committing

Always run tests locally before pushing:

```bash
npm run cy:run
```

### Code Style Guidelines

- Use Page Object Model for all UI interactions
- Keep test cases focused and independent
- Use meaningful variable names and comments
- Follow existing naming conventions

### Creating New Tests

1. Create test file in `cypress/e2e/`
2. Import required page objects
3. Add `beforeEach` hook for setup
4. Write descriptive test names
5. Use custom commands from page objects

---

## 📞 Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review [Cypress Documentation](https://docs.cypress.io/)
- Contact the QA team
- Open an issue in this repository

---

## 📝 License

[Add your license information here]

---

## 🏆 Test Results Badge

Add this badge to show test status:

```markdown
[![Cypress Tests](https://github.com/YOUR_USERNAME/AI_Agent_CRM/actions/workflows/cypress.yml/badge.svg)](https://github.com/YOUR_USERNAME/AI_Agent_CRM/actions)
```

---

**Last Updated:** November 2025  
**Cypress Version:** 15.6.0  
**Node Version:** 18+
