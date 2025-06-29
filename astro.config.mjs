// @ts-check
import { defineConfig } from 'astro/config';
// noinspection ES6PreferShortImport
import {siteConfig} from "./src/utils/site.config.js";
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';


export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});