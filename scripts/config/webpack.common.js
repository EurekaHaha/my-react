const { resolve } = require('path');
const { isDev, PROJECT_PATH, PROJECT_NAME } = require('../constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    // https://github.com/webpack-contrib/css-loader
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders, // 在csslodaer前使用的loader数量 less sass之类的需要在css-loader前使用
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        /**
         * 修复一些和 flex 布局相关的 bug
         * https://github.com/luisrudge/postcss-flexbugs-fixes
         */
        require('postcss-flexbugs-fixes'),
        /**
         * 将最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题。我们使用autoprefixer来自动添加浏览器头。
         * https://github.com/csstools/postcss-preset-env
         */
        require('postcss-preset-env')({
          autoprefixer: {
            grid: true,
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        // require('postcss-normalize'), 从 browserslist 中自动导入所需要的 normalize.css 内容。 感觉没啥用
      ],
      sourceMap: isDev,
    },
  },
];

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
        use: getCssLoaders(1),
      },
      {
        test: /\.less/,
        use: getCssLoaders(2),
      },
    ],
  },
};
