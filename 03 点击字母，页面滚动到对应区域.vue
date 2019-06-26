参考文档
01 [\](\)
直接参考文档



S1.1 监听字母的点击事件，通过emit 传出点击的字母值

S1.2 (父)组件监听并获取传出的字母值，传递到需要页面滚动的 子组件中

S1.3 页面滚动组件(list)  通过props获取到字母值(clickCharacter)


S2 用watch监听clickCharacter的变化: 当clickCharacter变化后，就跳转到对应的 内容部分

  S2.1  ref[clickCharacter][0] 获取对应内容元素的DOM

  S2.2 BetterScroll提供了 scrollToElement(DOM元素)的函数，可以滚动页面到某个元素



<template>
  <div class="city-list" ref="cityWrapper">
    <div>

      <div class="area">
        <h2 class="title">热门城市</h2>
        <ul class="lists">
          <li class="map-list"
            v-for="item of hotcity"
            :key = "item.id"
          >
            <a href="javascript:;" class="address">{{item.name}}</a>
          </li>
        </ul>
      </div>


      <div class="area">
        <h2 class="title">字母排序</h2>
        <ul class="character-lists">
          <li class="character-item"
            v-for="(item, key) of cities"
            :key = "key"
            @click="saveCharacter"            
          >
            <a href="javascript:;" class="character"> {{key}}  </a>
          </li>
        </ul>
      </div>

      <!-- 具体内容 -->
      <div class="area"
        v-for = "(item, key) of cities"
        :key = "key"
      >
        <h2 class="title" :ref="key">{{key}}</h2>

        <ul class="lists">
          <li class="map-list"
            v-for="inner of item"
            :key = "inner.id"
          >
            <a href="javascript:;" class="address">{{inner.name}}</a>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"


export default {
  name: "cityList",

  props: {
    hotcity: Array,
    cities: Object,
  },

  data () {
    return {
      clickCharacter: '',
    }
  },


  mounted () {
    this.scroll = new BScroll(this.$refs.cityWrapper, {
      click: true,
      scrollbar: true,
      mouseWheel: true,
    })

  },

  methods: {
    saveCharacter (e) {      // S1
      this.clickCharacter = e.target.innerText
    },
  },

  watch: {                    // S2
    clickCharacter () {
      console.log(2222, this.clickCharacter, this.$refs[this.clickCharacter])
      if (this.clickCharacter) {
        const element = this.$refs[this.clickCharacter][0]
        this.scroll.scrollToElement(element)
      }

    },
  },

}

</script>
