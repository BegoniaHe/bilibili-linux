/**
 * 播放器相关类型定义
 */

/**
 * Bilibili 播放器接口
 */
export interface BiliPlayer {
  /**
   * 添加视频打点信息
   * @param data JSON字符串，例如：[{ type: 1, from: 60, to: 120, content: 'test' }]
   */
  addViewPoints: (data: string) => void;

  /**
   * 监听播放器事件
   */
  on: (event: string, callback: (...args: unknown[]) => void) => this;

  /**
   * 跳转到指定时间
   * @param time 目标时间（秒）
   * @param cfg 配置项
   */
  seek: (time: number, cfg?: { initiator: string }) => Promise<void>;
}

/**
 * 视频片段信息
 */
export interface ParsedFragmentVideoInfo {
  acceptDescription: string[];
  mediaDataSource: {
    duration: number;
    url: {
      audio: ParsedAudioInfo[];
    };
  };
}

/**
 * 音频信息
 */
export interface ParsedAudioInfo {
  backup_url: string[];
  base_url: string;
}

/**
 * 字幕语言信息
 */
export interface SubtitleLanguage {
  ai_status: number;
  ai_type: number;
  id: number;
  id_str: `${number}`;
  is_lock: boolean;
  lan: string;
  lan_doc: string;
  subtitle_url: string;
  subtitle_url_v2: string;
  type: number;
}

/**
 * Toast 提示框参数
 */
export interface ToastCreateParam {
  confirmText?: string;
  duration?: number;
  fixed?: boolean;
  /**
   * 是否手动取消
   */
  manualMode: boolean;
  onConfirmClicked?: () => void;
  onHoverChanged?: (hovering: boolean) => void;
  onRemoved?: () => void;
  priority?: number;
  text: string | HTMLElement | Node;
}

/**
 * 热点类型
 * - StudyNote: 笔记
 * - WonderMoment: 高能
 * - Division: 章节
 * - OpenEnd: 片头片尾
 * - AIPoint: AI打点
 */
export type HotspotType =
  | 'StudyNote'
  | 'WonderMoment'
  | 'Division'
  | 'OpenEnd'
  | 'AIPoint';
