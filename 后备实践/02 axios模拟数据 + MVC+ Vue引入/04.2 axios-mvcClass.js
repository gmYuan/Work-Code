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






