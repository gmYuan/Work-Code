# axios模拟数据

## 目录

1 [axios模拟数据](#1)

  - [1.1 需求描述](#1.1)

  - [1.2 代码实现](#1.2)

  - [1.3 其他功能实现](#1.3)


## <span id="1">一 axios模拟数据 </span>

### <span id="1.1"> 1.1 需求描述 </span>

1 Q: 为什么要模拟数据

A: 很多前端实际数据是从服务器获取的，前端不能固定写死(而是模拟占位)，所以需要模拟后台数据来进行功能测试



2 Q: 如何用axios进行数据模拟(逻辑步骤)

A: S1 前端HTML部分进行数据占位

S2 引入axios + [创建实例]

S3 前端(axios)要能发送一个AJAX请求 + 后台(axios)要能设置响应 + 要能根据路由设置 对应的响应内容

S4 前端(axios)获取响应内容 + 把占位内容替换为真正的服务器返回数据

S5 前端增减了返回数据的数值: HTML内容变化显示 + 发送put请求存入数据库 + 服务器路由获取请求数据 + 更新数据库


### <span id="1.2"> 1.2 代码实现 </span>

1 具体可参考 [axios模拟数据]()

以下是部分代码

```js

// S3.1 用axios发起一个get请求 + 可获取 响应内容

axios.get('/book/1')      
.then(function(response){
    console.log(response)
})
.catch(function(error){
    console.log(error)
})


// S3.2 用 响应拦截器 模拟后台路由

axios.interceptors.response.use( function(response){
  response.data = {
    name: 'test'
  }
  return response
  
},function(error){
    return Promise.reject(error);
})

```