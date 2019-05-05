# webpack介绍

目录

1 [预读文档](#1)

2 [模块化发展](#2)

3 [webpack作用](#3)


## <span id="1"> 1 预读文档 </span>

[01 webpack官方文档](https://www.webpackjs.com/concepts/)


## <span id="2"> 2 模块化发展 </span>

1 Q: 模块化发展过程是什么

A:
S1 开发方式1: index.html中引入单个JS文件 + JS代码 面向过程

缺点: 代码冗余众多 + 不便于定位bug维护代码 + JS文件内容众多

S2 开发方式2: index.html中引入多个JS文件 + JS代码 面向对象

优点: 功能之间互相分离，便于定位bug

缺点: 增加了HTTP请求数量 + 引入的多个JS之间存在严格的先后位置 依赖关系，不便于使用 + 模块之间暴露的接口不明确，需要进入模块中

查看具体代码才能得知


S3 开发方式3: index.html中引入单个/多个JS文件 + 模块化(ES6/commonJS/AMD/CMD...)

优点: 减少了JS请求 + 去除了位置依赖关系 + 依赖文件和暴露接口明确

缺点: 浏览器不能直接识别 模块化语句



## <span id="3"> 3 webpack作用 </span>

1 Q: webpack作用是什么

A:
S1 转义/翻译 浏览器暂不支持的JS 模块引入/导出语法

S2.1 是一个模块打包工具，可以把众多模块打包编译成 一个模块

S2.2 webpack不仅仅可以打包JS文件，它还可以打包CSS/SCSS/PNG/JPG等类型的文件，所以它是一个模块打包工具，而不仅仅是JS模块打包






