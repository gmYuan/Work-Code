# MVC+axios 模拟数据

目录

1 [MVC+axios 模拟数据](#1)

  - [1.1 需求描述](#1.1)

  - [1.2 代码实现](#1.2)


## <span id="1"> 一 MVC+axios 模拟数据 </span>

### <span id="1.1"> 1.1 需求描述 </span>

1 Q: axios模拟数据的 MVC逻辑步骤是什么

A: S1 封装 后端部分代码: 通过拦截器 + 根据请求方法和url, 返回不同响应数据—— fakeData()函数

S2 构造JS文件, 内容是3个 对象: model + view + controller

S3 model对象负责 获取+更新数据, 一般有初始data属性 和  fetch()+updata()方法

  S3.1 fetch 获取数据的步骤: 发送get请求 + 获取响应后,把响应数据存入 data属性里

  S3.2 update 更新数据的步骤: put请求 + 同上


S4 view对象负责 显示元素html内容, 一般有 控制的html容器元素 + 容器内部元素template + render()渲染方法

  S4.1 render()方法需要的数据, 一般可以从model中获得


S5 controller对象负责 控制view&model的逻辑更新, 一般有init() + bindEvents()方法

  S5.1 init()方法通常是入口，用于调用 controller对象的数据初始化 + 调用对象内部定义的其他方法

  S5.2 bindEvents()方法 同于绑定事件监听的回调


S6 可以进一步把MVC 封装成类，以方便跨文件使用

### <span id="1.2"> 1.2 代码实现 </span>

代码实现见下

```js
fakedata()   // 可以理解为是一个 后台处理程序

let model = {
  data: {
    name:'',
    number: 0,
    id: null
  },
  fetch(id){
    return axios.get(`/book/${id}`).then((response) =>{
      this.data = response.data
      return response
    }) 
  },
  update(id, data){
    return axios.put(`/book/${id}`, data).then((response) =>{
      this.data = response.data
      return response
    }) 
  }
}

let view = {
  el: '#app',
  template: `
    <p id="book">《__bookname__》</p>
    <p id="number">__number__</p>
    <button id="addOne">加1</button>
    <button id="minusOne">减1</button>
    <button id="reset">置0</button>
  `,
  render(data){
    let content = this.template.replace('__bookname__', data.name)
                .replace('__number__', data.number)
     $(this.el).html(content)
  }
}


let controller = {
  init(options){
    this.view = options.view
    this.model = options.model

    this.model.fetch(1).then( () => {
      this.view.render(this.model.data)
    })

    this.bindEvents()
  },

  addOne(){
    let number = + $('#number').text() + 1
    this.model.update(1, { number: number }).then(
      $('#number').text(number)
    )
  },
  minusOne(){
    let number = + $('#number').text() - 1
    this.model.update(1, { number: number }).then(
      $('#number').text(number)
    )
  },
  reset(){
    let number = 0
    this.model.update(1, { number: number }).then(
      $('#number').text(number)
    )
  },
  bindEvents(){
    $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
    $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
    $(this.view.el).on('click', '#reset', this.reset.bind(this))
  }
}
controller.init({view: view, model: model})


// 后台部分
function fakedata() {
  let book = {
    name: 'JS高级程序设计',
    number: 2,
    id: 1
  }

  axios.interceptors.response.use(function (response) {
    let { config: { url, method, data } } = response
    if (url === '/book/1' && method === 'get') {
      response.data = book
    } else if (url === '/book/1' && method === 'put') {
      Object.assign(book, data)
      response.data = book
    }
    return response

  }, function (error) {
    return Promise.reject(error);
  })
}
```

封装成类的代码见下：

```js
fakedata()   // 可以理解为是一个 后台处理程序

class Model {
  constructor(options){
    this.data = options.data
    this.resource = options.resource
  }
  fetch(id){
    return axios.get(`/${this.resource}/${id}`).then((response) =>{
      this.data = response.data
      return response
    }) 
  }
  update(id, data){
    return axios.put(`/${this.resource}/${id}`, data).then((response) =>{
      this.data = response.data
      return response
    }) 
  }
}


class View {
  constructor(options){
    this.el = options.el
    this.template = options.template
  }

  render(data){
    let content = this.template
    for (let key in data){
      content = content.replace(`__${key}__`, data[key])
    }
    $(this.el).html(content)
  }
}


let model = new Model({
  data: {
    name:'',
    number: 0,
    id: null,
  },
  resource: 'book'
})

let view = new View({
  el: '#app',
  template: `
    <p id="book">《__name__》</p>
    <p id="number">__number__</p>
    <button id="addOne">加1</button>
    <button id="minusOne">减1</button>
    <button id="reset">置0</button>
  `
})


let controller = {
  init(options){
    this.view = options.view
    this.model = options.model

    this.model.fetch(1).then( () => {
      this.view.render(this.model.data)
    })

    this.bindEvents()
  },

  addOne(){
    let number = + $('#number').text() + 1
    this.model.update(1, { number: number }).then(
      $('#number').text(number)
    )
  },
  minusOne(){
    let number = + $('#number').text() - 1
    this.model.update(1, { number: number }).then(
      $('#number').text(number)
    )
  },
  reset(){
    let number = 0
    this.model.update(1, { number: number }).then(
      $('#number').text(number)
    )
  },
  bindEvents(){
    $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
    $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
    $(this.view.el).on('click', '#reset', this.reset.bind(this))
  }
}
controller.init({view: view, model: model})


// 后台部分
function fakedata() {
  let book = {
    name: 'JS高级程序设计',
    number: 2,
    id: 1
  }

  axios.interceptors.response.use(function (response) {
    let { config: { url, method, data } } = response
    if (url === '/book/1' && method === 'get') {
      response.data = book
    } else if (url === '/book/1' && method === 'put') {
      Object.assign(book, data)
      response.data = book
    }
    return response

  }, function (error) {
    return Promise.reject(error);
  })
}
```