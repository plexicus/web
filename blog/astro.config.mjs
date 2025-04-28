import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

const { BLOG_SITE_URL, PORT, SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
export default defineConfig({
	env: {
		schema: {
			BLOG_SITE_URL: envField.string({ context: "client", access: "public", default: 'https://blog.plexicus.ai' }),
			SITE_URL: envField.string({ context: "client", access: "public", default: 'https://plexicus.ai' }),
			PORT: envField.number({ context: "client", access: "public", default: 9000 }),
		}
	},
	server: { port: PORT ? Number(PORT) : 9000 },
	site: BLOG_SITE_URL || 'https://blog.plexicus.ai',
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [mdx(), sitemap({
		serialize(item) {
			item.changefreq = "daily";
			item.lastmod = new Date();
			item.priority = 0.9;
			return item
		},
		i18n: {
			defaultLocale: 'en', // All urls that don't contain `es` or `fr` after `https://plexicus.com/` will be treated as default locale, i.e. `en`
			locales: {
			  en: 'en-US', // The `defaultLocale` value must present in `locales` keys
			  es: 'es-ES',
			  fr: 'it-IT',
			},
		  },
	}), react()],
});
