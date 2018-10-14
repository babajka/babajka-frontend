const { definePlugin } = require('../webpack-plugins');

module.exports = function(storybookBaseConfig, env, defaultConfig) {
  defaultConfig.plugins.push(definePlugin);
  return defaultConfig;
};
