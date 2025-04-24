import eslintPluginAstro from 'eslint-plugin-astro';
import stylisticTs from '@stylistic/eslint-plugin-ts'
import config from "../eslint.config.mjs"
export default [
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		plugins: {
			'@stylistic/ts': stylisticTs
		},
		rules: config.rules
	}
];