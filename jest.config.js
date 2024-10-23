export default {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	globalSetup: 'jest-preset-angular/global-setup',
	roots: ['<rootDir>/src'],
	moduleNameMapper: {
		'^@app/(.*)$': '<rootDir>/src/app/$1',
		'^@tests/(.*)$': '<rootDir>/src/tests/$1',
	},
};
