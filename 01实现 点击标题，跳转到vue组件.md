# 实现点击标题，跳转到组件

目录

1 [需求 逻辑步骤](#1)

2 [实际 代码参考](#2)



## <span id="1"> 1 需求 逻辑步骤 </span>

1 Q: 如何实现 点击标题，跳转到组件

1 A: S1 引入vue-router插件 + 注册插件 + 实例化路由并导出 + 挂载到vue实例(vue-cli自动完成)


S2.1 配置路由和组件的映射关系: routes 对象数组,一般每个路由内部都是3个属性: 路由名称、url路径、路径对应跳转的组件

S2.2 每个标题跳转到对应的详情页，所以需要可以向url传入参数，语法是: `{ path: '/user/:参数名称', component: User }`

S2.3 当一个路由内显示的内容由多个组件组成时，就需要使用命名视图，语法是: `components: {视图名称: 对应组件, xxx}`

S2.4 注意，定义跳转的组件时，需要把依赖的组件引入


S3.1 实现 显示不同路由对应的 视图组件: 语法是: `<router-view class="view" name="视图名称"></router-view>`

S4 实现 点击跳转组件: 语法是: `<router-link :to="{ name: '路由名称', params: { 参数名: 参数值 }}">xxx</router-link>`


## <span id="2"> 2 实际 代码参考 </span>

1 Q: 实际参考代码有哪些

A:
S1 [routes: 配置路由和组件关系](https://github.com/gmYuan/cNode/blob/master/src/router/index.js)

S2 [显示不同路由对应的 视图组件](https://github.com/gmYuan/cNode/blob/master/src/App.vue)
