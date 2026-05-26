import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id: string | string[]) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
