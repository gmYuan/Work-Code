const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

const webpack = require('webpack');    //S3 引入webpack,以便后面使用其HMR的插件


module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',    // 开启错误映射
  devServer: {                     // 开启开发环境服务器
    contentBase: './dist',         // 监听的内容文件夹
    port: 8089,
    open: 'Google Chrome',

    // S3.1 开启热更新
    hot: true,
    hotOnly: true,    // 如果热更新开启失败，devServer 也不会自动刷新页面
  },

  
  plugins: [
    new webpack.HotModuleReplacementPlugin()   // S3.2 模块热更新插件

  ],

});








module.exports = {
  

 

  
 


}