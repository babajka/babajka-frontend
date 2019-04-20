const withPlugins = require('next-compose-plugins');
const fonts = require('next-fonts');
const sass = require('@zeit/next-sass');
const bundleAnalyzer = require('@zeit/next-bundle-analyzer');
const webpack = require('webpack');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const envCi = require('env-ci');

const packageJson = require('./package.json');
const { definePlugin } = require('./utils/webpack-plugins');
const { VALID_LOCALES } = require('./constants');

const langs = VALID_LOCALES.join('|');

const { branch, commit } = envCi();
const { version } = packageJson;

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      ...[
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(langs)),
        definePlugin,
        new GenerateJsonPlugin('static/info.json', {
          version,
          commit,
          branch,
        }),
      ]
    );
    return config;
  },
};

const plugins = [
  [fonts, { enableSvg: true }],

  [
    sass,
    {
      sassLoaderOptions: {
        includePaths: [
          'styles/node_modules/bulma',
          'styles/node_modules/bulma-badge/dist/css/',
          'styles/node_modules/font-awesome/scss',
        ],
      },
    },
  ],

  [
    bundleAnalyzer,
    {
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
    },
  ],
];

module.exports = withPlugins(plugins, nextConfig);
