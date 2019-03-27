# Article组件

目录

1 [Article组件介绍](#1)

2 [点击列表页标题，跳转到Article组件](#2)

3 [帖子详情页静态样式显示](#3)



## <span id="1"> 1 Article组件介绍 </span>

1 Q: Article组件有哪些功能

A: S1 点击列表页标题，跳转到Article组件

S2 Article组件静态样式实现


S3.1 Article组件— header部分

S3.2 Article组件— mian主体部分

S3.3 Article组件— 评论显示部分




## <span id="2"> 2 点击列表页标题，跳转到Article组件 </span>

1 Q: 如何实现 点击列表页标题，跳转到Article组件

A: S1 引入vue-router插件 + 注册插件 + 实例化路由并导出 + 挂载到vue实例(vue-cli自动完成)


S2.1 配置路由: {路由名称:xxx, 路由路径: xxxx, 路径对应跳转组件: xxx} + 导入要跳转组件

S2.2 路由路径可以配置参数:  路径xxx/:yyy (参数变量名称)

S2.3 一个路由内部有多个组件时，可以给路由内组件命名,此时是components而非 component


S3.1 把路由对应的组件渲染到页面上: router-view

S4.1 设置链接跳转，把a链接替换为 router-link，里面的to属性，可以设置跳转的路由名称+传参

S4.2 详情页的组件，可以传入post.id传入



## <span id="3"> 3 帖子详情页静态样式显示 </span>

1 Q: 页面结构 和样式设置 是什么

A: S1 三栏布局: header / main / footer(区分的方法是看 bg背景色)

S2 main里面是一个左右2栏布局: .content / .aside，（区分方法是margin相同的为一栏）

   main设置: min-height + min-height + [width & margin ], 以容纳主内容+区分footer


S3 .content内是 一个上下2栏布局: .post-content / .review
   
   .content设置: margin， 以间隔开 .aside部分


S4.1 .post-content包括: .title + .txt

  .post-content设置: margin，以间隔开 .review部分 + 背景色/圆角样式


S4.2 .review包括: .title + .zan + .txt