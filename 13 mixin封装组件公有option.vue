参考文档

01 [Vue官方文档- 混入](https://cn.vuejs.org/v2/guide/mixins.html)



1 Q: 多个组件间公有的属性/方法/数据等，如何对其进行复用

A: 使用mixin封装公有options: filters / components/ methods......

S1 新建mixin.js文件, mixin对象内部配置公有的 Vue实例属性

S2 导出mixin对象, 在组件中引入 + 配置: mixins: [mixin]


示例代码:

<script>

import Foot from 'components/Foot.vue'
const mixin = {

  /* 过滤器部分 */
  filters: {
    currency (price) {
      let priceStr = '' + price
      if (priceStr.indexOf('.') > -1) {
        let arr = priceStr.split('.')
        return arr[0] + '.' + (arr[1] + '0').substr(0,2)
      } else {
        return priceStr + '.00'
      }
    }
  },

   /* 组件部分 */
  components: {
    Foot
  },
}

export default mixin


</script>















