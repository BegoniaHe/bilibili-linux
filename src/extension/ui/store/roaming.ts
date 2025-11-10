import { createSlice } from '@reduxjs/toolkit';

export interface ServerConfig {
  default: string
  hk: string
  mainLand: string
  th: string
  tw: string
}

export interface UposConfig {
  pacLink: string
  replaceAkamai: boolean
  uposApplyAll: boolean
  uposKey: string
}

export interface RoamingState {
  serverConfig: ServerConfig
  uposConfig: UposConfig
}

const getInitialServerConfig = (): ServerConfig => {
  if (localStorage.serverList) {
    return JSON.parse(localStorage.serverList);
  }
  return {
    default: '',
    hk: '',
    mainLand: '',
    th: '',
    tw: ''
  };
};

const initialState: RoamingState = {
  serverConfig: getInitialServerConfig(),
  uposConfig: {
    pacLink: localStorage.pacLink || "",
    replaceAkamai: localStorage.replaceAkamai === "true",
    uposApplyAll: localStorage.uposApplyAll === 'true',
    uposKey: localStorage.upos || 'none',
  },
};

// 创建一个 Slice 
export const roamingSlice = createSlice({
  initialState,
  name: 'roaming',
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 重置服务器配置
    resetServerConfig: (state) => {
      state.serverConfig = {
        default: '',
        hk: '',
        mainLand: '',
        th: '',
        tw: ''
      };
    },
    // 数据同步方法
    roamingSyncState: (state, action) => {
      // 合并同步的状态数据
      return {
        ...state,
        ...action.payload
      };
    },
    // 保存服务器配置
    saveServerConfig: (state, action) => {
      const data = action.payload as ServerConfig;
      state.serverConfig = data;
      localStorage.serverList = JSON.stringify(state.serverConfig);
    },
    // 保存upos配置
    saveUposConfig: (state, action) => {
      const data = action.payload as UposConfig;
      state.uposConfig = data;
      localStorage.upos = state.uposConfig.uposKey;
      localStorage.uposApplyAll = state.uposConfig.uposApplyAll;
      localStorage.replaceAkamai = state.uposConfig.replaceAkamai;
      localStorage.pacLink = state.uposConfig.pacLink;
    },
    // 更新服务器配置
    updateServerConfig: (state, action) => {
      const { key, value } = action.payload;
      state.serverConfig[key as keyof ServerConfig] = value;
    },
  },
});

export const {
  resetServerConfig,
  roamingSyncState,
  saveServerConfig,
  saveUposConfig,
  updateServerConfig
} = roamingSlice.actions;

// 默认导出
export default roamingSlice.reducer;