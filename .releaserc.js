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
      path: '@semantic-release/exec',
      cmd: 'npm run prettier CHANGELOG.md',
    },
    {
      path: '@semantic-release/npm',
      npmPublish: false,
      tarballDir: '.next',
    },
    {
      path: '@semantic-release/git',
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: '${nextRelease.version} release [skip ci]',
    },
  ],
  publish: [
    {
      path: '@semantic-release/github',
      assets: '.next/*.tgz',
    },
  ],
  success: ['@semantic-release/github'],
  fail: ['@semantic-release/github'],
};
