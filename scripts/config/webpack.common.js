const { resolve } = require('path');
const { isDev, PROJECT_PATH, PROJECT_NAME } = require('../constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(PROJECT_NAME, PROJECT_PATH, HtmlWebpackPlugin);

module.exports = {
  // 入口
  entry: {
    app: resolve(PROJECT_PATH, './src/app.js'),
    // app: path.resolve(PROJECT_PATH, './src/app.js'),
  },
  // 出口
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_NAME, '../dist'),
  },
  // 插件
  plugins: [
    // 将打包的js自动引入到html中的插件
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        /**
         * use有几种写法
         * 1. 只用一个的话可以是一个字符串， use: 'style-loader'
         * 2. 使用多个不配置的loader可以是一个数组 use: ['style-loader', 'css-loader']
         * 3. 数组既可以是字符串也可以是一个用于配置的object
         *
         */
        use: [
          'style-loader',
          {
            // https://github.com/webpack-contrib/css-loader
            loader: 'css-loader',
            options: {
              module: false,
              sourceMap: isDev,
              importLoaders: 0, // 在csslodaer前使用的loader数量 less sass之类的需要在css-loader前使用
            },
          },
        ],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被less-loader处理
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
};
