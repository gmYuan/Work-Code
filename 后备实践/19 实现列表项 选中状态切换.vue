
1 Q: 如何实现列表项的 选中状态切换

A:

S1 遍历返回的列表项，增加一个isChecked的状态值: 选中切换的Class类和这个状态值绑定即可

S2 易错点是: 要先遍历返回数据再赋值到本地，而不能赋值到本地数据后再遍历新增属性(不是响应式的)

示例代码:


<script>
export default {
  data: {
    cartLists: null
  },

  methods: {
    getCartList() {
      // 获取购物车列表页数据
      axios.post(api.cartList).then(res => {
        if (res.data.cartList && res.data.cartList.length > 0) {
          res.data.cartList.forEach(shop => {
            shop.isChecked = false;
            shop.goodsList.forEach(good => {
              good.isChecked = false
            })
          })
        }
        this.cartLists = res.data.cartList   // 先处理再赋值到本地
      })
    },

    changeCheck(item) {
      item.isChecked = !item.isChecked
    }
  }
}
</script>

