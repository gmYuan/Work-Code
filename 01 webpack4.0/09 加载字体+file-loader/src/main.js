import './style.scss'
import Yun from './yun.jpg'


function component() {
  let element = document.createElement('div')
  element.innerHTML = 'Hello, Ygm'

  element.classList.add('hello')

  // 将图像添加到 div
  var myYun = new Image()
  myYun.src = Yun
  element.appendChild(myYun)

  // 添加字体
  let iconEle = document.createElement('div')
  iconEle.innerHTML = '<div class="iconfont icon-xiangkan"></div>'
  element.appendChild(iconEle)


  return element

}

document.body.appendChild(component());