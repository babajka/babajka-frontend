/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const webpack = require('webpack');

const packageJson = require('./package.json');
const { LOCALES } = require('./constants');

const langs = Object.keys(LOCALES).join('|');

const ENV = process.env.WIR_ENV || process.env.NODE_ENV || 'not-set';

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.plugins.push(
      ...[
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(langs)),
        new webpack.DefinePlugin({
          __ENV__: ENV,
          __VERSION__: JSON.stringify(packageJson.version),
          __PROD__: ENV === 'production',
          __STAGING__: ENV === 'staging',
          __DEV__: ENV === 'development',
          __TESTING__: ENV === 'testing',
          __DEBUG_STYLES__: process.env.DEBUG_STYLES === 'true',
        }),
      ]
    );
    return config;
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../reports/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../reports/client.html',
    },
  },
});
