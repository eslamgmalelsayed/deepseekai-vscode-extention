import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/extension.ts'),
      formats: ['cjs'],
      fileName: 'extension'
    },
    rollupOptions: {
      external: ['vscode'],
      output: {
        entryFileNames: '[name].js',
      }
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
