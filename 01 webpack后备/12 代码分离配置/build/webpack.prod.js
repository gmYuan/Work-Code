
const merge = require('webpack-merge')  //引入merge
const commonConfig = require('./webpack.common.js')  // 引入公有配置文件

const prodConfig = { 
  //mode,配置打包出的文件是否压缩空白行
  mode: 'production',

  // 设置souceMap
  devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, prodConfig)