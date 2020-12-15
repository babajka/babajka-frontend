const withPlugins = require('next-compose-plugins');
const getBundleAnalyzer = require('@next/bundle-analyzer');

const ENV = require('./utils/env');

const nextConfig = {
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

const withBundleAnalyzer = getBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
