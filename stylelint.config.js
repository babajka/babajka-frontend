/**
 * Default configuration to lint
 * the airbnb css style-guide.
 * This file is taken from a pull request to Airbnb/css repo
 * which intends to create a default preset that can be used
 * in the future. Until it is merged, we will have the config here.
 * https://github.com/airbnb/css/pull/23
 * Add more rules: http://stylelint.io/user-guide/rules/
 * Also, to understand better who the rules are named:
 * http://stylelint.io/user-guide/about-rules/
 * For an extended sample of config, check this out
 * http://stylelint.io/user-guide/example-config/
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    './node_modules/prettier-stylelint/config.js',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    /* ==========================================================================
       Airbnb config
       ========================================================================== */

    // CSS formatting
    'selector-max-id': 0,
    indentation: 2,
    'selector-list-comma-newline-after': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'block-opening-brace-space-before': 'always',
    'declaration-block-single-line-max-declarations': 1,

    // Comments
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands'],
      },
    ],

    // Border
    'declaration-property-value-blacklist': {
      '/^border/': ['none'],
    },

    // SASS
    // All @includes after properties
    // Nested selectors after properties

    // Variables dash-dashed
    // This regexp matches:
    // $button-text-background-color--hover-hola
    // regex under construction
    // 'scss/dollar-variable-pattern': '\b[a-z]+(?:-)+(\b[a-z]+(?:-))*',

    // forbid extend
    'at-rule-blacklist': ['extend'],

    // Nesting depth
    'max-nesting-depth': 3,

    /* ==========================================================================
       Best practices
       ========================================================================== */
    // Specificity
    // To learn more about this:
    // http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/
    // "id,class,type",
    // selector-max-specificity
    'declaration-no-important': true,
    'selector-max-compound-selectors': 3,
    'selector-no-qualifying-type': true,

    // Selectors
    'no-duplicate-selectors': true,

    // Blocks
    'block-no-empty': true,
    'at-rule-empty-line-before': [
      'always',
      {
        // Allow mixins to have an empty line before
        ignoreAtRules: ['import', 'first-nested'],
      },
    ],
    // More styling rules for more consistency
    'at-rule-name-case': 'lower',

    // Colors
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,

    // strings
    'string-quotes': 'single',

    // Values
    // Disallow vendor prefix, they are added by autoprefixer
    'value-no-vendor-prefix': true,
    'value-list-comma-space-after': 'always-single-line',

    // Disallows margin: 1px 1px 1px 1px;
    'shorthand-property-no-redundant-values': true,

    // Comments
    'comment-whitespace-inside': 'always',

    // Functions
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',

    // Numbers
    // unitless zero and no trailing zeros
    'length-zero-no-unit': true,
    'number-no-trailing-zeros': true,

    // Syntax
    'declaration-block-trailing-semicolon': 'always',

    // Declaration blocks
    'declaration-block-no-duplicate-properties': true,

    // Prevents adding unnecesary Specificity or complicated sass stuff
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
