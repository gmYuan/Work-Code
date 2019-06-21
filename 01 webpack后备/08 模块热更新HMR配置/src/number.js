function number(){
  let ele = document.createElement('div')
  ele.id = "num"
  ele.innerHTML = 42333

  document.querySelector('#app').appendChild(ele)

}

export default number