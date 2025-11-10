import { ConfigProvider, theme } from "antd";

import './index.scss'
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import i18n from 'i18next'
import { StrictMode, useMemo, useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { Provider, useSelector, useDispatch } from 'react-redux'

import { createLogger } from "../../common/log.ts";
import App from './App.tsx'
import store, { type RootState } from "./store/index.ts";

const log = createLogger('main')

// 初始化 i18n（只初始化一次）
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "zhCn",
    interpolation: {
      escapeValue: false
    },
    lng: 'zhCn', // 设置默认语言
    resources: {
      en: {
        translation: {
          "AccessToken用于获取外区番剧的播放链接。": "AccessToken is used to get playback links for overseas anime.",
          "Access Token管理": "Access Token Management",
          "AI自动识别": "AI Auto Recognition",
          "AI自动识别需要配置TOKEN，平台：https://www.bigmodel.cn/": "AI auto recognition requires TOKEN configuration, platform: https://www.bigmodel.cn/",
          "AI自动识别需要配置代理": "AI auto recognition requires proxy configuration",
          "AI识别TOKEN": "AI Recognition TOKEN",
          "AI识别关键节点": "AI Recognition of Key Points",
          "B站弹幕": "Danmaku",
          "HD登录": "HD Login",
          "PAC代理": "PAC Proxy",
          "token已过期": "Token expired",
          "upos服务器设置": "UPOS Server Settings",
          "Whisper代理": "Whisper Proxy",
          "不再显示": "Don't show again",
          "不替换": "No replacement",
          "你确定要删除吗？": "Are you sure you want to delete?",
          "例如": "e.g.",
          "保存": "Save",
          "关于哔哩漫游": "About Bili Roaming",
          "关闭": "Close",
          "其它设定": "Other",
          "出现错误": "Error occurred",
          "删除": "Delete",
          "功能开关": "Function Switch",
          "取消跳过": "Cancel skip",
          "取消跳过操作": "Cancel skip operation",
          "台湾": "Taiwan",
          "大陆": "Mainland",
          "屏蔽大会员彩色弹幕": "Block VIP colored danmaku",
          "屏蔽等级": "Block Level",
          "展开": "Expand",
          "应用到所有视频": "Apply to all videos",
          "弹幕时间轴": "Danmaku Timeline",
          "弹幕时间轴调整": "Danmaku Timeline Adjustment",
          "弹幕设定": "Danmaku",
          "弹弹Play": "DanDanPlay",
          "成功": "Success",
          "所有弹幕右移1s": "Move all danmaku right 1s",
          "所有弹幕右移5s": "Move all danmaku right 5s",
          "所有弹幕左移1s": "Move all danmaku left 1s",
          "所有弹幕左移5s": "Move all danmaku left 5s",
          "扩展功能": "Extension Features",
          "插件设置": "Extension Settings",
          "搜索": "Search",
          "播放设定": "Playback",
          "时间轴偏移": "Timeline Offset",
          "时间轴调整": "Timeline Adjustment",
          "暂停倒计时": "Pause countdown",
          "替换Akamai": "Replace Akamai",
          "替换upos视频服务器": "Replace UPOS video server",
          "替换弹幕池": "Replace danmaku pool",
          "本地没有token数据！": "No local token data!",
          "本次观看不再显示此通知": "Don't show this notification again for this viewing",
          "检查字幕数据": "Check subtitle data",
          "模式": "Mode",
          "没有字幕数据": "No subtitle data",
          "泰国/东南亚": "Thailand/Southeast Asia",
          "添加标记": "Add markers",
          "漫游设置": "Roaming",
          "确定": "Confirm",
          "第三方弹幕": "Third-party danmaku",
          "结果": "Results",
          "继续倒计时": "Continue countdown",
          "自动识别关键节点": "Auto Recognition of Key Points",
          "自动跳过": "Auto skip",
          "自动连播推荐视频": "Auto play recommended videos",
          "自定义服务器设置": "Custom Server Settings",
          "获取字幕数据": "Get subtitle data",
          "获取音频数据": "Get audio data",
          "设置已保存": "Settings saved",
          "语言设定": "Language Settings",
          "赞助/恰饭 已跳过": "Sponsor/Ad skipped",
          "赞助跳过": "Sponsor skip",
          "过期时间": "Expiration time",
          "追加弹幕池": "Append to danmaku pool",
          "重置": "Reset",
          "重试": "Retry",
          "音频转字幕": "Audio to subtitle",
          "首选": "Preferred",
          "香港": "Hong Kong"
        }
      },
      zhCn: {
        translation: {}
      }
    }
  });

// 创建一个内部组件，在这里使用 hooks
function AppWithLocale() {
  const language = useSelector((state: RootState) => state.storage.lang);
  const dispatch = useDispatch();
  
  // 当 Redux 中的语言状态改变时，同步更新 i18n
  useEffect(() => {
    if (language) {
      log.info('Redux language changed:', language)
      i18n.changeLanguage(language)
    }
  }, [language]);

  // 监听外部语言切换事件
  useEffect(() => {
    const targetDocument = parent === window ? document : parent.document
    const handleLanguageChange = (e: CustomEventInit<string>) => {
      if (e.detail) {
        log.info('External language change event:', e.detail)
        i18n.changeLanguage(e.detail)
      }
    }
    
    targetDocument.addEventListener('changeLanguage', handleLanguageChange)
    
    return () => {
      targetDocument.removeEventListener('changeLanguage', handleLanguageChange)
    }
  }, [language, dispatch]);
  const locale = useMemo(() => {
    if (language === 'en') {
      return enUS;
    }
    return zhCN;
  }, [language]);
  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}  
      locale={locale}
    >
      <App />
    </ConfigProvider>
  );
}

// 导出根组件，不在此使用任何 hooks
export default function SettingEntry() {
  return (
    <StrictMode>
      <Provider store={store}>
        <AppWithLocale />
      </Provider>
    </StrictMode>
  )
}