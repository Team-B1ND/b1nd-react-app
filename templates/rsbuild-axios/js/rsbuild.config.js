import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.jsx',
    },
    alias: {
      '@src': path.resolve(process.cwd(), './src'),
      '@components': path.resolve(process.cwd(), './src/components'),
      '@hooks': path.resolve(process.cwd(), './src/hooks'),
      '@utils': path.resolve(process.cwd(), './src/utils'),
      '@assets': path.resolve(process.cwd(), './src/assets'),
      '@config': path.resolve(process.cwd(), './src/config'),
      '@constants': path.resolve(process.cwd(), './src/constants'),
      '@libs': path.resolve(process.cwd(), './src/libs'),
      '@pages': path.resolve(process.cwd(), './src/pages'),
      '@queries': path.resolve(process.cwd(), './src/queries'),
      '@api': path.resolve(process.cwd(), './src/api'),
      '@styles': path.resolve(process.cwd(), './src/styles'),
    },
  },
  html: {
    template: './index.html',
  },
  output: {
    target: 'web',
    distPath: {
      root: 'build',
    },
    minify: {
      js: true,
      css: true,
    },
    sourceMap: {
      js: false,
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: [/[\\/]node_modules[\\/]/],
    },
  },
});
