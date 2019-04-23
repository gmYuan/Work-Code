# rap2接口mock数据

目录

1 [预读文档](#1)

2 [如何使用rap2接口mock后台数据](#2)

3 [获取 mock的后台数据](#3)


## <span id="1"> 1 预读文档 </span>

[01 mock.js官方文档](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)

[02 mock.js官方代码示例](http://mockjs.com/examples.html#)

阅读原因: 官方文档语法配合示例代码，基本可以直接使用



## <span id="2"> 2 如何使用rap2接口mock后台数据 </span>

1 Q: 如何使用rap2接口mock后台数据

A:

S1 登录rap2，新建仓库—新建模块，模块内新建接口(编辑接口名称、url地址等)

S2 根据mock.js语法，设置请求参数

S3 根据mock.js语法，设置响应内容



## <span id="3"> 3 获取 mock的后台数据 </span>

1 Q: 如何获取 mock的后台数据

A:

S1 引入axios

S2 点击/复制 接口的`地址链接`，发送HTTP请求

S3 通过promise语法发出/获取请求和响应内容

具体代码，可参考[获取mock数据](https://github.com/gmYuan/Work-Code/blob/master/01%20Vue%E5%AE%9E%E7%8E%B0%E6%9C%89%E8%B5%9E%E5%95%86%E5%9F%8E/learn_mock/index.js)