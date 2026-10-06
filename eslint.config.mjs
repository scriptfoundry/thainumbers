import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
	{
		files: ['**/*.ts', '**/*.js'],
		languageOptions: {
			globals: globals.browser,
			parser: tsParser,
		},
		rules: {
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'no-extra-semi': 'error',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'no-console': 'warn',
		},
	},
];