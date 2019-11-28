
1 Q: 如何实现 返回顶部功能

A: 

S1 监听touchmove事件: 当滚动高度>x时 (getBoundingClientRect), 切换隐藏/显示 返回顶部icon

S2 监听返回顶部按钮的点击事件: velocity(元素, '事件', '时间')

示例代码:

<template>
  <div class="container" @touchmove="showTop">
    .....

     <!-- 返回顶部按钮 -->
    <div class="go-to-top" v-show="showTopIcon" @click="toTop"> </div>

  </div>
</template>

<script>

import Velocity from 'velocity-animate' // 返回顶部的动画效果

export default {

  data () {
    return {
      showTopIcon: false
    }
  },

  methods: {
  
    showTop () {   // S1
      let scroll = Math.abs(document.body.getBoundingClientRect().top)
      if (scroll > 100) {
        this.showTopIcon = true
      } else {
        this.showTopIcon = false
      }
    },

    toTop () {     // S2
      Velocity(document.body, 'scroll', {duration: 500})
    }

  },

}
</script>









