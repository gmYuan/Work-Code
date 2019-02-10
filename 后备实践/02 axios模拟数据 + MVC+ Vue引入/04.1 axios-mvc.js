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






