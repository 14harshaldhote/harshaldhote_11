import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed on Vercel at the domain root, so assets resolve from '/'.
// Each blog post is its own page, built to /blog/<slug>/index.html.
const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        lotuslab: page('./blog/lotuslab/index.html'),
        'chest-ct-classifier': page('./blog/chest-ct-classifier/index.html'),
      },
    },
  },
});
