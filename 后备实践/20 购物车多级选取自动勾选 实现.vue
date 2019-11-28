
1 Q: 购物车常见功能有哪些

A:

S1 结算默认置灰 + 勾选任一商品后，结算按钮可点击,自动计算出对应总价格


S2.1 勾选店铺后，自动勾选该店铺下所有商品 + 勾选完店铺A下所有商品后，自动勾选上店铺A按钮

S2.2 勾选全选后，自动勾选店铺A按钮 和 店铺A下所有商品 + 勾选所有店铺后，自动勾选全选按钮


S3 编辑-删除商品的逻辑， 同 S1~S2, 但是编辑只支持每个的 单个店铺



2 Q: 如何实现  勾选完店铺A下所有商品后，自动勾选上店铺A按钮(自底向上) 

A:

S1 changeGoodCheck函数:  通过Array.every方法，当所有店铺商品都是勾选状态时，才会返回true给 店铺按钮勾选值



3 Q: 如何实现勾选所有店铺后，自动勾选全选按钮(自底向上) 

A:

S1 因为全选按钮不在v-for的遍历范围内，所以无法直接写在 店铺-商品部分的changeGoodCheck函数内

S2 此时，可以使用计算属性， 来拿到店铺列表数组内容: allSelected  + Array.every方法



4 Q: 如何实现 勾选店铺后，自动勾选该店铺下所有商品(自上而下)

A: 

S1 点击店铺取反状态 + 遍历店铺下的商品，使其选取状态等于 店铺状态



5 Q: 如何实现 勾选全选后，自动勾选店铺A按钮 和 店铺A下所有商品

A: 

S1 点击全选按钮后，allSelected取反 + 遍历店铺和商品的checked状态，使其等于allSelected值即可

S2 因为allSelected是通过计算属性实现的, 所以直接allSelected取反操作不会生效，需要在 计算属性的set中写相关逻辑



具体实现:

<script>
export default {
  let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '.container',

  computed: {
    allSelected: {
      get(){     // Q3 勾选所有店铺后，自动勾选全选按钮
        if (this.cartLists && this.cartLists.length > 0) {
          return this.cartLists.every(shop => {
            return shop.isChecked
          })
        }
        return false
      },
      set(newValue){   // Q5  勾选全选后，自动勾选店铺A按钮 和 店铺A下所有商品
        if (this.cartLists && this.cartLists.length > 0) {
          this.cartLists.forEach(shop => {
            shop.isChecked = newValue
            shop.goodsList.forEach(good => {
              good.isChecked = newValue
            })
          })
        }
      }
    }

  },

  data: {
    cartLists: null,
  },

  methods: {
    getCartList() {  // 获取购物车列表页数据
      axios.post(api.cartList).then(res => {
        if (res.data.cartList && res.data.cartList.length > 0) {
          res.data.cartList.forEach(shop => {
            shop.isChecked = false
            shop.goodsList.forEach(good => {
              good.isChecked = false
            })

          })
        }
        this.cartLists = res.data.cartList
      })
    },
   
    selectGood(shop, good) {           //Q2 切换商品勾选状态 + 对应店铺状态
      good.isChecked = !good.isChecked
      shop.isChecked =  shop.goodsList.every(good => {
        return good.isChecked == true
      })
    },

    selectShop(shop) {  // Q4 切换店铺勾选状态 + 对应下商品状态
      shop.isChecked = !shop.isChecked
      shop.goodsList.forEach(good => {
        good.isChecked = shop.isChecked
      })
    },

    selectAll() {    // Q5
      this.allSelected = !this.allSelected
    }

  },


  mixins: [mixin],

  created () {
    this.getCartList()
  }
})

}
</script>
