参考文档:

01 [vue中自定义按钮组件为什么要加.native](https://segmentfault.com/q/1010000011186651)

02 [关于vue组件native修饰](https://zhuanlan.zhihu.com/p/36101632)


.native: 

S1 A组件使用 自定义组件B时，会执行A组件监听的事件回调，而不仅仅是从B组件中查找事件回调

S2 相等于是把 自定义组件变成原生元素来 监听事件


举例:

```md

S1 自定义组件home-button: <div  @click="handleClick">

S2 在父组件/其他组件 中使用这个自定义组件: <home-button @click="otherClickHandle"></home-button>

S3 此时执行的是在子组件定义的 handleClick回调，而不会执行在父组件中定义的 otherClickHandle回调
```