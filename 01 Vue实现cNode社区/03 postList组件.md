# postList组件

目录

1 [postList组件介绍](#1)

2 [如何实现 页面加载动画](#2)

3 [如何获取 后台数据](#3)

4 [根据后台保存数据 渲染页面](#4)

5 [如何根据不同返回值，渲染不同文本](#5)



## <span id="1"> 1 postList组件介绍 </span>

1 Q: 如何实现 postList组件

A: S1 获取到后台返回JSON数据的API(官网提供)，查看其数据含义:

S1.1 data.author.avatar_url: 发帖人头像

S1.2 data.reply_count/data.visit_count:  回复数/浏览数

S1.3 data.top: 是否置顶;   data.good: 是否精华帖;   data.tab: share/ask/job 其他普通分类

S1.4 data.title: 帖子名称

S1.5 data.last_reply_at: 最后回帖时间， 需要通过过滤器转化显示


S2 页面加载动画

S3 获取后台数据 + 保存数据到本地data中

S4 假数据CSS样式 + 根据本地实际后台数据，渲染页面显示



## <span id="2"> 2 如何实现 页面加载动画 </span>

1 Q: 如何实现 页面加载动画

A: S1 v-if + 布尔变量isloading

S2 当页面加载完成前(生命周期钩子)，isloading变为真

S3 当get请求获取到数据后，isloading变为假




## <span id="4"> 4 根据后台保存数据 渲染页面 </span>

1 Q: 如何根据后台保存数据 渲染页面

A: S1 v-for遍历本地后台数据，遍历显示

S2 根据之前写好的页面HTML结构，动态绑定属性值 + 填入后台数据到前端页面


## <span id="5"> 5 如何根据不同返回值，渲染不同文本 </span>

1 Q: 如何根据不同后台返回值，渲染不同文本

A: S1 在入口文件main.js中设置全局过滤器，把数据对象传入

S2 根据不同的值，返回不同的文本即可

S3 根据不同结果，绑定不同样式: 动态绑定即可
