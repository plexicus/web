import eslintPluginAstro from 'eslint-plugin-astro';
import stylisticTs from '@stylistic/eslint-plugin-ts'
export default [
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		plugins: {
			'@stylistic/ts': stylisticTs
		},
		rules: {
			// override/add rules settings here, such as:
			'@stylistic/ts/indent': ['error', 'tab']
			// "astro/no-set-html-directive": "error"
		}
	}
];