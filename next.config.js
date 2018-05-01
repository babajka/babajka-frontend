/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StatsPlugin = require('stats-webpack-plugin');

const { ANALYZE } = process.env;

module.exports = {
  webpack(config, { isServer }) {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
      config.profile = true; // eslint-disable-line no-param-reassign
      config.plugins.push(
        new StatsPlugin('stats.json', {
          timings: true,
          assets: true,
          chunks: true,
          chunkModules: true,
          modules: true,
          children: true,
          cached: true,
          reasons: true,
        })
      );
    }

    return config;
  },
};
