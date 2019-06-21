const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');  //打包之前清除上次的dist

module.exports = { 

  // 代码分离配置内容
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
 
  //S2 entry默认值为 ./src,具体语法见官方文档
  entry: {
    app: './src/index.js'
  },

  //S3 path为绝对路径，可以通过node的path实现拼接
  // 具体语法参考文档链接:
  // [path.resolve的通俗解释](http://javascript.ruanyifeng.com/nodejs/path.html#toc1)
  // [__dirname含义](http://nodejs.cn/api/modules.html#modules_dirname)
 
  output: {
    chunkFilename: '[name].dist.js',
    filename: '[name].dist.js',     //定义 打包文件名称
    path: path.resolve(__dirname, '../dist')  //定义 打包文件所在的文件夹绝对路径
  },

  // 配置loader
  module: {
    rules: [
      // 配置css-loader，以自动实现热更新内容检测
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader'
        ]
      },
      // 配置babel-loader,以让webpack可以支持babel接入
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // 配置url-loader，进行图片处理
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240   //小于10k的图片直接打包成base64,否则使用file-loader
          }
        }
      },
      // 配置file-loader，处理字体文件 
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      // 配置sass-loader，处理scss文件
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]  //对应use
      }
      
    ]
  },
    
  //配置插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'Code Splitting'
    }),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../dist')
    })

  ]

}