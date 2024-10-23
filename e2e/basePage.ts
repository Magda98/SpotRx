import { Page } from '@playwright/test';

export class BasePage {
	constructor(public readonly page: Page) {}

	async waitToBeLoaded() {
		const progressbars = await this.page.getByRole('progressbar').all();
		await Promise.all(
			progressbars.map((progressbar) => progressbar.waitFor({ state: 'detached' })),
		);
	}
}
