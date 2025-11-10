/**
 * 弹幕相关类型定义
 */

import type { RootStore } from './store';

/**
 * Bilibili 弹幕类型
 */
export interface BiliDanmakuType {
  attr: number;
  color: number;
  date: number;
  mode: number;
  pool: number;
  renderAs: number;
  size: number;
  stime: number;
  text: string;
  weight: number;
}

/**
 * 弹幕管理器
 */
export interface DanmakuManage extends RootStore {
  danmaku: {
    clear: () => void;
    config: {
      fn: {
        filter: (t: {
          colorful: boolean;
          colorfulImg: string;
          weight: number;
        }) => boolean;
      };
    };
    manager: {
      dataBase: {
        timeLine: {
          list: BiliDanmakuType[];
        };
      };
    };
    reset: () => void;
  };
  initDanmaku: () => void;
  nodes: {
    controlBottomRight: Element;
  };
  rootStore: RootStore;
}
