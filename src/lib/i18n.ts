import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from '~/locales/en-US';
import zhCN from '~/locales/zh-CN';

const resources = {
  en: {
    translation: enUS,
  },
  zh: {
    translation: zhCN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  export default i18n;
