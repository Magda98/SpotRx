import type { Preview } from '@storybook/angular';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'spotrx',
			values: [
				{
					name: 'spotrx',
					value: '#35393c',
				},
			],
		},
	},
};

export default preview;
