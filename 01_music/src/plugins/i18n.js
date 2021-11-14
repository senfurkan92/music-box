import { createI18n } from 'vue-i18n';
import en from '../locales/en';
import tr from '../locales/tr';

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    tr,
  },
  globalInjection: true,
});
