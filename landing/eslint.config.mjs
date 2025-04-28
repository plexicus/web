import eslintPluginAstro from "eslint-plugin-astro";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import config from "../eslint.config.mjs";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import astroParser from "astro-eslint-parser";
import tseslint from "typescript-eslint";
export default defineConfig([
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		files: ["**/*.{js,ts,jsx,tsx}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"@stylistic": stylistic,
			"@stylistic/jsx": stylisticJsx,
			"@stylistic/ts": stylisticTs,
		},
		rules: {
			// General stylistic
			"@stylistic/indent": ["error", 2],
			"@stylistic/semi": ["error", "always"],
			"@stylistic/quotes": ["error", "single", { avoidEscape: true }],
			"@stylistic/comma-dangle": ["error", "always-multiline"],
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/array-bracket-spacing": ["error", "never"],
			"@stylistic/space-before-function-paren": ["error", "never"],

			// JSX-specific styling
			"@stylistic/jsx-quotes": ["error", "prefer-double"],
			"@stylistic/jsx-closing-bracket-location": ["error", "tag-aligned"],
			"@stylistic/jsx-curly-spacing": [
				"error",
				{ when: "never", children: { when: "always" } },
			],
			"@stylistic/jsx-indent": ["error", 2],
			"@stylistic/jsx-indent-props": ["error", 2],
			"@stylistic/jsx-max-props-per-line": [
				"error",
				{ maximum: 1, when: "multiline" },
			],
			"@stylistic/jsx-first-prop-new-line": [
				"error",
				"multiline-multiprop",
			],
			"@stylistic/jsx-tag-spacing": [
				"error",
				{
					beforeSelfClosing: "always",
					afterOpening: "never",
					closingSlash: "never",
				},
			],
			"@stylistic/jsx-wrap-multilines": [
				"error",
				{
					declaration: "parens-new-line",
					assignment: "parens-new-line",
					return: "parens-new-line",
					arrow: "parens-new-line",
					condition: "parens-new-line",
					logical: "parens-new-line",
					prop: "ignore",
				},
			],

			// TS-specific stylistic
			"@stylistic/type-annotation-spacing": [
				"error",
				{ before: false, after: true },
			],
			"@stylistic/member-delimiter-style": [
				"error",
				{
					multiline: { delimiter: "semi", requireLast: true },
					singleline: { delimiter: "semi", requireLast: false },
				},
			],
		},
	},

	// Astro files only
	{
		files: ["**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: "@typescript-eslint/parser", // for frontmatter blocks
				extraFileExtensions: [".astro"],
			},
		},
		rules: {
			"astro/prefer-class-list-directive": "warn",
			"astro/prefer-object-class-list": "warn",

			// Optional general stylistic inside .astro
			indent: ["error", 2],
			quotes: ["error", "double", { avoidEscape: true }],
			semi: ["error", "always"],
			"comma-dangle": ["error", "always-multiline"],
			"object-curly-spacing": ["error", "always"],
			"array-bracket-spacing": ["error", "never"],
		},
	},
	globalIgnores(['.astro', 'node_modules', 'dist'])
]);
