1 预读文档

01 [webpack官方文档- 起步](https://webpack.docschina.org/guides/getting-started/)


2 Q: 为什么要引入 webpack.config.js配置文件

A:
S1 默认的打包机制不够透明化(是一个黑盒)，而且不是定制化的(无法满足具体项目的特殊需求)

S1.2 通过配置文件，我们可以自定义 入口文件/出口等，便于定制化，也便于webpack的自动查询和执行


3 Q: 如何设置 webpack.config.js文件

A:
S1 新建配置文件: webpack.config.js文件

S2 按规则书写对应内容(entry, output等)

S3 按配置文件打包:  `npx webpack --config [webpack.config.js 配置文件名]`




4 Q: 如何简化文件打包的命令:

A:
S1 每次都写 `npx webpack --config ...`来执行打包命令很冗长

S2 可以在package.json文件中，添加一个 npm命令
