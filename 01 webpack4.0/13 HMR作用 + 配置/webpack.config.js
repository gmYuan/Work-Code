const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');  // S2 引入插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  // 注意引入的写法


const webpack = require('webpack');    //S3 引入webpack,以便后面使用其HMR的插件



module.exports = {
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



  entry: {
    app:   './src/index.js',    // S1 多入口文件
    // print: './src/print.js'
  },


  output: {
    filename: '[name].bundle.js',   // S1 生成对应的多个打包文件
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,   // 让CSS文件中通过@import引入的其他文件也使用后2个loader处理
              // modules: true,     // 开启CSS文件的局部作用域
            },
          },
          'sass-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]_[hash:4]',
            outputPath: 'images',
            limit: 25000,
          },
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader']
      },
         

      
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: '模块热替换',
      template: 'src/index.html',    // S2 配置插件
    }),

    new webpack.HotModuleReplacementPlugin()   // S3.2 模块热更新插件


  ],


}