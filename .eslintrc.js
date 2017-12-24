module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  globals: {},
  env: {
    browser: true,
  },
  rules: {
    // prettier overrides
    'prettier/prettier': 'error',

    // we use bind
    'react/jsx-no-bind': 0,
    // we use only .js extension
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    // allow console.error & console.warning
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
