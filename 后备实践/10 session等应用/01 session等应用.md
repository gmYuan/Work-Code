# 前后端交互之 session等应用

## 前言

用一个实现登录注册的小实践项目，来学习前后端之间如何交互，本篇主要是关于 如何设置session/localstorage/cache-control等

目录

1 [实现思路](#1)

2 [具体实现](#2)


## <span id="1">一 实现思路</span>

1 Q: 如何设置session

A: session = cookie + 哈希对象

S1 cookie中如果直接存用户信息的明文，会容易被用户篡改从而产生安全问题，因此cookie中应该存一个随机数sessionId

S2 创建一个session空的 哈希对象，当验证登录信息正确时，把 sessionId:用户信息 存入session中

!!!!注意:

session要是一个全局变量，不要放到一个函数里变成局部变量！！！


S3 这样当访问同源其他网页时，客户端就会带上cookie-seesionId信息，此时读取sesssionId相关联的 用户信息即可

注意后台重启时会释放内存sessions,所以要使用if判断


2 Q: 如何实现进入页面显示一次弹窗后，之后刷新页面都不会再次显示弹窗

A: 使用localstorage进行持久化存储

S1 获取localstorage里的变量

S2 对变量进行判断，如果不存在则初始化变量 + 设置localstorage值；存在则什么都不做


3 Q: 什么是cache-control,有什么作用 + 如何设置它 + 如何更新缓存资源

A: 后端返回的HTTP响应头

S1.1 当某个资源文件设置cache-control后，会在一段指定时间内容(通常是1~10年)设置该文件资源的本地缓存，

因此从第二次访问开始，只要资源请求的url不变，就不会向服务器发出请求，而是从本地获取文件内容，从而提高性能

S1.2 一般情况下，首页不能设置缓存，因为如果首页设置了，则所有资源都不能更新了(缺少发起网络请求的入口)


S2 设置cache-control响应头步骤

&emsp;&emsp;(1) default.css/main.js 文件要较大，这样才能好观察网络时间的 缓存前后区别

&emsp;&emsp;(2) 设置default.css/main.js的后端路由，返回文件内容

&emsp;&emsp;(3) 设置js文件 cache-control响应头: `response.setHeader('Cache-Control', 'max-age=30000000')`


S3 跟新被设置缓存的资源步骤

&emsp;&emsp;(1) 因为只有当资源请求url相同时，Cache-Control才会生效，所以只要更改 资源请求url版本号参数 即可

即 `<script src="./js/main.js?v2.0"></script>`


4 Q: 什么是expires + 如何设置它 

A: S1 基本同 cache-control，只不过时间格式变成了，而且是本地客户端时间，因此不靠谱(用户可以自己更改本地时间)

S2 设置格式参考MDN即可，暂略



5 Q: 什么是md5 + 什么是ETag + 如何利用ETag判断 是否下载资源内容

A: S1 md5是一种文本摘要算法，它可以验证 传输的文件内容是否正确和完整(把文件内容转化为一串 数字字符串)

S2 ETag是HTTP的一个响应头，用来表示资源的版本号，我们可以使用ETag + md5来缓存未更改的信息

S3.1 利用node.js的MD5第3方依赖，把资源文件内容编码为md5 

S3.2 把ETag的值，设置为md5的字符串，从而设置资源的响应头

S3.3 带有ETag的响应头资源，以后再发生请求时，就会带上一个 `if-none-match`的请求头，值是之前md5的字符串

S3.4 所以只要对`if-none-match`的内容 和 每次响应的md5值 进行对比判断: 相同则返回304 +　不同则返回响应体资源


## <span id="2">二 具体实现</span>

1 第一版: [实现session记忆相关用户信息](https://github.com/gmYuan/WorkCode/blob/v1.0/10%20session%E7%AD%89%E5%BA%94%E7%94%A8/server.js.js)

2 第二版: [新增localstorage](https://github.com/gmYuan/WorkCode/blob/master/10%20session%E7%AD%89%E5%BA%94%E7%94%A8/index.html)

3 第三版: [新增cache-control+ ETag](https://github.com/gmYuan/WorkCode/blob/master/10%20session%E7%AD%89%E5%BA%94%E7%94%A8/server.js.js)


