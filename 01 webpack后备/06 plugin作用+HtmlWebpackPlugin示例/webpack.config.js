const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');  //打包之前清除上次的dist


// S1 暴露出模块输出对象
module.exports = { 

  //S2 entry默认值为 ./src,具体语法见官方文档
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },

  //S3 path为绝对路径，可以通过node的path实现拼接
  // 具体语法参考文档链接:
  // [path.resolve的通俗解释](http://javascript.ruanyifeng.com/nodejs/path.html#toc1)
  // [__dirname含义](http://nodejs.cn/api/modules.html#modules_dirname)
 
  output: {
    filename: '[name].dist.js',     //定义 打包文件名称
    path: path.resolve(__dirname, './dist')  //定义 打包文件所在的文件夹绝对路径
  },


  //配置插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  
  ],


  //mode
  mode: 'development'
}