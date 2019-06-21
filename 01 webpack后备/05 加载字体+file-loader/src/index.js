import _ from 'lodash';

// import logo from './logo.svg'
// import dog from './dog.jpg'
import './scss/main.scss'



function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add("warn")
  return element;
}

// function addimg() {
//   var img = new Image()
//   // img.src = logo
//   img.src = dog
//   img.classList.add(style.circle)
//   return img
// }

function addIconfont() {
  var ele = document.createElement('span')
  ele.classList.add("iconfont")
  ele.classList.add("icon-shoucang")
  return ele;
}


document.body.appendChild(component())
document.body.appendChild(addIconfont())

// document.body.appendChild(addimg())
// document.body.appendChild(createImage())