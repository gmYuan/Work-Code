
1 Q: 如何在项目中使用iconfont图标

A:
S1 在iconfont中加入图标到购物车—— 加入项目—— 下载到本地


S2.1 把字体文件(新建一个文件夹)放入到 src/assets目录下

S2.2 把iconfont.css文件加入到 scss目录下，并修改文件内的字体引用路径


S3 因为可能有多个页面都要使用图标，所以在main.js中引入 iconfont.css

S4 在组件中，使用图标的对应 class名称/在线生成代码 使用它