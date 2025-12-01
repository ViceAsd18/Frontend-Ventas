import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    include: ['**/__tests__/**/*.test.{ts,tsx,js,jsx}'],
  },
  resolve: {
    alias: [
      { find: 'auth', replacement: path.resolve(__dirname, 'auth') },
      { find: 'services', replacement: path.resolve(__dirname, 'services') },
      { find: 'componentes', replacement: path.resolve(__dirname, 'componentes') },
      { find: 'modelo', replacement: path.resolve(__dirname, 'modelo') },
    ],
  },
});
