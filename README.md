# Qubika Club

The Qubika Sports Club Management System is an all-inclusive platform designed to streamline
and enhance the management of a sports club. The system facilitates various tasks, including
creating and managing members, controlling different categories that could be root or not, and
tracking client payments and fees.

## Installation

First you will need to install node js latest version from https://nodejs.org/en/download


Then you will need to install npm dependencies manager.

```bash
npm install
```

Then install Playwright's latests version in order to be able to create tests and take advantage of its library.

```bash
npm install -D @playwright/test@latest
```

### Testing

Testing can be done on Visual Code IDE by installing Playwright Test for VSCode extension on Visual Code Marketplace. 

The go to the left bar menu on VS Code IDE and click on Testing item. You will see the tests that are inside e2e folder. The test folder can be configured on playwright.config.ts file. 

To run a test you will need to invoke it via terminal as follows:

```bash
set TOKEN='BEARER-TOKEN-HERE' && npx playwright test
```

### Considerations

The first test Create User consists on an invocation of an endpoint using axios library. If the user is created, then its saved on a variable.

The second test implements each of the next steps:

1) Create a new user through API and save the user information. Find Qubika Sports Club
Management System Swagger here.
2) Go to Qubika Sports Club Management System
3) Validate that the login page is displayed correctly. The validation consists on checking if the user, password fields are visible and also if the submit button is visible too. 
4) Log in with the created user
5) Validate that the user is logged in by checking if the page after login in is the dashboards one. 
6) Once the user is logged in:
    a) Go to the Category page
    b) Create a new category and validate that the category was created successfully
    c) Create a sub category and validate it is displayed in the Categories list.


### Improvements

Token is passed as an argument to the program and it could be fetch from the /api/auth/login endpoint.
User Password can be encripted and passed as an argument. The ir can be decrypted at runtime. 
Data can be obtained from a db.
