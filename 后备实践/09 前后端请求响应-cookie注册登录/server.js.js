var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    let result= fs.readFileSync('./index.html','utf8');

    // 8 在首页中显示用户密码信息
    let users = fs.readFileSync("./db/users.txt",'utf8')
    try {
      users = JSON.parse(users)
    } catch (e) {
      users = []
    }
                      // ['email=1@', 'a=1', 'b=2']
    let cookies = request.headers.cookie.split("; ")
    let hash = {}
    cookies.forEach(cookie => {
      let [key,value] = cookie.split("=")
      hash[key] = value
    })
    // console.log(hash)
    let foundUser
    for (let i=0; i < users.length; i++) {
      if (hash["sign-in-email"] === users[i].email) {
        foundUser = users[i]
        break
      }
    }

    if (foundUser) {
      result = result.replace("__password__", `${foundUser.password}`)
    } else {
      result = result.replace("__password__", `不知道`)
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(result)
    response.end()
  } 
  else if(path === '/sign-up' && method == "GET"){
    let result = fs.readFileSync('./sign-up.html','utf8')

    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(result)
    response.end()
  } 
  else if(path === '/sign-up' && method == "POST"){
    readBody(request).then( (data) => {
      // console.log(typeof data)  string "email=kd&pass..."

      //3.S2 把请求传入的字符串内容 转化为一个 对象
      let result = {}

      //data.split  ['email=kd', ...]   array 'email=kd'...
      data.split('&').forEach( (array) => {
        let parts = array.split("=") // ['eamil','kd']...
        let [key, value] = parts
        result[key] = decodeURIComponent(value)
        // console.log(result) { email: 'kd', ...}
      }) 

      // 3.S3 读取对象内容，进行后面进行的 情况判断
      let {email, password, pwd_confirmation} = result
      // console.log(email)
      if (email.indexOf("@") === -1) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(`{
          "errors": {
            "email": "invalid"
          }
        }`)
        response.end()
      } else if (password === ''){
        response.statusCode = 400
        response.write('请填写密码')
        response.end()
      } else if (pwd_confirmation === ''){
        response.statusCode = 400
        response.write('请确认密码')
        response.end()
      } else if (password !== pwd_confirmation){
        response.statusCode = 400
        response.write('密码不一致')
        response.end()
      }
      else {
        // 5 Q: 存储注册页面传入的数据—用文本文件模拟数据库
        let users = fs.readFileSync("./db/users.txt",'utf8')
        try {
          users = JSON.parse(users)
        } catch (e) {
          users = []
        }

        // 5.S3 解决数据库内存入重复数据的问题
        let saved = false
        for (let i = 0; i < users.length; i++){
          if (users[i].email === email) {
            saved = true
            break
          }
        }
        if (saved) {
          response.statusCode = 400
          response.write(`email has been registered.`)
          response.end()
        } else {
          // 数据库中存入数据
          users.push({email:email, password:password})
          usersString = JSON.stringify(users)
          fs.writeFileSync('./db/users.txt', usersString)
          // 返回正确信息
          response.statusCode = 200
          response.setHeader('Content-Type', 'text/html;charset=utf-8')
          response.write('success')
          response.end()
        }
      }

    }) // 对应于 readBody(request).then
  } 
  else if (path === '/sign-in' && method === 'GET') {
    let result= fs.readFileSync('./sign-in.html','utf8');

    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(result)
    response.end()

  } else if (path === '/sign-in' && method === 'POST') {
    // 6 实现 登录页面的登录验证

    // 读取请求数据
    readBody(request).then( (data) => {
      // console.log(typeof data)  string "email=kd&pass..."

      // 把请求传入的字符串内容 转化为一个 对象
      let result = {}

      //data.split  ['email=kd', ...]   array 'email=kd'...
      data.split('&').forEach( (array) => {
        let parts = array.split("=") // ['eamil','kd']...
        let [key, value] = parts
        result[key] = decodeURIComponent(value)
        // console.log(result) { email: 'kd', ...}
      }) 
      let {email, password} = result

      // 读取数据库内容
      let users = fs.readFileSync("./db/users.txt",'utf8')
      try {
        users = JSON.parse(users)
      } catch (e) {
        users = []
      }

        // 进行数据对比
      let iscorrect = false
      for (let i = 0; i < users.length; i++){
        if (users[i].email === email && users[i].password === password) {
          iscorrect = true
          break
        }
      }
      if (iscorrect) {
        response.statusCode = 200
        response.setHeader('Set-Cookie', `sign-in-email = ${email}`)
        response.write('success sign-in')
        response.end()
      } else {
        response.statusCode = 401
        response.write('fail to sign-in')
        response.end()
      }
    })

  }
  else if(path === '/main.js'){
    let result= fs.readFileSync('./main.js','utf8');

    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(result)
    response.end()

  } else if (path === '/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml')
    response.write(`
    {
      "note":{
        "to": "小谷",
        "from": "Ygm",
        "heading": "打招呼",
        "content": "hi"
      }
    }
    `)
    response.end()

  } else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error" : "not found"
      }
    `)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

// 3.S1 封装一个读取请求数据的函数
function readBody(request) {
  return new Promise((resolve,reject) => {
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    })
  }) 
}


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)