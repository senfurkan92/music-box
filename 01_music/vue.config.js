module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableLegacy: false,
    },
  },
  pwa: {
    name: 'Music App',
    themeColor: '#ff5e3a',
    manifestOptions: {
      short_name: 'Music',
    },
  },
};
