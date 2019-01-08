$('#addOne').on('click', function(){ 
  let number = + $('#number').text() + 1
  $('#number').text(number)
})

$('#minusOne').on('click', function(){
  let number = + $('#number').text() - 1
  $('#number').text(number)
})

$('#reset').on('click', function(){
  $('#number').text(0)
})

// 反思小结:
  // 1. 尽量避免使用全局变量，多使用局部变量
  // 2. 对于text()这种可赋值/可获取的方法，可以先获取存入变量，再通过对象方法赋值




// S3.1 用axios发起一个get请求 + 可获取 响应内容
axios.get('/book/1')      
.then(function(response){
    console.log(response)
})
.catch(function(error){
    console.log(error)
})

// S3.2 用 响应拦截器 模拟后台路由

axios.interceptors.response.use(function (response) {
    
    response.data = {id: 1}
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });