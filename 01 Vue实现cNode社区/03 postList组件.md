# postList组件

目录

1 [postList组件介绍](#1)

2 [如何实现 页面加载动画](#2)

3 [如何获取 后台数据](#3)


## <span id="1"> 1 postList组件介绍 </span>

1 Q: 如何实现 postList组件

A: S1 获取到后台返回JSON数据的API(官网提供)，查看其数据含义:

S1.1 data.author.avatar_url: 发帖人头像

S1.2 data.reply_count/data.visit_count:  回复数/浏览数

S1.3 data.top: 是否置顶;   data.good: 是否精华帖;   data.tab: share/ask/job 其他普通分类

S1.4 data.title: 帖子名称

S1.5 data.last_reply_at: 最后回帖时间， 需要通过过滤器转化显示


S2 页面加载动画


## <span id="2"> 2 如何实现 页面加载动画 </span>

1 Q: 如何实现 页面加载动画

A: S1 v-if + 布尔变量isloading



## <span id="3"> 3 如何获取 后台数据</span>

1 Q: 如何获取 后台数据

A: S1 安装axios: npm i axios

S2 入口文件main.js引入aixos + 挂载到Vue.prototype上

S3.1 在postList内定义 getDate()方法，通过this.$http发送请求，注意axios支持Promise语法

S3.2 axios的get方法支持第2个参数，用以传入查询参数对象