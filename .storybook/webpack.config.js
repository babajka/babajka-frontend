const path = require('path');

const { definePlugin, sassLoaderOptions } = require('../utils/webpack-plugins');

module.exports = ({ config }) => ({
  ...config,
  plugins: [...config.plugins, definePlugin],
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: sassLoaderOptions,
          },
        ],
        include: path.resolve(__dirname, '../styles'),
      },
    ],
  },
});
