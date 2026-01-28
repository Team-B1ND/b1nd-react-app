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
