
/**
参考文档


01 []()

Q1: 如何创建公共组件

A: S1 components --> gallery --> Gallery.vue

S2 在webpack中配置路径alias + 在组件中引入使用


Q2: 如何创建图片画廊

A: S1 container部分形成遮罩层 + flex让子元素垂直居中

S2 引入 vue-swiper组件 + 设置分页器样式(去除容器的overflow + bottom为负值)

S3 通过props接收待渲染的数据

S4.1 画廊默认隐藏，点击后才会展示

S4.2 swiper在隐藏变成展示后会有滑动问题，所以需要通过  实现 监听父元素的结构发生变化，就自动刷新的功能


S5 通过$emit + 父组件监听组件  传出事件，关闭画廊
*/



<template>
  <div>

    <div class="container">
      <div class="inner-wrap">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="item of imgList"
            :key="item.id"
          >
            <img :src="item.url" @click="emitClose" alt="图片" class="img">

          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "CommonGallery",

    props: {
      imgArr: Array,
    },

    data () {
      return {
        // swiper配置对象
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationType : 'fraction',
          observer:true,
          observeParents:true,
        },


      }
    },

    computed: {
      imgList () {
        return this.imgArr
      },
    },

    methods: {
      emitClose () {
        this.$emit('close')
      }
    },

  }
</script>
