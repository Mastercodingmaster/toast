import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['**/*.ts', '**/*.tsx', '../../shared/toast-types.ts'],
      outDir: 'dist',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'PixelDoezPlanes',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../../shared'),
      '@': resolve(__dirname, '../../client/src'),
      '@/lib/utils': resolve(__dirname, '../../client/src/lib/utils'),
    },
  },
});
