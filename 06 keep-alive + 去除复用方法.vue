
```js

参考文档

01 []()



Q1: 为什么要引入 keep-alive

A:

S1 在路由切换的过程中，缓存某个路由对应的 组件状态(位置/数据等)

S2 不再重复发送AJAX请求，提高性能


Q2: 如何去除 某个情况下的组件的  keep-alive复用

A:

S1 方法1:  actived生命周期钩子(actived: 页面重新渲染时会执行) + 查询参数 + vuex-state

```


// S1 keep-alive复用

<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>



S2 vuex-state + 查询参数 +  actived生命周期钩子(actived: 页面重新渲染时会执行) 

<script>

import axios from 'axios'

import { mapState } from 'vuex'

export default {
  name: 'Home',
 
  data () {
    return {
      //  keep-alive相关
      lastCity: '',      // 用来判断 选取的城市是否发生变化
    }
  }, 

  computed: {
    ...mapState(['currentCity']),  // 用作查询参数，获取当前城市对应的 首页数据

  },

  methods: {
    getHomeInfo () {
      axios.get(`/api/index.json?${this.currentCity}`).then( res => {
        console.log(res)
      })
    },

    
  },

  mounted () {
    this.lastCity = this.currentCity
    this.getHomeInfo()
  },

  activated () {
    if (this.lastCity !== this.currentCity) {
      this.lastCity = this.currentCity
      this.getHomeInfo()
    }
  },
  
}
  
</script>




