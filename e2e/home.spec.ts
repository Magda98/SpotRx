import { test } from './setup';

test('home', async ({ basePage }) => {
	const playlistLink = basePage.page.getByRole('main').getByRole('link').nth(0);
	const playlistTitle = (await playlistLink.textContent()) ?? '';
	await playlistLink.click();
	await basePage.waitToBeLoaded();
	await basePage.page.getByRole('heading', { name: playlistTitle }).waitFor();
});

test('play playlist track', async ({ basePage }) => {
	const playlistLink = basePage.page.getByRole('main').getByRole('link').nth(0);
	const playlistTitle = (await playlistLink.textContent()) ?? '';
	await playlistLink.click();
	await basePage.waitToBeLoaded();
	await basePage.page.getByRole('heading', { name: playlistTitle }).waitFor();

	const track = basePage.page.getByRole('main').getByRole('button', { name: 'CZEMU NIE ŚPISZ?' });
	await track.click();
});
