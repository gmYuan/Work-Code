# webpack作用

目录

1 [预读文档](#1)

2 [webpack作用](#2)

3 [webpack 常见含义](#3)


## <span id="1"> 1 预读文档 </span>

[01 webpack官方文档](https://www.webpackjs.com/concepts/)


## <span id="2"> 2 webpack作用 </span>

1 Q: webpack作用是什么

A:

S1 支持多种文件类型的模块化

S2 更加智能的打包工具，自动把模块分块

S3 webpack通过配置，可以把多个源文件打包成一个文件

S4 如果打包文件中含有浏览器不能直接识别的语言，就需要使用loaders来编译

S5 loaders是一个中间转化处理， 插件是对转化的结果进行优化


## <span id="3"> 3 webpack 常见含义 </span>

1 Q: webpack有哪些常见概念

A:
S1 entry: 配置webpack应该使用哪个模块，来作为 构建其内部依赖图的开始

S2 output: 配置打包后的文件路径等信息—— path/filename/library
