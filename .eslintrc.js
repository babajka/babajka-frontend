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
    'react/jsx-no-bind': 'off',
    // we use only .js extension
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    // allow create components without prop-types check
    'react/prop-types': ['error', { skipUndeclared: true }],
    // allow console.error & console.warning
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // next.js require to use <a></a> tag without ref inside Link. it conflicts with this rule
    // see https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/402
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
