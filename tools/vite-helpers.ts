/**
 * Vite 构建辅助函数
 * 统一管理不同类型的构建配置
 */

import type { LibraryOptions, Plugin, UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';

const watch = process.argv.includes('--watch') ? {} : false;

/**
 * 构建配置类型
 */
export interface BuildConfig {
  cssFileName?: string;
  entry: string;
  fileName?: (format: string, entryName: string) => string;
  formats?: LibraryOptions['formats'];
  name: string;
  type: 'extension' | 'inject';
}

/**
 * 创建通用构建配置
 */
export function createBuildConfig(config: BuildConfig): UserConfig {
  const baseConfig: UserConfig = {
    build: {
      emptyOutDir: false,
      lib: {
        entry: config.entry,
        fileName: config.fileName || ((_format, entryName) => `${config.type}/${entryName}.js`),
        formats: config.formats || ['iife'],
        name: config.name,
        ...(config.cssFileName ? { cssFileName: config.cssFileName } : {}),
      },
      watch,
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    plugins: [react()],
  };

  return baseConfig;
}

/**
 * 创建 Inject 类型的构建配置
 */
export function createInjectBuildConfig(
  entry: string,
  name: string,
  __dirname: string
): UserConfig {
  // Node.js 内置模块列表
  const builtinModules = [
    'electron',
    'fs',
    'path',
    'os',
    'http',
    'https',
    'net',
    'events',
    'stream',
    'util',
    'crypto',
    'buffer',
    'querystring',
    'url',
    'zlib',
    'child_process',
    'cluster',
    'dgram',
    'dns',
    'domain',
    'http2',
    'module',
    'perf_hooks',
    'punycode',
    'readline',
    'repl',
    'string_decoder',
    'timers',
    'tls',
    'tty',
    'v8',
    'vm',
  ];

  return {
    build: {
      emptyOutDir: false,
      lib: {
        entry,
        fileName: (_format: string, entryName: string) => `inject/${entryName}.js`,
        formats: ['cjs'],
        name,
      },
      rollupOptions: {
        external: (id: string) => {
          // 检查是否为 Node.js 内置模块或以 node: 前缀开头的模块
          return (
            builtinModules.includes(id) ||
            id.startsWith('node:') ||
            /^[a-z][a-z0-9-_]*$/.test(id) // 简单的 npm 包名匹配
          );
        },
        output: {
          format: 'commonjs',
          globals: {},
          inlineDynamicImports: false,
        },
      },
      watch,
    },
    define: {},
    plugins: [
      {
        async closeBundle() {
          try {
            // eslint-disable-next-line no-console
            console.info('Copy index.js to app/app/index.js');
            const targetPath = resolve(__dirname, 'app/app/index.js');
            await copyFile(resolve(__dirname, 'dist/inject/index.js'), targetPath);
          } catch (_e) {
            /* empty */
          }
        },
        name: 'copy-inject',
      } as Plugin,
    ],
  };
}

/**
 * 执行构建
 */
export async function runBuild(config: UserConfig): Promise<void> {
  await build({
    ...config,
    configFile: false,
  });
}

/**
 * 批量执行构建
 */
export async function runBuilds(configs: UserConfig[]): Promise<void> {
  for (const config of configs) {
    await runBuild(config);
  }
}
