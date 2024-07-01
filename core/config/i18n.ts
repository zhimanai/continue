import i18next from 'i18next';
import enTranslation from '../i18n/en/default.json';
import zhTranslation from '../i18n/zh/default.json';

const newInstance = i18next.createInstance({
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

export const $t = newInstance.t;