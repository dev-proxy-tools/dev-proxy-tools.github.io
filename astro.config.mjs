// @ts-check
import { defineConfig } from 'astro/config';
import astroConsent from 'astro-consent';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://devproxy.net',
  base: '/',
  integrations: [
    astroConsent({
      siteName: 'This website',
      policyUrl: 'https://go.microsoft.com/fwlink/?LinkId=521839',
      consent: {
        days: 90,
        storageKey: 'devproxy-cookie-consent'
      },
      categories: {
        analytics: false
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});