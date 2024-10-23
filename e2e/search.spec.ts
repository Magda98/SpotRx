import { test } from './setup';

test('search song', async ({ basePage }) => {
	await basePage.page.getByRole('link', { name: 'Search' }).click();
	await basePage.page.waitForURL('/search');
	const searchInput = basePage.page.getByRole('textbox', { name: 'search' });
	await searchInput.fill('Maryla');
	await basePage.waitToBeLoaded();
});
