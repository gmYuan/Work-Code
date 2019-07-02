import './style.scss'
import Yun from './yun.jpg'

import printMe from './print.js'    // S1 引入其他 JS依赖文件



function component() {
  let element = document.createElement('div')
  element.innerHTML = 'Hello, Ygm'

  // 添加类
  element.classList.add('hello')

  // 将图像添加到 div
  var myYun = new Image()
  myYun.src = Yun
  element.appendChild(myYun)

  // 添加字体
  let iconEle = document.createElement('div')
  iconEle.innerHTML = '<div class="iconfont icon-xiangkan"></div>'
  element.appendChild(iconEle)


  // S1 添加JS 依赖方法
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe
  element.appendChild(btn)


  
  return element

}

document.body.appendChild(component());