
/**

参考文档

01 [震惊！喝个茶的时间就学会了vuex](https://juejin.im/post/5a7278dc6fb9a01c9c1f59e7#heading-0)
直接参考文档,主要是看官网文档

02 [Vuex 通俗版教程](https://juejin.im/entry/58cb4c36b123db00532076a2)
基本同上，部分讲解比较好


S1 安装vuex: npm install --save vuex

S2 创建Vuex的 入口文件index.js + 在main.js入口文件中 把store 注入到每一个组件中

  S2.1 在State中 定义数据data
  S2.2 mutations中 mth1通过state.data操作数据
  S2.3 actions中 通过ctx.commit(mth1)触发mutations中定义的mth1


S3 在组件中 引入Vuex中定义的 state/getter/mutations/actions

   S3.1 引入时可使用 mapStaet/mapMutations/MapActions等辅助函数 + computed中使用 ES6扩展运算符

*/



// S2代码
import Vue from 'vue';     //引入vue
import Vuex from 'vuex';   //引入vuex

Vue.use(Vuex) 

export default new Vuex.Store({
    state: { 
      currentCity: '上海',
    },
    getters: { 
        
    },

    mutations: {
      setCurrentCity (state, city) {    // 要传入state + 参数
        state.currentCity = city
      }, 
        
    },
    actions: {
       setCurrentCity (ctx,city) {   // 要传入ctx + 参数
         ctx.commit('setCurrentCity', city)    // 是字符串类型
       },
    }
})


// S3 代码，在组件中使用

import {mapState, mapActions} from 'vuex'

export default {
  name: "cityList",

  computed: {
    ...mapState(['currentCity'])

  },

  methods: {
    ...mapActions(['setCurrentCity']),   // 把公有方法注册到组件methods中

    handleClickCity (city) {
      // alert(city)
      this.setCurrentCity(city)
      this.$router.push('/')

    },
  }
}