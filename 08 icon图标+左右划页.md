1 预读文档

01 [覆盖第3方组件样式](https://www.cnblogs.com/decayedTooth/p/10020588.html)




2 Q: 如何实现 Icons图标左右划页

A:

S1 在Icons.Vue组件中使用 swiper组件(挂在 全局文件main.js中)

S2 通过/deep/覆盖 第3方组件的样式

S2 v-for展示icon数据

S3 Q: 在知道数据的情况下，如何动态分页(每页的个数可能是变化不固定的)