function component(){
  var ele = document.createElement('div')
  ele.id = "first"
  ele.innerHTML = "我是首页内容"

  var btn = document.createElement('button')
  btn.innerHTML = "点击进入下一页"

  btn.onclick = () => {
    return import(/* webpackChunkName: "nextpage" */ './nextpage').then(
      module => {
        var nextpage = module.default
        nextpage()
      }
    )
  }

  ele.appendChild(btn)
  return ele
}


var root = document.querySelector('#app')
root.appendChild(component())






