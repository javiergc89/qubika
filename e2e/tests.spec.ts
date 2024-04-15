import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

import * as userData from '../data/users/user.json';
import * as categoryData from '../data/categories/categories.json';
import * as subCategoryData from '../data/categories/subcategories.json';
import { CategoryPage } from '../pages/category-page';
import { validateCategory } from '../utils/categories';
import { UserDTO } from '../dto/userDTO';

const axios = require('axios');

const BASE_URL = 'https://api.club-administration.qa.qubika.com';
const USER_PATH = '/api/auth/register';
var user: UserDTO;

test.describe('Login with a new User and validate data', () => {

test('Create User', async ({ page }) => {
  try{
    const response = await axios.post(BASE_URL+USER_PATH, userData);
    expect(response.status).toBe(201);
    user = response.data;
  }catch(error){
      console.log('User was not created.', error);
      throw error;
  }
});
test('Validate Login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  expect(await loginPage.isLoginPage()).toBeTruthy();
  
  expect(await loginPage.isUserInputDisplayed()).toBeTruthy();
  expect(await loginPage.isPasswordInputDisplayed()).toBeTruthy();
  expect(await loginPage.isAuthenticateBtnDisplayed()).toBeTruthy();

  await loginPage.setUser(userData.email);
  await loginPage.setPassword(userData.password);
  await loginPage.autenticate();

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.waitForPageToLoad();
  expect(await dashboardPage.isDashboardPage()).toBeTruthy(); 

  const categoryPage = new CategoryPage(page);
  await categoryPage.goto();
  await categoryPage.add();
  await categoryPage.setCategoryName(categoryData.name);
  await categoryPage.submit();
  await validateCategory(categoryData.name);

  await categoryPage.add();
  await categoryPage.setCategoryName(subCategoryData.name);
  await categoryPage.setAsSubcategory();
  await categoryPage.setParentCategoryName(subCategoryData.rootName);
  await categoryPage.submit();
  await categoryPage.clickLastPageButton();

  expect(await categoryPage.hasCategoryName(categoryData.name)).toBeTruthy();
});

});