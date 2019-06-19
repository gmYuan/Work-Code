1 预读文档

01 [webpack官方文档- 起步](https://webpack.docschina.org/guides/getting-started/)


2 Q: 如何安装webpack

A:

S1.1 `npm init -y`: 初始化包管理，生成package.json文件

S1.2 设置package.json文件: 安装包private化 + 移除 main 入口(防止意外发布代码)

S2 `npm install webpack webpack-cli --save-dev`: 局部安装webpack,可以在不同项目中使用不同版本的webpack

S3 `npx webpack ....`: 查询/运行 本地webpack


3 Q: 如何使用webpack进行打包

A:

S1 调整项目结构: dist/index.html + src/index.js

S2 用npm安装项目 所需依赖包: `npm i xxx包名 --save [-D]`

S3 在需要使用该包的文件中引入它，以明确依赖关系+避免全局变量污染: `import xxx from 'xxx'`

S4 在index.html中，引入打包后的文件

S5 执行打包命令，生成打包文件:  `npx webpack`

