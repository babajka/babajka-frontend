module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        '*',
        'server',
        'core',
        'common',
        'about',
        'article',
        'auth',
        'tools',
        'utils',
        'i18n',
        'home',
        'layout',
      ],
    ],
    'scope-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['fix', 'style', 'feat', 'chore', 'task', 'major', 'merge', 'temp', 'refactor'],
    ],
  },
};
