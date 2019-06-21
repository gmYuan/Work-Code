const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');  //打包之前清除上次的dist

const webpack = require('webpack')   // 引入webpack,从而使用内置第热更新插件



// S1 暴露出模块输出对象
module.exports = { 

  //S2 entry默认值为 ./src,具体语法见官方文档
  entry: {
    app: './src/index.js',
  },

  // 设置souceMap
  devtool: 'cheap-module-inline-source-map',

  // 设置dev-server
  devServer: {
    contentBase: './dist',     //服务器查找文件的路径
    open: true,                //打包后自动新开一个页面

    hot: true,                 //开启热更新
    hotOnly: true              //如果热更新失败，不会自动刷新页面
  },


  //S3 path为绝对路径，可以通过node的path实现拼接
  // 具体语法参考文档链接:
  // [path.resolve的通俗解释](http://javascript.ruanyifeng.com/nodejs/path.html#toc1)
  // [__dirname含义](http://nodejs.cn/api/modules.html#modules_dirname)
 
  output: {
    filename: '[name].dist.js',     //定义 打包文件名称
    path: path.resolve(__dirname, './dist')  //定义 打包文件所在的文件夹绝对路径
  },

  // 配置loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader'
        ]
      }
    ]
  },
    
  //配置插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),

    //实例化热更新的插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  
  ],


  //mode
  mode: 'development'
}