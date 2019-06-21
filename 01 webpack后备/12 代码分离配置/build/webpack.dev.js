
const merge = require('webpack-merge')  //引入merge
const commonConfig = require('./webpack.common.js')  // 引入公有配置文件

const webpack = require('webpack')   // 引入webpack,从而使用内置的 热更新插件

// 开发环境的配置
const devConfig = { 
  //mode,配置打包出的文件是否压缩空白行
  mode: 'development',

  // 设置souceMap
  devtool: 'cheap-module-inline-source-map',

  // 设置dev-server
  devServer: {
    contentBase: './dist',     //服务器查找文件的路径
    open: true,                //打包后自动新开一个页面
    hot: true,                 //开启热更新
    hotOnly: true              //如果热更新失败，不会自动刷新页面
  },

  // 设置tree shaking
  optimization: {
    usedExports: true
  },

  //配置插件
  plugins: [
    //实例化热更新的插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]

}

module.exports = merge(commonConfig, devConfig)