module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react-hooks'],
  env: {
    browser: true,
  },
  rules: {
    // prettier overrides
    'prettier/prettier': 'error',

    // we use named export in utils
    'import/prefer-default-export': 'off',
    // to find unused code:
    // 'import/no-unused-modules': ['error', { unusedExports: true }],

    // we use bind
    'react/jsx-no-bind': 'off',
    // we use only .js extension
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    // weird rule
    'react/jsx-one-expression-per-line': 'off',
    // temporary disable prop-types check
    'react/prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',

    // react-hooks
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    // allow console.error & console.warning
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // backend use `_id` prop
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // we use '_' placeholder, for example in array desctruction:  [_, second] = arr
    'no-unused-vars': ['error', { varsIgnorePattern: '^_+', argsIgnorePattern: '^_+' }],
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
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Checkbox'],
      },
    ],
    // this rule was deprecated in `v6.1.0` and will no longer be maintained
    'jsx-a11y/label-has-for': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
