# Vue轮子之 判断子组件内容

目录

1 [预读文档](#1)

2 [需求代码](#2)


## <span id="1"> 1 预读文档 </span>

1 [Vue官方文档](https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)

预读原因: 直接参考文档


## <span id="2"> 2 需求代码 </span>

1 Q: 如何实现 this.$toast的使用效果

A:

S1 使用 import + Vue.use(插件) 创建Vue插件文件- plugin.js

S2 使用Vue.extend()创建 组件实例构造函数

S3 使用vm.$slots.default设置组件的slot内容 + vm.$mount挂载组件


```js

/** plugin.js 文件 */

import Toast from '../toast'

const MyPlugin = {}

MyPlugin.install = function (Vue, options) {
  
  // 添加实例方法
  Vue.prototype.$toast = function (message) {
    let Constructor = Vue.extend(Toast)  // 生成 创建组件子类实例 的构造器
    let toast = new Constructor()
    toast.$slots.default = [message]
    console.log('toast', toast)
    toast.$mount()
    document.body.appendChild(toast.$el)
  }
}

export default MyPlugin


/** app.js 文件 */

/* toast组件 */
import Toast from './toast'
import MyPlugin from './common/plugin'
Vue.use(MyPlugin)
Vue.component('e-toast', Toast)


```