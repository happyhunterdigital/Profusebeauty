// File: vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Restores the verified official React compiler plugin

export default defineConfig({
  plugins: [react()],
  base: '/', // Enforces absolute root path mappings required by Firebase Hosting
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
