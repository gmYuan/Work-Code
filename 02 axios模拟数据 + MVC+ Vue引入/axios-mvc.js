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
  render(){
    model.fetch(1).then((response) => {

      let { bookname, booknumber } = response.data 
      bookname = '《' + bookname + '》'
  
      $('#book').text(bookname)                   
      $('#number').text(booknumber)
    })
  }


}

let controller = {

}







axios.get('/book/1')     
  .then((response) => {
    
    let { bookname, booknumber } = response.data  
    bookname = '《' + bookname + '》'

    $('#book').text(bookname)                   
    $('#number').text(booknumber)

  })
  .catch(function (error) {
    console.log(error)
  })


$('#addOne').on('click', function () {
  let number = + $('#number').text() + 1
  axios.put('/book/1', { number: number }) //S5.1 触发事件后:发送put请求存入数据库 + 成功后HTML变化显示
    .then(
      $('#number').text(number)
    )
})

$('#minusOne').on('click', function () {
  let number = + $('#number').text() - 1
  axios.put('/book/1', { number: number })
    .then(
      $('#number').text(number)
    )
})

$('#reset').on('click', function () {
  let number = 0
  axios.put('/book/1', { number: number })
    .then(
      $('#number').text(number)
    )
})




function fakedata() {
  let book = {
    bookname: 'JS高级程序设计',
    booknumber: 2,
    id: 1
  }

  axios.interceptors.response.use(function (response) {
    let { config: { url, method, data } } = response
    if (url === '/book/1' && method === 'get') {
      response.data = book
    } else if (url === '/book/1' && method === 'put') {

      console.log('服务器获取的数据:')
      console.log(data)

      Object.assign(book, data)
      response.data = book
    }
    return response

  }, function (error) {
    return Promise.reject(error);
  })
}