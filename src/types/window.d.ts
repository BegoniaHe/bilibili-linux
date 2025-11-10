/**
 * Window 全局对象类型扩展
 */

import type { DanmakuManage } from './danmaku';
import type { BiliPlayer } from './player';

declare global {
  interface Window {
    __segment_base_map__: Record<string, [string, string]>;
    biliBridge: {
      callNative: <T>(action: string, ...args: unknown[]) => Promise<T>;
      callNativeSync: (action: string, ...args: unknown[]) => unknown;
    };
    biliBridgePc: {
      callNative: (action: string, ...args: unknown[]) => Promise<unknown>;
      callNativeSync: (action: string, ...args: unknown[]) => unknown;
    };
    biliPlayer: BiliPlayer;
    cookieStore: CookieStore;
    danmakuManage: DanmakuManage;
    dataSync: (data: string) => void;
    epId2seasonId: Record<string, string>;
  }
}

export {};
