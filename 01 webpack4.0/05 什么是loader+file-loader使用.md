1 预读文档

01 [webpack官方文档- 管理资源](https://webpack.docschina.org/guides/asset-management/)


2 Q: 为什么要引入 loader

A: 
S1 webpack默认只能识别 JS模块，无法识别其他资源模块 (如CSS/Img等资源)

S2 如果想在JS中引入+使用 非JS文件类型的模块，就需要使用loader对其进行预处理

S3 loader的引入，使得JS/webpack的 控制范围大大加强了


3 Q: 如何使用loader

A
S1 安装所依赖的loader

S2 在配置文件中 配置loader规则

S3 使用(引入) 非JS类型文件