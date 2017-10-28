module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(css)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    }, {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader'],
    });
    return config;
  },
};
