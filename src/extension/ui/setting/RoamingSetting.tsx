import { Button, Card, Form, Input, notification, Select, Switch } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import type { RootState } from "../store"

import { createLogger } from "../../../common/log"
import { saveUposConfig, saveServerConfig, resetServerConfig, type UposConfig, type ServerConfig } from "../store/roaming"
import HDLogin from "./roaming/HDLogin"

export default function RoamingSetting() {
  const log = createLogger('RoamingSetting')
  const [notify, contextHolder] = notification.useNotification();
  const dispatcher = useDispatch();
  const {t} = useTranslation()
  
  const uposConfig = useSelector<RootState, UposConfig>(store => store.roaming.uposConfig);
  const storeServerConfig = useSelector<RootState, ServerConfig>(store => store.roaming.serverConfig);

  const uposItemList = [
    {
      label: t('不替换'),
      value: 'none'
    },
    {
      label: "ali（阿里）",
      value: "ali",
    },
    {
      label: "alib（阿里）",
      value: "alib",
    },
    {
      label: "alio1（阿里）",
      value: "alio1",
    },
    {
      label: "bos（百度）",
      value: "bos",
    },
    {
      label: "cos（腾讯）",
      value: "cos",
    },
    {
      label: "cosb（腾讯）",
      value: "cosb",
    },
    {
      label: "coso1（腾讯）",
      value: "coso1",
    },
    {
      label: "hw（华为）",
      value: "hw",
    },
    {
      label: "hwb（华为）",
      value: "hwb",
    },
    {
      label: "hwo1（华为）",
      value: "hwo1",
    },
    {
      label: "08c（华为）",
      value: "08c",
    },
    {
      label: "08h（华为）",
      value: "08h",
    },
    {
      label: "08ct（华为）",
      value: "08ct",
    },
    {
      label: "tf_hw（华为）",
      value: "tf_hw",
    },
    {
      label: "tf_tx（腾讯）",
      value: "tf_tx",
    },
    {
      label: "akamai（Akamai海外）",
      value: "akamai",
    },
    {
      label: "aliov（阿里海外）",
      value: "aliov",
    },
    {
      label: "cosov（腾讯海外）",
      value: "cosov",
    },
    {
      label: "hwov（华为海外）",
      value: "hwov",
    },
    {
      label: "hk_bcache（Bilibili海外）",
      value: "hk_bcache",
    },
  ]
  const [upos, updateUpos] = useState(uposConfig)
  const updateUposValue = (key: string, value: string | boolean) => {
    updateUpos(pre => ({
      ...pre,
      [key]: value,
    }))
  }
  useEffect(() => {
    updateUpos(uposConfig)
  }, [uposConfig])
  
  const handleSaveUposConfig = () => {
    dispatcher(saveUposConfig(upos));
    notify.info({
      description: t("成功"),
      message: t('成功'),
    });
  }
  const [serverConfig, updateServer] = useState(storeServerConfig)
  const updateServerValue = (key: string, value: string) => {
    updateServer(pre => ({
      ...pre,
      [key]: value,
    }))
  }
  useEffect(() => {
    updateServer(storeServerConfig)
  }, [storeServerConfig])
  const [form] = Form.useForm();
  const saveServer = async () => {
    log.info('saveServer: ', form)
    const valid = await form.validateFields()

    if (valid) {
      dispatcher(saveServerConfig(serverConfig));
      notify.info({
        description: t("成功"),
        message: t('成功'),
      })
    } else {
      log.info('error submit!')
      return false
    }
  }
  
  const resetForm = function () {
    dispatcher(resetServerConfig());
    form.resetFields()
  }
  return (
    <>
      {contextHolder}
      <div style={{ height: '50vh', overflowY: 'scroll' }}>
        <div>
          <HDLogin />
          <br />
          <Card title={t("upos服务器设置")}>
            <div>
              <div style={{ margin: '.5rem'}}>
                {t("替换upos视频服务器")}：
                <Select
                  value={upos.uposKey}
                  className="m-2"
                  placeholder="Select"
                  onChange={value => updateUposValue('uposKey', value)}
                  options={uposItemList}
                  style={{width: '150px'}}
                >
                </Select>
              </div>
              <div style={{ margin: '.5rem'}}>
                {t("替换Akamai")}：<Switch checked={upos.replaceAkamai} onChange={e => updateUposValue('replaceAkamai', e)}></Switch>
              </div>
              <div style={{ margin: '.5rem'}}>
                {t("应用到所有视频")}：<Switch checked={upos.uposApplyAll} onChange={e => updateUposValue('uposApplyAll', e)}></Switch>
              </div>
              <div style={{ margin: '.5rem'}}>
                {t("PAC代理")}({t("例如")}：https://bili.api.jysafe.cn/pac.php?proxy=127.0.0.1:7890)：
                <Input value={upos.pacLink} onChange={e => updateUposValue('pacLink', e.target.value)}></Input>
              </div>
              <br />
              <Button onClick={handleSaveUposConfig} type="primary">{t("保存")}</Button>
            </div>
          </Card>
          <br />
          <Card title={t("自定义服务器设置")}>
            <div>
              <Form form={form} >
                <Form.Item
                  label={t("首选")}
                >
                  <Input
                    value={serverConfig.default}
                    type="text"
                    autoComplete="off"
                    onChange={e => updateServerValue('default', e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("大陆")}
                >
                  <Input
                    value={serverConfig.mainLand}
                    type="text"
                    autoComplete="off"
                    onChange={e => updateServerValue('mainLand', e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("香港")}
                >
                  <Input
                    value={serverConfig.hk}
                    type="text"
                    autoComplete="off"
                    onChange={e => updateServerValue('hk', e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("台湾")}
                >
                  <Input
                    value={serverConfig.tw}
                    type="text"
                    autoComplete="off"
                    onChange={e => updateServerValue('tw', e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("泰国/东南亚")}
                >
                  <Input
                    value={serverConfig.th}
                    type="text"
                    autoComplete="off"
                    onChange={e => updateServerValue('th', e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={saveServer}
                  >{t("保存")}</Button>
                  &nbsp;
                  <Button onClick={resetForm}>{t("重置")}</Button>
                </Form.Item>
              </Form>
            </div >
          </Card>
          <br />
          <div className="settings_content--item about-item">
            <h4 className="b_text mt_0">{t("关于哔哩漫游")}</h4>

          </div>
        </div>
      </div>
    </>
  )
}