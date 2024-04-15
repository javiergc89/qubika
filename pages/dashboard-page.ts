import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage{
  readonly url: string = "https://club-administration.qa.qubika.com/#/dashboard";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async categoriesTypes(){
    
  }
 async isDashboardPage(): Promise<boolean>  {
    return this.isCurrentPage(this.url);
  }
}