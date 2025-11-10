import { Card, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store";

import { createLogger } from "../../../../common/log";
import { changeLanguage } from "../../store/storage";

const log = createLogger('LanguageSetting')
export default function LanguageSetting() {
  const { t } = useTranslation();
  const dispatcher = useDispatch()
  const language = useSelector<RootState, string>(store => store.storage.lang)

  log.info('render', language)
  
  const updateLanguage = (lang: string) => {
    dispatcher(changeLanguage(lang))
  }
  return (
    <>
      <Card title={t("语言设定")}>
        <Select
          value={language}
          style={{ width: '150px' }}
          onChange={updateLanguage}
          options={[
            {
              label: '中文',
              value: 'zhCn'
            },
            {
              label: 'English',
              value: 'en'
            }
          ]}
        >
        </Select>
      </Card>
    </>
  )
}
