/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

const packageJson = require('./package.json');

const ENV = process.env.WIR_ENV || process.env.NODE_ENV || 'not-set';
const definePlugin = new webpack.DefinePlugin({
  __ENV__: ENV,
  __VERSION__: JSON.stringify(packageJson.version),
  __PROD__: ENV === 'production',
  __STAGING__: ENV === 'staging',
  __DEV__: ENV === 'development',
  __TESTING__: ENV === 'testing',
  __DEBUG_STYLES__: process.env.DEBUG_STYLES === 'true',
});

module.exports = { definePlugin };
