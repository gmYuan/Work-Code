import _ from 'lodash'
import './style.scss'
import Yun from './yun.jpg'


function component() {
  let element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'Ygm'], ' ')

  element.classList.add('hello')

  // 将图像添加到 div
  var myYun = new Image()
  myYun.src = Yun
  element.appendChild(myYun)

  return element

}

document.body.appendChild(component());