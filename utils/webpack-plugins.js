const webpack = require('webpack');

const ENV = require('./env');
const packageJson = require('../package.json');

const definePlugin = new webpack.DefinePlugin({
  __ENV__: JSON.stringify(ENV),
  __VERSION__: JSON.stringify(packageJson.version),
  __PROD__: ENV === 'production',
  __STAGING__: ENV === 'staging',
  __DEV__: ENV === 'development',
  __TESTING__: ENV === 'testing',
});

module.exports = { definePlugin };
