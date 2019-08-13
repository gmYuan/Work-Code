
1 Q: 如何实现 登录功能对接

A:

S1 前端验证 空数据提交

S2 获取location.getItem('sessionId'), 作为?Sid值添加到请求url后发出请求

S3发送请求，登录信息错误时 显示返回的错误信息 + 登录过期时，设置sessionId为空 + 跳转到登录页

S4 请求成功后，存储sessionId + 跳转到下一个页面(首页)


示例代码:

<template>
  <div class="container" @touchmove="showTop">
    .....

    <div class="button-wrap">
      <div class="btn" @click="setLogin">  登 录 </div>
    </div>

  </div>
</template>

<script>

  export default {

    methods: {
      /* 登录检测 */
      checkLogin() {
        if (this.accountValue === '') {
          const toast = this.$createToast({
            txt: '请输入账号',
            type: 'error',
            time: 1000,
          })
          toast.show()
          return
        } else if (this.pwdValue === '') {
          const toast = this.$createToast({
            txt: '请输入密码',
            type: 'error',
            time: 1000,
          })
          toast.show()
          return
        }
        return true
      },

      setLogin() {
        if (this.checkLogin()) {
          let para = {phone: `${this.accountValue}`, pwd: `${this.pwdValue}`, entryType: 1}
          loginApi(para).then(res => {
            if (res) {    //登录成功，存储sessionId
              let sessionId = res.data.sessionId
              localStorage.setItem('sessionId', sessionId)
              this.$router.push({path: `/home`})
            }
          })
        }
      }

    },
  }



  /* axios文件部分 */

  // 获取sessionId
  let sessionId = localStorage.getItem('sessionId')


  export function post(url) {
    return function (params) {
      let param = {};
      param.Data = JSON.stringify(params)
      return axios.post(url + '?Sid=' + sessionId, param)
        .then((res) => {
          const data = res.data
          const errorn = data.code
          // console.log(errorn,data)

          if (errorn === ERR_OK) {
            // console.log('ok')
            return data
          }else if(errorn === LOGOUT){   //登录失效，返回登录页
            const toast = Toast.$create({
              txt: `${data.msg}`,
              type: 'error',
              time: 1000,
            })
            toast.show()
            localStorage.setItem('sessionId', '');
            location.href= `${location.origin}/login#/login`
            return

          }else {
            const toast = Toast.$create({
              txt: `${data.msg}`,
              type: 'error',
              time: 1000,
            })
            toast.show()
            return
          }
        }).catch(() => {
          console.log('系统报错')
        })
    }

</script>













