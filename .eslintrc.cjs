module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', '@typescript-eslint', '@tanstack/query'],
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
			{
				usePrettierrc: true,
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/no-children-prop': 'off',
		'@tanstack/query/exhaustive-deps': 'error',
		'@tanstack/query/prefer-query-object-syntax': 'error',
	},
}
