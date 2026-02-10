import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://keithcollins.github.io',
  integrations: [svelte()],
  output: 'static',
  build: {
    assets: '_astro'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
