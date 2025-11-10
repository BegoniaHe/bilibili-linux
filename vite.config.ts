import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import {
  createBuildConfig,
  createInjectBuildConfig,
  runBuild,
  type BuildConfig,
} from './tools/vite-helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(
  createBuildConfig({
    entry: resolve(__dirname, 'src/extension/content.ts'),
    name: 'content',
    type: 'extension',
  })
);

/**
 * 为什么不合并在content.js里面？
 * 权限不够：
 * 1. content.js里面访问不到danmakuMange
 * 2. content.js里面访问不到webview.isDevToolsOpened
 * 3. content.js里面访问不到biliBridgePc
 * 4. 方便测试开发content.js需要重启App(有无方法不需要重启？)
 */

// Page libraries - 扩展页面脚本构建
{
  const pageConfig: BuildConfig = {
    cssFileName: 'extension/bilibili',
    entry: resolve(__dirname, 'src/extension/page.ts'),
    name: 'page',
    type: 'extension',
  };

  runBuild(createBuildConfig(pageConfig));
}

// Inject libraries - 主进程注入脚本构建
{
  const injectConfig = createInjectBuildConfig(
    resolve(__dirname, 'src/inject/index.ts'),
    'index',
    __dirname
  );

  runBuild(injectConfig);
}