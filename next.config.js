/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const webpack = require('webpack');

const { definePlugin } = require('./utils/webpack-plugins');
const { LOCALES } = require('./constants');

const langs = Object.keys(LOCALES).join('|');

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.plugins.push(
      ...[
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(langs)),
        definePlugin,
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
