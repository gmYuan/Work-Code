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


let model = new Model({
  data: {
    name:'',
    number: 0,
    id: null,
  },
  resource: 'book'
})


let view = new Vue({
  el: '#app',
  data: {
    book: {
      name: '',
      number: 0,
      id: null
    },
    N: 0
  },
  template:` 
  <div>
    <span id="book">《{{book.name}}》</span>
    <span id="number">{{book.number}}</span>
    <p>
      <input v-model="N">
      <span> {{N}} </span>
    </p>
    <button v-on:click = "addOne">加N</button>
    <button v-on:click = "minusOne">减N</button>
    <button v-on:click = "reset">置0</button>
  </div>
 `,
 created: function(){
   model.fetch(1).then( () => {
    this.book = model.data
   })
 },
 methods: {
  addOne(){ 
    let number = this.book.number + (+this.N)
    model.update(1, { number: number})
    .then( () => {
      this.book = model.data
    })    
  },  // 对应addOne
  minusOne(){ 
    let number = this.book.number - (+this.N)
    model.update(1, { number: number})
    .then( () => {
      this.book = model.data
    })    
  },  // 对应minusOne
  reset(){ 
    let number = 0
    model.update(1, { number: number})
    .then( () => {
      this.book = model.data
    })    
  }  // 对应reset
   
 }  // 对应methods


})



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
      data = JSON.parse(data)
      Object.assign(book, data)
      response.data = book
    }
    return response

  }, function (error) {
    return Promise.reject(error);
  })
}
