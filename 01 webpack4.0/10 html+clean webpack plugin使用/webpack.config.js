const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');  // S2 引入插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  // 注意引入写法



module.exports = {
  mode: 'production',

  entry: {
    app:   './src/index.js',    // S1 多入口文件
    print: './src/print.js'
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
      title: '管理输出',
      template: 'src/index.html',    // S2 配置插件

    }),


  ],


}