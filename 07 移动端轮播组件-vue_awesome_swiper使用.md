1 预读文档

01 [Vue-Awesome-Swiper官方文档](https://github.com/surmon-china/vue-awesome-swiper)

02 [修复vue-awsome-swiper 栈溢出报错](https://www.cnblogs.com/ydfqixn/p/10402395.html)

03 [修复vue-awsome-swiper 左右滑动报错](https://github.com/surmon-china/vue-awesome-swiper/issues/423)


2 Q: 如何在移动端Vue项目中实现轮播效果

A:

S1 安装插件: `npm install vue-awesome-swiper@2.6.7 --save`

S2 因为可能需要在全局中使用轮播，所以在main.js文件中 全局引入和挂载插件

```js
// main.js文件

// 引入vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
```

S3 新建Swiper.vue组件，设置内容 + 配置

注意点:

A1 Swiper.vue组件的name属性不能为Swiper，否则会报错，改成其他值即可  

A2 手动左右滑动时会出现报错，在html元素上增加 `touch-action: none;` 即可

A3 覆盖第3方组件的样式(SCSS): `/deep/ .swiper-pagination-bullet`

A4 为了防止慢速环境下，图片下方内容有抖动情况，需要设置轮播部分的height/padding-bottom占位，

具体代码，可参考 [swiper组件内容](https://github.com/gmYuan/Qunar/blob/self/src/pages/Home/components/Swiper.vue)

S4 在需要使用的组件中，引入+渲染 swiper子组件

```js
// home.vue组件

<template>
  <div>
    ......
    <home-swiper></home-swiper>

  </div>
</template>


<script>
......
import homeSwiper from './components/Swiper'

export default {
  name: 'Home',
  components: {
    ......
    homeSwiper,
  },
}
</script>
```