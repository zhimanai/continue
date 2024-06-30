import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './i18n/en/default.json';
import zhTranslation from './i18n/zh/default.json';

i18next.use(initReactI18next).init({
  lng: 'zh', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: enTranslation,
    },
    zh: {
      translation: zhTranslation,
    },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});

declare global {
  var t: (string, ...vars) => string;
}

window.t = i18next.t;

export default i18next;
