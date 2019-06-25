S1 上传图片文件: label + input: @change="uploadImg($event)"

S2 uploadImg($event):

  S2.1 限制上传类型:  正则 + e.target.value


<template>
  <div>
    <span>
      <label for="fileInput" class="cursor_pointer">修改</label>
      <input type="file" id="fileInput"
             v-show="false"
             accept="image/png, image/jpeg, image/gif, image/jpg"
             @change="uploadImg($event)">
    </span>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        options: {},   //返回图片的相关属性
      }
    },
    components: {
      VueCropper,
    },

    methods: {
      // 图片上传处理
      uploadImg(e) {
        let file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$message.error('图片类型只能是 JPG、PNG!')
          return
        }
        // let  reader = new FileReader()
        // reader.onload = e => {
        //   let data;
        //   if (typeof e.target.result === "object") {
        //     // 把Array Buffer转化为blob 如果是base64不需要
        //     data = window.URL.createObjectURL(new Blob([e.target.result]));
        //   } else {
        //     data = e.target.result;
        //   }
        //
        //   this.option.img = data;
        // };
        // 转化为base64
        // reader.readAsDataURL(file)
      },


      //S1  图片上传前处理
      avatarHandle(e) {
        let file = e.target.files[0]
        this.picLimit(file)
        e.target.value = ''  //上传之后，无论成功还是失败，都清楚之前的已传值，以解决[input type='file']相同文件连续第二次上传失效
      },

      // 图片格式验证
      picLimit(file) {
        const isRightType = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
        if (!isRightType) {
          this.$message.error('图片类型只能是 JPG、PNG!')
          return
        }
        // 图片限制通过后，上传到阿里云
        if (isRightType) {
          this.uploadOss(file)
        }
      },

      // 上传到阿里云
      uploadOss(file) {
        this.Oss.uploadFile(file).then(res => {
          this.savePicInfo(file.name, res.url)
        })
      },
      // 传到数据库中，重新获取头像数据
      savePicInfo(name, url) {
        this.request(this.apis.getApiByKey('UPLOAD_AVATAR_API'), {
          headImg: url
        }).then(() => {
          this.request(this.apis.getApiByKey('USER_INFO_API'))
            .then(res => {
              let picurl = res.userInfo.userHeadImg
              this.headImg = picurl
              BroadCast.emit('uploadAvatar1', picurl)
              BroadCast.emit('uploadAvatar2', picurl)
            })
        })
      },

    },

  }
</script>


