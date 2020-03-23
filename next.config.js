const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@zeit/next-bundle-analyzer');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const envCi = require('env-ci');

const packageJson = require('./package.json');
const { definePlugin } = require('./utils/webpack-plugins');
const { VALID_LOCALES } = require('./constants');
const ENV = require('./utils/env');

const langs = VALID_LOCALES.join('|');

const { branch, commit } = envCi();
const { version } = packageJson;

const nextConfig = {
  webpack(config) {
    // HACK: https://github.com/zeit/next.js/issues/10339#issuecomment-596966509
    const rule = config.module.rules.find(r => Object.keys(r).includes('oneOf'));
    // Locate css-loader config for css modules
    rule.oneOf.forEach(r => {
      if (!Array.isArray(r.use)) {
        return;
      }
      if (!'test.module.scss'.match(r.test) && !'test.module.css'.match(r.test)) {
        return;
      }
      const cssLoader = r.use.find(u => u.loader.match('css-loader'));
      if (cssLoader) {
        cssLoader.options = {
          ...cssLoader.options,
          modules: {
            ...cssLoader.options.modules,
            // Fall back to default getLocalIdent function
            getLocalIdent: () => false,
            localIdentName: ENV === 'production' ? '[hash:base64:8]' : '[local]__[hash:base64:5]',
          },
        };
      }
    });

    config.plugins.push(
      ...[
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(langs)),
        definePlugin,
        new GenerateJsonPlugin('static/info.json', {
          env: ENV,
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
