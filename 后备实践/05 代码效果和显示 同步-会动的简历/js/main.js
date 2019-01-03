let $styleTag = document.querySelector('#styleTag')
let $codeContent = document.querySelector('#code')
let $codeWrap = document.querySelector('#code-wrap')

let result = `/* 
 * 你好，我是Ygm
 * 只用文字做介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}

html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个3D效果 */
<<<<<<< HEAD



/* 接下来准备介绍正式内容 */

#code-wrap {
  position: fixed;
  left:0;
  right: 50%;
  top: 0;
  bottom: 0;
}

#paper > .content {
 display: block;
=======


/* 接下来准备介绍正式内容 */

#code-wrap {
  position: fixed;
  left:0;
  right: 50%;
  height: 100vh;
  overflow: hidden;
}

#paper{
  position: fixed; width: 50%; height: 100%; right: 0;
  display: flex; align-items: flex-start;
  background: #444; padding: 16px;

}
#paper > .content{
  width: 100%;
  height: 100%;
  padding-left: 16px;
  overflow: hidden;
  background: white;
>>>>>>> 3d8d5f34b1ce5e6923c4cf23e95dd17875299534
}

/* 开始正式介绍，请看右边 */
`

<<<<<<< HEAD

let newResult = `111`
=======
var result2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
>>>>>>> 3d8d5f34b1ce5e6923c4cf23e95dd17875299534

let myinfo =`
# 自我介绍
我叫 XXX
1995 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
` 

let result3 = `
/*
* 以上就是会动的简历
* 谢谢观看
*/
`

writeCode('',result, ()=> {
  createPaper(() => {
    writeMarkdown(myinfo, () => {
      writeCode(result, result2, () => {
        convertHtml( () => {
          writeCode(result+result2, result3, () => {
            // console.log("执行完成")
          })
        })
      })

    })
  })
})


// 以下是封装的 函数部分
<<<<<<< HEAD

let $styleTag = document.querySelector('#styleTag')

function writeCode(precode,newcode,fn) {                     // 封装函数
  let $codeContent = document.querySelector('#code')
=======
function writeCode(precode,newcode,fn) {      // 3.S1 封装函数
>>>>>>> 3d8d5f34b1ce5e6923c4cf23e95dd17875299534
  let n = 0
  let timer = setInterval(() => {
    n += 1
    $styleTag.innerHTML = precode + newcode.substring(0,n)  // 3.S3 产生对应显示效果

    // 3.S2 页面逐次显示文字内容 + 代码高亮
    $codeContent.innerHTML = Prism.highlight(precode + newcode.substring(0,n), Prism.languages.css, 'css')
    
    //让代码显示区域跟随书写自动滚动定位
    $codeWrap.scrollTop = $codeWrap.scrollHeight

    if (n >= newcode.length){
      clearInterval(timer)
<<<<<<< HEAD
     
      fn && fn()      // 执行回调函数, 相当于 if (typeof fn === 'function')
=======
      fn && fn.call()      // 执行回调函数, 相当于 if (typeof fn === 'function')
>>>>>>> 3d8d5f34b1ce5e6923c4cf23e95dd17875299534
    }

  },20)
}

<<<<<<< HEAD

function createPaper(fn2){                    
  let paper = document.createElement("div")
  paper.id = "paper"

=======
function createPaper(fn){         // 4 创建+显示 个人信息区
  let paper = document.createElement("div")
  paper.id = "paper"
>>>>>>> 3d8d5f34b1ce5e6923c4cf23e95dd17875299534
  let content = document.createElement('pre')
  content.className = 'content'

  paper.appendChild(content)
  document.body.appendChild(paper)
<<<<<<< HEAD
  
  fn2 && fn2.call()
=======
  fn && fn.call()
}

function writeMarkdown(info,fn) {
  let $paper = document.querySelector('#paper .content')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    $paper.innerHTML = info.substring(0,n)  
    $paper.scrollTop = $paper.scrollHeight

    if (n >= info.length){
      clearInterval(timer)
      fn && fn.call()
    }
  },20)

}

function convertHtml(fn) {      // 7.S3 把md语法格式的字符串转化为md文档形式
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(myinfo)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
>>>>>>> 3d8d5f34b1ce5e6923c4cf23e95dd17875299534
}