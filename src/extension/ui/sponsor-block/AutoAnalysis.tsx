import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import type { RootState } from "../store"

import { createLogger } from "../../../common/log"
import AnalysisStep from "./AnalysisStep"
const log = createLogger('AutoAnalysis')
type ShowPanel = ((b: boolean) => void) | undefined
let changeAiPanel: ShowPanel = undefined
// 第一次加载播放器，showAiAnalysis事件会相对早，changeAiPanel未附值导致不显示。
let isShowAiPanel = false
document.addEventListener("sponsorblock.showAiAnalysis", function (event: CustomEventInit<boolean>) {
  if (changeAiPanel === undefined) {
    log.warn('changeAiPanel not defined')
  }
  isShowAiPanel = !!event.detail
  changeAiPanel?.(!!event.detail)
})
export default function AutoAnalysis() {
  const { t } = useTranslation()
  log.info('AutoAnalysis')
  const child = useRef<{
    restart: () => void
  }>(null)
  // 是否启用
  const [isEnable, setIsEnable] = useState(isShowAiPanel);
  // 主面板是否可见
  const [isVisible, setIsVisible] = useState(false);
  const isSponsorAIDetect = useSelector<RootState, boolean>(store => store.sponsor.isSponsorAIDetect)

  if (!isSponsorAIDetect) return null
  changeAiPanel = (b) => {
    log.info('changeAiPanel:', b)
    setIsEnable(b);
  };
  if (!isEnable) return null
  // 关闭按钮处理
  const handleClose = () => {
    setIsVisible(false);
  };

  // 展开按钮处理
  const handleExpand = () => {
    setIsVisible(true);
  };

  // 重试按钮处理
  const handleRetry = () => {
    child.current?.restart();
  };

  // 如果主面板不可见，显示右侧展开按钮
  log.info('render panel')
  return (
    <>
    <div className="sponsor-expand-btn" style={{
        background: 'rgba(0, 0, 0, 0.8)',
        border: 'none',
        borderRadius: '4px 0 0 4px',
        bottom: '100px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        color: 'white',
        cursor: 'pointer',
        display: isVisible ? 'none' : 'block',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '12px 8px',
        pointerEvents: 'auto',
        position: 'absolute',
        right: '0px',
        zIndex: 9999
      }} onClick={handleExpand}>
        {t('展开')}
      </div>
    <div className="sponsor-overlay" style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="sponsor-container">
        <div className="sponsor-header">
          {/* 左上角：跳过信息和重试按钮 */}
          <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
            <span className="skip-text">{t('AI识别关键节点')}</span>
            <button
              onClick={handleRetry}
              title={t("重试")}
              style={{
                alignItems: 'center',
                background: 'none',
                border: 'none',
                borderRadius: '4px',
                color: '#666',
                cursor: 'pointer',
                display: 'flex',
                fontSize: '14px',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </button>
          </div>
          {/* 右上角：关闭按钮 */}
          <div className="skip-notice-controls">
            <button
              className="close-btn"
              onClick={handleClose}
              title={t("关闭")}
            >
              ✕
            </button>
          </div>
        </div>
        <AnalysisStep ref={child} />
      </div>
    </div>
    </>
  )
}