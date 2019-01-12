const path = require('path');

const { definePlugin } = require('../utils/webpack-plugins');

module.exports = function(storybookBaseConfig, env, defaultConfig) {
  defaultConfig.plugins.push(definePlugin);
  defaultConfig.module.rules.push(
    ...[
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                'styles/node_modules/bulma',
                'styles/node_modules/bulma-badge/dist/css/',
                'styles/node_modules/font-awesome/scss',
              ],
            },
          },
        ],
        include: path.resolve(__dirname, '../styles'),
      },
    ]
  );
  return defaultConfig;
};
