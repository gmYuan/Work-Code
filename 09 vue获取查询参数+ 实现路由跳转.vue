
<!--预读文档: [饿了么官方文档_Pagination分页](https://element.eleme.cn/2.6/#/zh-CN/component/pagination) -->

<template>
  <div>

    ......
    <div slot="footer" class="submit" @click="handleSubmit">
      <span>确 定</span>
    </div>


  </div>
</template>

<script>

export default {
  name: "Vue 获取查询参数 + 路由跳转",
  data() {
    return {}
  },

  methods:{

    // 新增 提交逻辑
    handleSubmit () {

      // 跳转到对应详情页
      let id = this.$route.query.courseId     // 获取到当前路由的查询参数对象
      this.$router.push({                     // 跳转到 name对应的组件 + 通过query传入查询参数
        name: 'courseDetail',
        query: {
          id,
        }
      })
    },


  },
}
</script>
