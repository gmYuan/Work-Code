import "@babel/polyfill";

// const arr = [
//   new Promise(()=> {}),
//   new Promise(()=> {})
// ]

// arr.map( item => {
// 	console.log(item)
// })


// S2 设置react组件
import React, {Component} from 'react'
import ReactDom from 'react-dom'

class APP extends Component {
	render() {
		return <div>你好，我是react测试</div>
	}
}

ReactDom.render(<APP/>,document.querySelector("#app"))
