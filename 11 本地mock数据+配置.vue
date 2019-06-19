S1 安装axios: npm i axios --save

S2 在需要使用axios的组件中，引入axios: import axios from 'axios'

S3.1 在父组件中发起axios数据请求(之后传递给需要数据的 子组件)

S3.2 本地的模拟数据，可以放在 static/mock文件夹下(外部可以直接访问到static里的数据内容)

S3.3 注意，本地的模拟数据要添加到 .gitignore里(避免提交)


S4.1 使用本地模拟数据会有一个问题，在上线时需要访问真实API，而不是本地的static/mock文件夹 

S4.2 所以需要做一个代理配置,这样在开发环境中也可以直接写真实的API地址(代理会自动转为访问 static/mock)

S4.3 配置方法为: src/config/index.js文件下:

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {                             //代理配置
      '/api': {                               // 需要被代理的url
        target: 'http://localhost:8080',
        pathRewrite: {                        // 路径重写
          '^/api': 'static/mock'
        }
      }
    },

  }
}
// 配置完要重启项目


S5 创建本地JOSN数据



<template>
  <div>

    ......

  </div>
</template>

<script>

export default {
  name: "Vue 本地mock数据 + 对应配置",
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json').then( res => {
        console.log(res)
      })
    },
  },

  mounted () {
    this.getHomeInfo()
  },
  
}
</script>
