const ENV = require('./utils/env');

module.exports = {
  env: {
    isProd: ENV === 'production',
    isStaging: ENV === 'staging',
    isDev: ENV === 'development',
  },
  // i18n: {
  //   locales: ['be', 'ru', 'en'],
  //   defaultLocale: 'be',
  //   localeDetection: false,
  // },
};
