参考文档

01 [\](\)
直接参考文档


S1 设置搜索结果展示静态页面: position绝对定位 + 遮罩层效果 !!

S2 获取遍历搜索的数据源cities: props获取

S3
  S3.1 双向绑定input的结果searchContent，并用watch监听变化
  S3.2 当searchContent发生变化时，遍历citite，从中查找是否有对应数据, 每次搜索的结果存在 内部变量result  !!
  S3.3 把result赋值给 this.searchContent + 遍历结果数组 渲染出来

S4 使用节流，对搜索的过程进行性能优化: timer + 执行数据源遍历


S5 优化细节
  S5.1 搜索结果为空后，搜索内容变成'',所以会匹配所有数据: 当搜索内容为空时，直接返回this.searchResult默认为空数组 即可

  S5.2 搜索结果较多时页面无法滚动:  引入betterScroll + mounted阶段挂载 !!

  S5.3 搜索无匹配项时，设置一条提示项，仅在搜索结果数组长度为0时 才显示这一条提示项: v-show + computed  !!

  S5.4 只有在输入内容不为空时， 才显示搜索部分: v-show (searchContent)



<template>
  <div>

    <div class="search">
      <input v-model="searchContent"  class="search-input" type="text" placeholder="输入城市名或拼音">
    </div>

    <div class="search-content"
         ref="search"
         v-show="searchContent"
    >
      <ul>
        <li class="search-item" v-for="item of searchResult" :key="item.id">{{item.name}}</li>
        <li class="search-item" v-show="hasNoData"> 无对应内容 </li>
      </ul>
    </div>

  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: 'citySearch',
    props: {
      cities: Object,             // S2
    },

    data () {
      return {
        searchContent: '',    // 搜索内容
        searchResult: [],     // 搜索结果
        timer: null,          // 节流计时器
      }
    },
    computed:  {
      city() {
        return this.cities    // S2 搜索源数据,类型是对象- 数组
      },
      hasNoData (){
        return !this.searchResult.length
      },
    },

    watch: {
      searchContent () {                   // S3

        if (this.timer) {                 // S4
          clearTimeout(this.timer)
        }

        if (!this.searchContent) {  // 当搜索内容为空字符串时,直接置空 结果数组并返回
          this.searchResult = []
          return
        }

        this.timer = setTimeout( ()=> {
          const result = []
          for (let key in this.city) {
            this.city[key].forEach(item => {  // 遍历对象里的数组, item又是一个对象
              if (item.spell.indexOf(this.searchContent) > -1 || item.name.indexOf(this.searchContent) > -1 ) {
                result.push(item)
              }
            })
          }
          // console.log(222, result)   // result表示本次搜索结果
          this.searchResult = result
        }, 500)
      },
    },

    mounted () {
      this.scroll = new BScroll(this.$refs.search)
    }

  }

</script>

<style lang="scss" scoped>
  @import '@scss/variables.scss';

  .search {
    background-color: $cityHeaderBg;
    padding: 20px 10px;
    color: #fff;

    .search-input {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 5px;
      color: #666;
    }
  }

  .search-content {                   // S1
    position: absolute;
    top: 190px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #eee;

    .search-item {
      padding: 20px;
      line-height: 38px;
      border-bottom: 1px solid #aaa;
      background: #fff;
    }
  }

</style>