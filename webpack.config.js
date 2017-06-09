const path = require('path');

module.exports = {
  entry: [
    './src/',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 7000,
  },
};
