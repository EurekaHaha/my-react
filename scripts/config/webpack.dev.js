const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../constant');
console.log(SERVER_PORT, SERVER_HOST);

module.exports = merge(common, {
  /**
   * https://webpack.js.org/configuration/mode/#root
   */
  mode: 'development',
  /**
   * https://webpack.docschina.org/configuration/devtool/  中文
   * https://webpack.js.org/configuration/devtool/
   * devtool source-map设置
   */
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    stats: 'errors-only', // 终端只打印error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
});
