
//S1.1 第3方依赖部分
//import _ from 'lodash'

//S1.2 异步导入第3方依赖部分
function getComponent() {
	return import (/* webpackChunkName: "lodash" */ "lodash").then(
    _ => {
    	 var element = document.createElement('div');
			 element.innerHTML = _.join(['我是', '动态打包滴'], '--');
			 return element;
    }
	).catch(err => '发生了错误哦！')
}

//S2 业务代码部分
getComponent().then( ele => {
  let root = document.querySelector('#app')
  root.appendChild(ele)
  }
)

// alert(
//   _.join(['我就是', '代码分离', '测试哦！'], '---')
// )