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
        'edit-article',
        'auth',
        'tools',
        'diary',
        'utils',
        'i18n',
        'main',
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
