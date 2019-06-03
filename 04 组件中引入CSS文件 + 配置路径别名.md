
1 Q: 如何在组件中 使用CSS文件(如 variables.scss)

A:
S1 在组件的 `<style lang="scss" scoped>` 通过 @import命令引入CSS文件

S2 使用定义的变量名即可: `background: $headerBackground;`


2 Q: 引入CSS文件的路径可能很长，如何通过webpack配置别名

A:
S1.1 在webpack.base.config.js文件中，找到resolve对象，配置alias值

```js
// webpack.base.config.js

resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    '@scss': resolve('src/scss')
  }
},
```

S1.2 注意重新配置webpack内容后，需要重新npm run dev

S2.1 在组件的scrtpt部分/JS文件中 引入时，直接使用 @scss即可

S2.2 在组件的style部分引入时，需要使用 `~@scss/....`(经过实测，发现直接用@scss即可)