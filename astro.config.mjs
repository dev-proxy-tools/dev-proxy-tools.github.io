// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dev-proxy-tools.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  }
});