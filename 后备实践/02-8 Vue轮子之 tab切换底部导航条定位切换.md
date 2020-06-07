# Vue轮子之 tab切换底部导航条定位切换

目录

1 [预读文档](#1)

2 [需求代码](#2)


## <span id="1"> 1 预读文档 </span>

1 [Vue官方文档](https://cn.vuejs.org/v2/api/#vm-options)

预读原因: 直接参考文档


## <span id="2"> 2 需求代码 </span>

1 Q: 如何实现 tab切换时 底部导航条定位切换

A:

S1 eventBus:
      emit(当前激活标识name, 当前激活表头实例): tabs-item组件的 表头切换 + tabs组件 初始化时的默认项
      on: tabs-item组件的 表头切换 + tabs-pane组件的 内容切换 + `tabs-head的 下划线切换`

S2 tab-head组件: 根据获取的 tab-item实例, 获取到实例的DOM结构 --> 获取表头的 CSS信息

                 --> 设置下划线line的 宽度 + 绝对定位偏移量

S3 设置下划线的切换动画效果: transtition


2 Q: 如何实现 tabs组件初始化时, `把其默认激活项的 tab-item实例传给 tab-head组件`

A:

S1 遍历子组件实例,定位到 tabs-head组件部分: vm.$children直接子组件遍历 + vm..$options初始化选项

S2 同上获取到 tabs-item组件部分

S3 当 tabs-item的name值 和 默认激活项一致说, 说明获取到了需要传的 当前激活tabs-item实例


```js

// tabs.vue 组件
<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>


<script>
import Vue from "vue";

export default {
  name: "eTabs",

  props: {
    selected: {
      type: String,
      required: true
    },

    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) >= 0;
      }
    }
  },

  data() {
    return {
      eventBus: new Vue()
    };
  },

  provide() {
    return {
      eventBus: this.eventBus
    };
  },

  mounted() {
    this.$children.forEach(vm => {
      if (vm.$options.name === "eTabsHead") {
        vm.$children.forEach(childVm => {

          if (
            childVm.$options.name === "eTabsItem" &&
            childVm.name == this.selected
          ) {
            this.eventBus.$emit("update:selected", this.selected, childVm);
          }
        });
      }
    });
  }
};
</script>



// tabs-item.vue 组件
<template>
  <div class="tabs-item" @click="xxx" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "eTabsItem",
  inject: ["eventBus"],

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    name: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    classes() {
      return {
        active: this.active
      };
    }
  },

  data() {
    return {
      active: false
    };
  },


  created() {
    this.eventBus.$on("update:selected", name => {
      this.active = (name === this.name)
    });
  },

  methods: {
    xxx() {
      this.eventBus.$emit("update:selected", this.name, this);
    }
  }
};
</script>


<style lang="scss" scoped>

$blue: #409EFF;


.tabs-item {
  height: 100%;
  flex-shrink: 0;
  padding: 0 1em;

  display: flex;
  align-items: center;
  cursor: pointer;

  &.active {
    color: $blue;
    font-weight: bold;
    // outline: 1px solid red;
  }


}
</style>



// tabs-head.vue 组件
<template>
  <div class="tabs-head">
    <slot></slot>

    <div class="line" ref="line"></div>

    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "eTabsHead",

  inject: ["eventBus"],

  mounted() {
    this.eventBus.$on("update:selected", (item, vm) => {
      let { width, height, top, left } = vm.$el.getBoundingClientRect();
      // console.log("哈哈哈:", width, left);

      this.$refs.line.style.width = `${width}px`;
      this.$refs.line.style.left = `${left}px`;
    });
  }
};
</script>


<style scoped lang="scss">
$tab-height: 40px;
$blue: #409eff;
$border-color: #ddd;

.tabs-head {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;

  border-bottom: 1px solid $border-color;

  position: relative;

  .line {
    position: absolute;
    bottom: 0;
    transform: translateX(-32%);

    border-bottom: 1px solid $blue;
    transition: all 350ms;
  }

  .actions-wrapper {
    margin-left: auto; // 向右

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
  }
}
</style>

```