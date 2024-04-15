import { expect, type Locator, type Page } from '@playwright/test';
import { DashboardPage } from './dashboard-page';
import { BasePage } from './base-page';

export class LoginPage extends BasePage{
  readonly header: Locator;
  readonly userInput: Locator;
  readonly passwordInput: Locator;
  readonly authenticateBtn: Locator;
  readonly url:string = 'https://club-administration.qa.qubika.com/#/auth/login';
  

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h3',{ hasText:"Qubika Club"});
    this.userInput = page.locator('input[formcontrolname="email"][type="email"]');
    this.passwordInput = page.locator('input[formcontrolname="password"][type="password"]');
    this.authenticateBtn = page.locator('button[type="submit"]', {hasText:"Autenticar"});
  }

  async goto() {
    await this.page.goto('https://club-administration.qa.qubika.com/#/auth/login', {waitUntil:"networkidle"});
  }


  async setUser(user:string) {
    await this.userInput.fill(user);
  }
  async setPassword(password:string) {
    await this.passwordInput.fill(password);
  }
  async autenticate() {
    await this.authenticateBtn.click();
  }

  async isUserInputDisplayed(){
    return this.userInput.isVisible();
  }
  async isPasswordInputDisplayed(){
    return this.passwordInput.isVisible();
  }
  async isAuthenticateBtnDisplayed(){
        return this.authenticateBtn.isVisible();
}
async isLoginPage(): Promise<boolean> {
    return this.isCurrentPage(this.url);
  }
}