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