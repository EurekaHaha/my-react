const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    /**
     * 打包之前清除dist
     */
    new CleanWebpackPlugin(),
  ],
});
