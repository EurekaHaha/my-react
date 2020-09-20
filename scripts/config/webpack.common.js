const { resolve } = require('path');
const { isDev, PROJECT_PATH, PROJECT_NAME } = require('../constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(PROJECT_NAME, PROJECT_PATH, HtmlWebpackPlugin);

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/app.js'),
    // app: path.resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_NAME, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false,
    }),
  ],
};
