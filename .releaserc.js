module.exports = {
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  analyzeCommits: {
    preset: 'angular',
    releaseRules: [
      { type: 'major', release: 'major' },
      { type: 'feat', release: 'minor' },
      { type: 'fix', release: 'patch' },
      { type: 'style', release: 'patch' },
    ],
  },
  prepare: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/git',
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: '${nextRelease.version} release [skip ci]',
    },
  ],
};
