import mainStyle from './style.scss'
import Yun from './yun.jpg'


function component() {
  let element = document.createElement('div')
  element.innerHTML = 'Hello, Ygm'

  element.classList.add(mainStyle.hello)

  // 将图像添加到 div
  var myYun = new Image()
  myYun.src = Yun
  element.appendChild(myYun)

  return element

}

document.body.appendChild(component());