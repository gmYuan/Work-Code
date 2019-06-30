
/*  


Q1: 多入口JS文件如何打包:

A: 

S1 在 entry 添加新的入口起点

S2 修改 output，根据入口起点定义的名称，动态产生 bundle名称




Q1: plugin的作用

plugin的作用: 在webpack打包的生命周期中，自动实现某些操作/功能，增加打包的自动化程度



Q2: 如何使用plugin

S1 安装插件:  npm install --save-dev html-webpack-plugin

S2 在webpack中  引入 + 配置插件


*/





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