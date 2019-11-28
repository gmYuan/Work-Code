预读文档

01 [基于vue-cli搭建一个多页面应用(一)--基础结构搭建](https://github.com/tonyfree/blog/issues/1)


1 Q1: 如何搭建Vue多页面应用

A:

S1 调整页面结构: src下有: components/ modules/ pages文件夹，分别存放 公用组件/ 模块 / 页面
          
S2 有关页面的所有文件都放到同一文件夹下就近管理: index下文件包括: 
   index.html(页面模板) / main.js(页面入口文件,改成 index.js) / App.vue(页面使用的组件，公用组件放到components文件夹下)
   
   router文件夹(页面的路由配置) / assets文件夹(页面的静态资源)
   

S3 在build/utils.js中添加两个方法：webpack多入口文件 和 多页面输出

```JS
//S1 多页面配置依赖
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const merge = require('webpack-merge')


//S2 多入口配置
exports.entries = function() {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  let map = {}
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}


//S3 多页面输出配置
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      template: filePath,               // 模板html文件
      filename: filename + '.html',     // 打包生成的文件名
      chunks: [filename],               // 添加块内容
      inject: true                      // 保证assets下的资源文件引入
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        chunks: ['manifest', 'vendor', filename],
        minify: {                                     //压缩配置
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'   // 插件会按模块的依赖关系依次加载，即：manifest，vendor，本页面入口，其他页面入口..
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
```

S4 修改build/webpack.base.conf.js的入口配置
  
```JS
module.exports = {
  entry: utils.entries()
```

S5 修改build/webpack.dev.conf.js和build/webpack.prod.conf.js的多页面配置: 把原有的页面模板配置注释或删除，并把多页面配置添加到plugins
  
```JS 
// webpack.dev.conf.js：
  
  plugins: [
    ......
    //  new HtmlWebpackPlugin({
    //    filename: 'index.html',
    //    template: 'index.html',
    //    inject: true
    //  }),
     ......
    ].concat(utils.htmlPlugin())
    
    
   webpack.prod.conf.js：
   
   plugins: [
    ......
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency'
    // }),
    ......
  ].concat(utils.htmlPlugin())
```
