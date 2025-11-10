import { Tabs } from "antd";
import { useTranslation } from "react-i18next";

import BiliDanmakuReplaceSetting from "./BiliDanmakuReplaceSetting";
import DanDanPlayReplaceSetting from "./DanDanPlayReplaceSetting";
import DanmakuSetting from "./DanmakuSetting";
import OtherSetting from "./OtherSetting";
import PlaySetting from "./PlaySetting";
import RoamingSetting from "./RoamingSetting";

export default function Setting() {
  const { t } = useTranslation();
  const onChange = (_key: string) => {
  };

  return (
    <>
      <Tabs defaultActiveKey="1" items={[
    {
      children: RoamingSetting(),
      key: '1',
      label: t('漫游设置'),
    },
    {
      children: BiliDanmakuReplaceSetting(),
      key: '2',
      label: t('B站弹幕'),
    },
    {
      children: DanDanPlayReplaceSetting(),
      key: '3',
      label: t('弹弹Play'),
    },
    {
      children: DanmakuSetting(),
      key: '4',
      label: t('弹幕设定'),
    },
    {
      children: PlaySetting(),
      key: '5',
      label: t('播放设定'),
    },
    {
      children: OtherSetting(),
      key: '6',
      label: t('其它设定'),
    },
  ]} onChange={onChange} />
    </>
  )
}