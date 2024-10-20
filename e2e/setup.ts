import { test as base } from '@playwright/test';
import { AUTH_DATA } from './authData';
import { BasePage } from './basePage';

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await page.goto('/');
    await page.evaluate((authData) => {
      localStorage.setItem('authData', JSON.stringify(authData));
      localStorage.setItem('token', authData.access_token);
    }, AUTH_DATA);
    await page.reload();
    await use(basePage);
  },
});
