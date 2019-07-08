
/**
参考文档

01 [Vue实现头部渐隐渐现效果](https://blog.csdn.net/weixin_41909712/article/details/87935181)



Q1: 如何让header部分，根据页面滚动渐隐渐现到 完全显示

A:

S1 实现header完全展示 + fixed布局效果


S2 根据滚动动态切换 opacity值(绑定动态对象)

  S2.1 在actived生命周期钩子内，监听滚动事件

  S2.2 监测 当前滚动距离>90px时，控制 opacity的值为 当前滚动对应的比例值


S3 在对全局对象(window)进行事件绑定后，需要对其进行解绑，否则会作用在所有组件中
*/


<template>
  <div>
    
    <router-link tag="div" 
      to="/"
      class="header-back"
      v-show="!showHeader"
    >
       <span class="mask"></span>
       <i class="iconfont back_icon">&#xe679; </i>
    </router-link>

    <div class="fixed-header"
      v-show="showHeader"
      :style="headerStyle"
    >
      <router-link tag="div" 
        to="/" 
        class="left"
      >
         <i class="iconfont header_back_icon">&#xe679; </i>
      </router-link>

      <h1 class="title">
        景点详情
      </h1>
    </div>
    

  </div>
</template>


<script>

export default {
  name: "detailHeader",

  data () {
    return {
      showHeader: false,
      headerStyle: {
        opacity: 1,
      }
    }
  },

  methods: {
    changeOpacity () {
      const top = document.documentElement.scrollTop
      if (top > 40) {
        this.showHeader = true

        let opacity = top/140
        opacity === 1 ? 1 : opacity     // opacity不能大于1
        this.headerStyle = {opacity}

      } else {
        this.showHeader = false
      }
    },


  },

  activated () {
    window.addEventListener('scroll', this.changeOpacity)
    
  },

   deactivated () {
    window.removeEventListener('scroll', this.changeOpacity)
  }

}
</script>

