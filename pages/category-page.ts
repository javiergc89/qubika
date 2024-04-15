import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CategoryPage extends BasePage{
  readonly header: Locator;
  readonly categoryNameInput: Locator;
  readonly parentCategoryNameInput: Locator;
  readonly subCategoryCheckbox: Locator;
  readonly parentCategoryNameDropdown;
  readonly parentCategoryNameDropdownFirst;
  readonly lastPageLink: Locator;
  readonly addBtn: Locator;
  readonly submitBtn: Locator;
  readonly url:string = 'https://club-administration.qa.qubika.com/#/category-type';
  

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h3',{ hasText:"Tipos de categorías"});
    this.categoryNameInput = page.locator('input[type="text"][formcontrolname="name"]');
    this.parentCategoryNameInput = page.locator('div[role="combobox"] > input');
    this.parentCategoryNameDropdown = page.locator('ng-dropdown-panel[role="listbox"][aria-label="Options list"]');
    this.parentCategoryNameDropdownFirst =  this.parentCategoryNameDropdown.locator('div[role=option] span.ng-option-label');
    this.subCategoryCheckbox = page.locator('.text-muted', {hasText: "Es subcategoria?"});
    this.lastPageLink = page.locator('div.card-footer nav ul').locator('nth=-2');
    this.addBtn = page.locator('button.btn-primary', {hasText:"Adicionar"});
    this.submitBtn = page.locator('button[type="submit"]', {hasText:"Aceptar"});
  }

  async goto() {
    await this.page.goto(this.url, {waitUntil:"networkidle"});
  }


  async setCategoryName(categoryName:string) {
    await this.categoryNameInput.fill(categoryName);
  }
  async setParentCategoryName(parentCategoryName:string) {
    await this.parentCategoryNameInput.fill(parentCategoryName);
    await this.parentCategoryNameDropdownFirst.filter({ hasText: parentCategoryName }).first().click();
  }
  async setAsSubcategory(){
    await this.subCategoryCheckbox.click();
  }
  async clickLastPageButton(){
    const elements = await this.page.locator('div.card-footer > nav > ul li a').all();
    const secondToLastElement = elements[elements.length - 2];
    const anchorElement = await secondToLastElement;
    await anchorElement.click();
  }
  async hasCategoryName(name:string): Promise<boolean>{

    const tbody = await this.page.locator('table.table tbody');
    const rows = await tbody.locator('tr').all();
    let found = false;

    for (const row of rows) {

        const nombreText = await row.locator('td').nth(0).innerText();
        console.log('ROW: ',nombreText);
        if (nombreText === name) {
            console.log('Row with specific name found.');
            found = true;
            break;
        }
    }
    return found;
  }
  async add() {
    await this.addBtn.click();
  }
  async submit() {
    await this.submitBtn.click();
  }

  async isAddBtnDisplayed(){
        return this.addBtn.isVisible();
}
async isCategoryPage(): Promise<boolean> {
    return this.isCurrentPage(this.url);
  }

async waitForCreatedMessage(){
    await this.page.waitForSelector('#toast-container', { state: 'visible' });

await this.page.waitForSelector('#toast-container', { state: 'hidden' });
}  
}