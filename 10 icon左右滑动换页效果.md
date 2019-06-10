1 预读文档

01 [具体代码](https://github.com/gmYuan/Qunar/blob/self/src/pages/Home/components/Icons.vue)


2 Q: 如何实现icon图标 左右滑动切换页面

A:
S1 左右滑动切换页面，其实可以理解为是一个 `不会自动切换的轮播效果`

S2 通过vue-swiper组件，swiper-slide内部包裹 ul-li-img即可

```html
......
 <swiper :options="swiperOption">
  <swiper-slide>
    <ul class="icons">
      <li class="icon-item">
        <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png" alt="图标">
        <p class="icon-desc">景点门票</p>
      </li>

      .... // 多个li
    </ul>
  </swiper-slide>

  ....// 多个slide(可切换的页数)

</swiper>
```


3 Q: 如何实现 任意数量的icon分页

A:
S1 计算属性可以直接访问 data中定义的值，且调用时的方法和 data中的属性相同

S2 对 对象数组进行分页，可以通过 遍历数组对象 + 二维数组实现

S3 当前的页数，可以通过 Math.floor + index 求出

S4 渲染时，分别遍历页数 + 每页中的数据即可



