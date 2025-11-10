/**
 * Node.js 全局变量类型扩展
 */

import type { EventEmitter } from 'events';

declare global {
  /**
   * 应用启动事件发射器
   */
  var bootstrapEvents: EventEmitter;

  /**
   * 是否由入口触发
   */
  var isFiredByEntry: boolean;

  /**
   * 运行时配置
   */
  var runtimeConf: {
    exWebPreferences: Record<string, unknown>;
  };

  /**
   * 启动应用
   */
  var bootstrapApp: () => void;

  /**
   * Bilibili 应用对象
   */
  var biliApp: {
    configService: {
      loginRiskWindow: object | null;
      loginWindow: object | null;
      openMainWindowPage$: {
        next: (value: unknown) => void;
      };
    };
  };
}

export {};
