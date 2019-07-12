const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

module.exports = merge(base, {
  mode: 'production',

  devtool: 'cheap-module-source-map',    // 开启错误映射

  // optimization: {        // S4 开启tree shaking功能,开发环境中会自动使用
  //   usedExports: true
  // },

})