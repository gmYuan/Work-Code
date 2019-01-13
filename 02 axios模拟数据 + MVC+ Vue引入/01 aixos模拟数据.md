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

注意用拦截器模拟响应返回时, 要在请求then之前设置拦截器才有效

S4 前端(axios)获取响应内容 + 把占位内容替换为真正的服务器返回数据

S5 前端增减了返回数据的数值:

  触发事件后: 发送put请求存入数据库 + 成功后 HTML变化显示 + 服务器路由获取请求数据 + 更新数据库


### <span id="1.2"> 1.2 代码实现 </span>

1 具体可参考 [axios模拟数据](https://github.com/gmYuan/Work-Code/blob/master/02%20axios%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE/main-axios.js)

以下是JS部分代码

```js

// S5.2 一开始返回的数据库数据缓存，以后数量变化在此基础上更改即可
let book = {
    bookname: 'JS高级程序设计',
    booknumber: 2,
    id: 1
}

// S3.2 用 响应拦截器 模拟后台路由
axios.interceptors.response.use( function(response){
  let {config: {url, method, data}} = response  //A2 response.config有 请求的相关信息,从而设置路由

  if (url === '/book/1' && method === 'get'){
    response.data = book                          //A1  利用 response.data 可以设置响应数据
  } else if (url === '/book/1' && method === 'put'){  //S5.2 服务器路由获取请求数据 + 更新数据库
    Object.assign(book, data)    // S5.2 返回的数值更新，data是请求数值
    response.data = book
  }
  return response

},function(error){
    return Promise.reject(error);
})
// 以上可以理解为是一个模拟的后台处理程序



axios.get('/book/1')       // S3.1 用axios发起一个get请求 + 利用异步then 可获取 响应内容
.then( (response) => {
    // console.log(response)
    let {bookname, booknumber} = response.data   //S4.1 前端获取响应内容
    bookname = '《' + bookname + '》'

    $('#book').text(bookname)                    //S4.2 用响应内容 替换占位内容
    $('#number').text(booknumber)

})
.catch(function(error){
    console.log(error)
})


$('#addOne').on('click', function(){
  let number = + $('#number').text() + 1
  axios.put('/book/1', {number: number}) //S5.1 触发事件后:发送put请求存入数据库 + 成功后HTML变化显示
  .then(
    $('#number').text(number)
  )
})

$('#minusOne').on('click', function(){
  let number = + $('#number').text() - 1
  axios.put('/book/1', {number: number})
  .then(
    $('#number').text(number)
  )
})

$('#reset').on('click', function(){
  let number = 0
  axios.put('/book/1', {number: number})
  .then(
    $('#number').text(number)
  )
})

```