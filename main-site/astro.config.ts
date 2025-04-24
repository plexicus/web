import { defineConfig } from "astro/config";

import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  site: 'https://www.plexicus.ai',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), robotsTxt(), react()],
});