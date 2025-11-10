/**
 * Store 相关类型定义
 */

import type {
  ParsedAudioInfo,
  ParsedFragmentVideoInfo,
  SubtitleLanguage,
  ToastCreateParam,
} from './player';

/**
 * 根 Store
 */
export interface RootStore {
  configStore: ConfigStore;
  danmakuStore: DanmakuStore;
  hotspotStore: HotspotStore;
  mediaStore: MediaStore;
  mpdStore: MpdStore;
  nodes: {
    videoArea: HTMLElement;
  };
  progressStore: ProgressStore;
  storyStore: StoryStore;
  subtitleStore: SubtitleStore;
  toastStore: ToastStore;
}

/**
 * 配置 Store
 */
export interface ConfigStore extends RootStore {
  reload: {
    cid: number;
  };
  rootStore: RootStore;
}

/**
 * 弹幕 Store
 */
export interface DanmakuStore extends RootStore {
  loadDmPbAll: (all: boolean) => void;
  rootStore: RootStore;
}

/**
 * 热点 Store
 */
export interface HotspotStore extends RootStore {
  rootStore: RootStore;
  state: {
    /**
     * StudyNote 笔记
     */
    '-1': ProgressViewPoint[];
    /**
     * WonderMoment 高能
     */
    1: ProgressViewPoint[];
    /**
     * Division 章节
     */
    2: ProgressViewPoint[];
    /**
     * OpenEnd 片头片尾
     */
    3: ProgressViewPoint[];
    /**
     * AIPoint AI打点
     */
    4: ProgressViewPoint[];
  };
}

/**
 * 媒体 Store
 */
export interface MediaStore extends RootStore {
  rootStore: RootStore;
  video: HTMLVideoElement;
}

/**
 * MPD Store
 */
export interface MpdStore extends RootStore {
  body: {
    mediaDataSource: {
      duration: number;
      type: string;
      url: {
        audio: ParsedAudioInfo[];
      };
    };
    parsedFragmentVideoInfoList: ParsedFragmentVideoInfo[];
  };
  rootStore: RootStore;
}

/**
 * 进度 Store
 */
export interface ProgressStore extends RootStore {
  rootStore: RootStore;
  viewpoint?: ProgressViewPoint[];
}

/**
 * 故事 Store
 */
export interface StoryStore extends RootStore {
  rootStore: RootStore;
  state: {
    relatedAutoplay: boolean;
  };
}

/**
 * 字幕 Store
 */
export interface SubtitleStore extends RootStore {
  rootStore: RootStore;
  state: {
    bilingual: boolean;
    color: string;
    enable: boolean;
    fade: boolean;
    fontSize: number;
    hover: boolean;
    isclosed: boolean;
    lang: string;
    languageList?: SubtitleLanguage[];
    minorLan: string;
    opacity: number;
    position: string;
    scale: number;
    shadow: string;
  };
}

/**
 * Toast Store
 */
export interface ToastStore extends RootStore {
  create: (param: ToastCreateParam) => number;
  remove: (id: number) => boolean;
  resumeClock: (id: number) => void;
  rootStore: RootStore;
  suspendClock: (id: number) => void;
}

/**
 * 进度打点信息
 * - type 1: 高能
 * - type 2: 章节
 */
export interface ProgressViewPoint {
  content: string;
  from: number;
  imgUrl?: string;
  logoUrl?: string;
  /**
   * 自定义的 SponsorBlock 数据
   */
  sponsor_info?: SponsorBlockInfo;
  team_name?: string;
  to: number;
  type: number;
}

/**
 * SponsorBlock 信息
 */
export interface SponsorBlockInfo {
  actionType: 'skip' | 'mute' | 'full' | 'poi' | 'chapter';
  category:
    | 'sponsor'
    | 'selfpromo'
    | 'interaction'
    | 'intro'
    | 'outro'
    | 'preview'
    | 'hook'
    | 'filler';
}
