function add(){
  let ele = document.createElement('button')
  ele.innerHTML = 1
  ele.onclick = function(e){
    ele.innerHTML = parseInt(e.target.innerHTML, 10) + 1
  }

  document.querySelector('#app').appendChild(ele)

}

export default add