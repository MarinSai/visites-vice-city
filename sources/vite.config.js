import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { LANGUES } from './src/textes.js';
const L = process.env.VITE_LANGUE || 'fr';
const langueHtml = {
  name: 'langue-html',
  transformIndexHtml: (h) => h.replace('<html lang="fr">', `<html lang="${L}">`).replace('%TITRE%', LANGUES[L].titre)
};
export default defineConfig({
  plugins: [svelte(), viteSingleFile(), langueHtml],
  build: { outDir: 'dist-' + L, target: 'es2019', cssCodeSplit: false, assetsInlineLimit: 100000000 }
});
