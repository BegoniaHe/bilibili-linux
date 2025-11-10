import { notification, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store";

import { switchRelatedAutoPlay } from "../store/play";

export default function PlaySetting() {
  const { t } = useTranslation();
  const [notify, contextHolder] = notification.useNotification();
  const dispatcher = useDispatch();
  
  const isRelatedAutoPlay = useSelector<RootState, boolean>(store => store.play.isRelatedAutoPlay);
  
  const updateRelatedAutoPlay = () => {
    dispatcher(switchRelatedAutoPlay());
    notify.info({
      description: t('设置已保存'),
      message: t('成功')
    });
  }
  return (
    <>
      {contextHolder}
      <div>
        {t("自动连播推荐视频")}：
        <Switch
          checked={isRelatedAutoPlay}
          onChange={updateRelatedAutoPlay}
        />
      </div>
    </>
  )
}
