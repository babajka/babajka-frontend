const ENV = require('./utils/env');

module.exports = {
  env: {
    isProd: ENV === 'production',
    isStaging: ENV === 'staging',
  },
  // i18n: {
  //   locales: ['be', 'ru', 'en'],
  //   defaultLocale: 'be',
  //   localeDetection: false,
  // },
};
