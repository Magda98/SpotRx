import { test as base } from '@playwright/test';
import { AUTH_DATA } from './authData';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await page.evaluate((authData) => {
      localStorage.setItem('authData', authData);
    }, AUTH_DATA);
    await page.reload();
    await use(page);
  },
});
