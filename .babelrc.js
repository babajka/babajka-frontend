module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
      },
    ],
    '@babel/plugin-proposal-export-default-from',
  ],
};
