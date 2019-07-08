
/**
参考文档

01 []()


1 Q1: 如何实现类似的多级目录结构的渲染

A:

S1 创建一级目录的显示

S2 在当前组件内部，递归调用当前的 组件!! (name属性的作用)

 
*/


<template>
  <div class="lists">
    <h3 class="item"
      v-for="(item, index) of lists"
      :key="index"
    >
      <i class="title-icon"></i>
      <span class="title"> {{item.title}}</span>

      <div v-if="item.children" >  
        <detail-list :lists="item.children"></detail-list>    
      </div>


    </h3>
  
  </div>
</template>


<script>

export default {
  name: "detailList",

  props: {
    lists: Array,
  }


}
</script>
