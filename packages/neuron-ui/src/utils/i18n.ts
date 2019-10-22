import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocale } from 'services/remote'

import zh from 'locales/zh.json'
import en from 'locales/en.json'
import agreementUs from 'locales/agreement-us.json'
import agreementNonUs from 'locales/agreement-non-us.json'

const locale = getLocale()
const lng = ['zh', 'zh-CN'].includes(locale) ? 'zh' : 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, ...agreementUs, ...agreementNonUs } },
    zh: { translation: { ...zh, ...agreementUs, ...agreementNonUs } },
  },
  fallbackLng: lng,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
