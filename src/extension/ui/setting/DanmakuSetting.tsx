import { notification, Slider, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store";

import { updateBlockLevel, switchBlockVipColor } from "../store/danmaku";

export default function DanmakuSetting() {
  const { t } = useTranslation();
  const [notify, contextHolder] = notification.useNotification();
  const dispatcher = useDispatch();
  
  const blockLevel = useSelector<RootState, number>(store => store.danmaku.blockLevel);
  const isBlockVipColor = useSelector<RootState, boolean>(store => store.danmaku.isBlockVipColor);
  
  const handleBlockLevelChange = (value: number) => {
    dispatcher(updateBlockLevel(value));
    notify.info({
      description: t('设置已保存'),
      message: t('成功')
    });
  }
  
  const handleBlockVipColorChange = () => {
    dispatcher(switchBlockVipColor());
    notify.info({
      description: t('设置已保存'),
      message: t('成功')
    });
  }
  return (
    <>
      {contextHolder}
      <div style={{ alignItems: 'center', display: 'flex', width: '500px' }}>
        <span style={{ width: '20%' }}>{t("屏蔽等级")}：</span>
        <Slider
          value={blockLevel}
          min={0}
          step={1}
          max={10}
          onChange={handleBlockLevelChange}
          style={{width: '72%'}}
        />
      </div>
      <div>
        {t("屏蔽大会员彩色弹幕")}：<Switch checked={isBlockVipColor} onChange={handleBlockVipColorChange} />
      </div>
    </>
  )
}
