/**
 * 应用统一配置管理
 * 集中管理所有配置项，便于维护和修改
 */

export const CONFIG = {
  /**
   * API 端点配置
   */
  api: {
    bilibili: 'https://api.bilibili.com',
    biliPlayUrl: 'https://api.bilibili.com/x/player/playurl',
    biliSearch: 'https://api.bilibili.com/x/web-interface/search',
    biliVideo: 'https://api.bilibili.com/x/web-interface/view',
  },

  /**
   * 应用信息
   */
  app: {
    displayName: 'Bilibili Linux',
    name: 'bilibili-linux',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },

  /**
   * 默认设置
   */
  defaults: {
    danmaku: {
      enabled: true,
      fontSize: 25,
      opacity: 0.8,
      speed: 1,
    },
    playback: {
      autoPlay: true,
      defaultQuality: 80,
      defaultVolume: 100,
    },
    windowSize: {
      height: 720,
      minHeight: 600,
      minWidth: 800,
      width: 1280,
    },
  },

  /**
   * 功能开关
   */
  features: {
    autoUpdate: true,
    danmakuShare: true,
    devTools: false, // 可通过 F12 开启
    roaming: true,
    sponsorBlock: true,
  },

  /**
   * 路径配置
   */
  paths: {
    cache: '~/.cache/bilibili',
    flagsFile: '~/.config/bilibili/bilibili-flags.conf',
    userConfig: '~/.config/bilibili',
    userData: '~/.local/share/bilibili',
  },
} as const;

/**
 * 区域配置
 */
export const REGIONS = {
  CN: 'cn', // 中国大陆
  HK: 'hk', // 香港
  TH: 'th', // 泰国
  TW: 'tw', // 台湾
} as const;

export type Region = typeof REGIONS[keyof typeof REGIONS];

/**
 * 视频质量配置
 */
export const VIDEO_QUALITY = {
  AUTO: 0,
  HD: 112,
  HIGH: 64,
  LOW: 16,
  MEDIUM: 32,
  SUPER: 80,
  UHD: 116,
} as const;

export type VideoQuality = typeof VIDEO_QUALITY[keyof typeof VIDEO_QUALITY];

/**
 * 错误码定义
 */
export const ERROR_CODES = {
  AUTH_FAILED: 'AUTH_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
  REGION_RESTRICTED: 'REGION_RESTRICTED',
  VIDEO_NOT_FOUND: 'VIDEO_NOT_FOUND',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
