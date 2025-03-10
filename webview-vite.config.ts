import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/webview',
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/webview/main.ts'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[ext]'
      }
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/webview')
    }
  }
});
