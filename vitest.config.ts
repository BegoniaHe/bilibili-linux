import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@config': resolve(__dirname, './src/config'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
  test: {
    // 测试文件匹配模式
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 排除目录
    exclude: [
      'node_modules/**',
      'dist/**',
      'app/**',
      'tmp/**',
      '.git/**',
    ],
    coverage: {
      exclude: [
        'dist/**',
        'node_modules/**',
        'app/**',
        'tmp/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**',
        'test/setup.ts',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
});
