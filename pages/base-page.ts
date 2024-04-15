import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async isCurrentPage(url:string): Promise<boolean>  {
    return (await this.page.url()) === url;
  }
  async waitForPageToLoad(){
   await this.page.waitForNavigation({waitUntil: 'domcontentloaded'})
  }

}