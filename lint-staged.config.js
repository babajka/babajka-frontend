module.exports = {
  '**/*.js': ['npm run prettier', 'eslint --fix', 'git add'],
  '**/*.scss': ['npm run prettier-stylelint', 'git add'],
  '**/*.md': ['npm run prettier', 'git add'],
};
