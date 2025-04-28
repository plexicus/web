import eslintPluginAstro from "eslint-plugin-astro";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import config from "../eslint.config.mjs";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
export default defineConfig([
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		plugins: {
			"@stylistic": stylistic,
			"@stylistic/ts": stylisticTs,
			"@stylistic/jsx": stylisticJsx,
		},
	},
]);
