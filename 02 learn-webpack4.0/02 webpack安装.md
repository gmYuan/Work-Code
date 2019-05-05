# webpack安装

目录

1 [预读文档](#1)

2 [webpack按照步骤](#2)


## <span id="1"> 1 预读文档 </span>

[01 package.json文件](https://javascript.ruanyifeng.com/nodejs/packagejson.html)

阅读原因: 简要介绍了package.json文件的作用和各个属性含义

[02 npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

阅读原因: 介绍了npm scripts的作用和具体语法

[03 webpack官方文档](https://www.webpackjs.com/guides/getting-started/)

阅读原因: 指南— 起步部分


## <span id="2"> 2 webpack按照步骤 </span>

1 Q: webpack按照步骤 是什么

A:
S1 安装node (webpack依赖于node)

S2 mkdir 项目名称

S3 npm init: 生成package.json文件， 定义了 项目的相关信息和 所需模块

S4 安装webpack: 

  删除全局: `npm uninstall webpack webpack-cli -g`

  局部安装: `npm install  webpack webpack-cli --save-dev`


S5 查看项目下 webpack的版本号: `npx webpack -v` (npx会在本地项目结构中查找webpack版本号)

S6 把入口脚本(默认为— src/index.js文件)，默认打包 输出为 main.js:  `npx webpack`