import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  adapter: vercel(),
  output: 'server',
  integrations: [
    react(), 
    vue(), 
    svelte(), 
    tailwind()
  ]
});