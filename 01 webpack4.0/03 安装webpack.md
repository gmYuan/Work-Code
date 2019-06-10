1 预读文档

01 [webpack官方文档- 起步](https://webpack.docschina.org/guides/getting-started/)


2 Q: 如何安装webpack

A:

S1.1 `npm init -y`: 初始化包管理，生成package.json文件

S1.2 设置package.json文件: 安装包private化 + 移除 main 入口(防止意外发布代码)

S2 `npm install webpack webpack-cli --save-dev`: 局部安装webpack,可以在不同项目中使用不同版本的webpack

S3 `npx webpack ....`: 查询/运行 本地webpack

