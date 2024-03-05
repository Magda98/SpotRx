import { test } from './setup';

test('brwose saved tracks', async ({ basePage }) => {
  const savedButton = basePage.page.getByRole('link', { name: 'Saved' });
  await savedButton.click();
  await basePage.page.waitForURL('/saved');
  basePage.waitToBeLoaded();
  await basePage.page.getByLabel('Next page').click();
  basePage.waitToBeLoaded();
});
