
import "@babel/polyfill";


let  arr = []

arr.push( new Promise(() => {}) )

arr.push( new Promise(() => {}) )

arr.map (item => {
  console.log(item)
})
