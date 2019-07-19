<template>
  <div style="height:605px;overflow:hidden;">
    <div class="basic_information">
      <div class="word">基本信息</div>
      <div class="basic_info">
        <div class="photo">
          <img v-if="headImg" :src="headImg" alt>
          <img v-else src="../../../assets/img/learning/Default_avatar.png" alt>

          <!--新增点击图片，弹出选择文件-->
          <!--          <span>-->
          <!--            <label for="fileInput" class="cursor_pointer">修改</label>-->
          <!--            <input v-show="false" type="file" id="fileInput" @change="avatarHandle">-->
          <!--          </span>-->
          <span>
            <label for="fileInput" class="cursor_pointer">修改</label>
            <input type="file" id="fileInput"
                   v-show="false"
                   accept="image/png, image/jpeg, image/jpg"
                   @change="readImage($event)">
          </span>

          <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            title="修改头像"
          >

            <!--            <canvas-->
            <!--              ref="cropper"-->
            <!--              :width="cropperCanvasSize.width" :height="cropperCanvasSize.height"-->
            <!--              :class="{'movement':movement}"-->
            <!--            ></canvas>-->

            <div class="cropper-content">
              <div class="cropper" style="text-align:center">
                <vueCropper
                  ref="cropper"
                  :img="option.img"
                  :info="option.info"
                  :canMove="option.canMove"
                  :outputSize="option.size"

                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :mode="option.mode"
                  :fixedBox="option.fixedBox"
                  :centerBox="option.centerBox"

                ></vueCropper>
              </div>
            </div>

            <div class="scale">
              <el-button @click="changeScale(-2)"> - </el-button>
              <el-button @click="changeScale(2)"> + </el-button>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="uploadImg()">确 定</el-button>
            </span>
          </el-dialog>
          <!--          <canvas-->
          <!--            v-show="false"-->
          <!--            :width="previewSize" :height="previewSize"-->
          <!--            ref="preview"-->
          <!--          ></canvas>-->


        </div>


        <ul class="info">
          <li>姓名：&nbsp;{{userName}}</li>
          <li>部门：&nbsp;{{orgName}}</li>
          <li>职位：&nbsp;{{positionName}}</li>
          <li>银行：&nbsp;{{enterpriseName}}</li>
        </ul>
      </div>
    </div>
    <div class="account_management">
      <div class="word">账号管理</div>
      <div class="info">
        <ul class="left">
          <li>账号</li>
          <li>密码</li>
          <li>手机号</li>
          <li>微信绑定</li>
        </ul>
        <ul class="right">
          <li>
            <p>：&nbsp;{{accName}}</p>
          </li>
          <li>
            <p>：&nbsp;·······</p>
            <span @click="changePassword = true">修改</span>
          </li>
          <li>
            <p>：&nbsp;{{phone}}</p>
            <span @click="changeTel = true">修改</span>
          </li>
          <li>
            <p>：&nbsp;未绑定</p>
            <span @click="vxBound = true">去绑定</span>
          </li>
        </ul>
      </div>
    </div>

    <!--修改密码弹框 -->
    <div class="changePassword_dialog">
      <el-dialog title="修改密码" :visible.sync="changePassword" width="420px" center top="413px">
        <div class="body">
          <input
            type="text"
            placeholder="手机号"
            class="tel"
            v-model="tel"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
          >
          <div class="code">
            <input type="text" placeholder="验证码" v-model="code">
            <button>发送验证码</button>
          </div>
          <button class="next" @click="changePassword_nextStep()">下一步</button>
        </div>
      </el-dialog>
    </div>

    <!-- 确认新密码弹框 -->
    <div class="confirmPassword_dialog">
      <el-dialog title="修改密码" :visible.sync="confirmPassword" width="420px" center top="413px">
        <div class="body">
          <input type="password" placeholder="输入新密码" v-model="newPassword">

          <input class="again" type="password" placeholder="再次输入新密码" v-model="again">

          <button class="next" @click="changePassword_confirm()">确认修改</button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改手机号弹框 -->
    <div class="changeTel_dailog">
      <el-dialog title="修改手机号" :visible.sync="changeTel" width="420px" center top="413px">
        <div class="body">
          <input type="text" placeholder="手机号" class="tel">
          <div class="code">
            <input type="text" placeholder="验证码">
            <button>发送验证码</button>
          </div>
          <button class="next" @click="changeTel_nextStep()">下一步</button>
        </div>
      </el-dialog>
    </div>

    <!-- 新手机号绑定弹窗 -->
    <div class="newTel_dailog">
      <el-dialog title="新手机号" :visible.sync="newTel" width="420px" center top="413px">
        <div class="body">
          <input type="text" placeholder="手机号" class="tel">
          <div class="code">
            <input type="text" placeholder="验证码">
            <button>发送验证码</button>
          </div>
          <button class="next">完成绑定</button>
        </div>
      </el-dialog>
    </div>

    <!-- 微信绑定弹框 -->
    <div class="vxBound_dailog">
      <el-dialog title="微信绑定" :visible.sync="vxBound" width="420px" center top="413px">
        <div class="body">
          <div class="ewm">
            <img src="../../../assets/img/login/ewm.png" alt>
          </div>
          <p class="p1">微信扫一扫上方二维码</p>
          <p class="p2">关注公众账号并绑定</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import fn from '@/common/js/common.fn.js'

  // 裁剪图片组件
  import { VueCropper }  from 'vue-cropper'
  import BroadCast from '@/common/js/broadcast.js'

  export default {
    data() {
      return {
        changePassword: false,
        confirmPassword: false,
        newPassword: '',
        again: '',
        changeTel: false,
        newTel: false,
        vxBound: false,
        tel: '',
        code: '',

        headImg: '',
        orgName: '',
        positionName: '',
        userName: '',
        phone: '',
        enterpriseName: '',
        accName: '',

        // 图片上传相关
        originalImg: null,
        originalImgData: {src: "", width: 0, height: 0},
        mask: 'dark',
        shape: 'round',
        movement: false,

        dialogVisible: false,       // 裁剪的dialog框
        cropperSize: 300,           // 默认dialog宽度
        previewSize: 150,           // 默认裁剪半径
        cropperCanvasSize: {
          width: this.cropperSize,
          height: this.cropperSize
        },
        cropperLocation: {
          X: 0,
          Y: 0
        },
        slectRadius: 75,


        // tag2
        option: {
          img: '',          // 裁剪图片的地址
          canMove: false,   // 上传图片背景容器 是否可以移动
          info: false,       // 是否显示 裁剪框的大小信息
          outputSize: 0.8, // 裁剪生成图片的质量

          canScale: true,        // 图片是否允许滚轮缩放
          autoCrop: true,        // 是否默认生成截图框
          autoCropWidth: 150,    // 默认生成截图框宽度
          autoCropHeight: 150,   // 默认生成截图框高度
          fixedBox: true,        // 固定截图框大小 不允许改变
          mode: 'cover',         //  截图渲染方式
          centerBox: true,      // 截图框是否被限制在图片里面

        },


      }
    },
    components: {
      VueCropper,
    },
    computed: {
      // circleCenter: {
      //   get() {
      //     return {
      //       X: this.cropperLocation.X + this.slectRadius,
      //       Y: this.cropperLocation.Y + this.slectRadius
      //     };
      //   },
      //   set(newVal) {
      //     let X = newVal.X - this.slectRadius;
      //     let Y = newVal.Y - this.slectRadius;
      //     // 设置临界点
      //     if (this.cropperCanvasSize.width > 2 * this.slectRadius) {
      //       X < 0 && (X = 0);
      //       X + 2 * this.slectRadius > this.cropperCanvasSize.width &&
      //       (X = this.cropperCanvasSize.width - 2 * this.slectRadius);
      //     }
      //     if (this.cropperCanvasSize.height > 2 * this.slectRadius) {
      //       Y < 0 && (Y = 0);
      //       Y + 2 * this.slectRadius > this.cropperCanvasSize.height &&
      //       (Y = this.cropperCanvasSize.height - 2 * this.slectRadius);
      //     }
      //     this.cropperLocation = { X, Y };
      //   }
      // }
    },

    methods: {
      changePassword_nextStep() {
        if (this.tel.length != 11) {
          Message.error('手机号格式不正确')
          return
        }
        this.request(this.apis.getApiByKey('CHECKCODE_API'), {
          phone: this.tel,
          vCode: this.code,
          vType: 2
        }).then(res => {
          this.confirmPassword = true
        })
      },
      changePassword_confirm() {
        if (this.newPassword === this.again) {
          this.request(this.apis.getApiByKey('UPDATEPASSWORD_API'), {
            vCode: this.code,
            phone: this.tel,
            newPWD: this.newPassword
          }).then(res => {
            if (res == '') {
              this.confirmPassword = false
              this.changePassword = false
              this.newPassword = ''
              this.again = ''
              this.tel = ''
              this.code = ''
            }
          })
        } else {
          Message.error('两次输入密码不一致')
        }
      },

      changeTel_nextStep() {
        this.newTel = true
      },

      // 图片上传处理
      readImage(e) {
        // 判断上传图片的类型
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
          this.$message.error('图片类型只能是 JPG、PNG!')
          return
        }

        const self = this
        const rawfile = event.target.files[0]
        const image = new Image()
        image.src = URL.createObjectURL(rawfile)
        console.log('111', image)
        image.onload = () => {
          self.originalImgData = {
            src: image.src,
            width: image.width,
            height: image.height
          };

          // 上传成功后将图片地址赋值给裁剪框显示图片
          self.option.img = image.src
          self.dialogVisible = true



          // let cropperFlag = false;    //tag1
          // if (cropperFlag) {
          //   self.originalImg = image;
          //   // console.log(self.originalImg, self.originalImgData)
          //   this.dialogVisible = true
          //
          //   self.calcCanvasSize()
          //   setTimeout(() => {
          //     self.renderCropperImg();
          //     self.drag();
          //   }, 50);
          // }
          e.target.value = ''  //上传之后，无论成功还是失败，都清楚之前的已传值，以解决[input type='file']相同文件连续第二次上传失效
        }
      },
      calcCanvasSize() {       // 保持 图片宽高比
        if (this.originalImgData.width > this.originalImgData.height) {
          this.cropperCanvasSize.width = this.cropperSize;
          this.cropperCanvasSize.height =
            this.cropperSize *
            this.originalImgData.height /
            this.originalImgData.width;
        } else {
          this.cropperCanvasSize.height = this.cropperSize;
          this.cropperCanvasSize.width =
            this.cropperSize *
            this.originalImgData.width /
            this.originalImgData.height;
        }
        this.cropperLocation = {                // 圆形半径
          X: this.cropperCanvasSize.width / 2 - this.slectRadius,
          Y: this.cropperCanvasSize.height / 2 - this.slectRadius
        }
      },
      renderCropperImg() {
        const canvas = this.$refs.cropper;
        const ctx = canvas.getContext("2d");
        const tone = this.mask === "light" ? 255 : 0;
        // 清空画布
        ctx.clearRect(
          0,
          0,
          this.cropperCanvasSize.width,
          this.cropperCanvasSize.height
        );
        ctx.save();
        // 填充图片
        ctx.drawImage(
          this.originalImg,
          0,
          0,
          this.cropperCanvasSize.width,
          this.cropperCanvasSize.height
        );
        // 绘制蒙版
        ctx.beginPath();
        ctx.fillStyle = `rgba(${tone},${tone},${tone},.5)`;
        ctx.fillRect(
          0,
          0,
          this.cropperCanvasSize.width,
          this.cropperCanvasSize.height
        );
        // 绘制裁剪区域
        ctx.save();
        ctx.beginPath();
        ctx.rect(
          this.circleCenter.X - this.slectRadius,
          this.circleCenter.Y - this.slectRadius,
          2 * this.slectRadius,
          2 * this.slectRadius
        );
        ctx.clip();
        ctx.closePath();
        ctx.drawImage(
          this.originalImg,
          0,
          0,
          this.cropperCanvasSize.width,
          this.cropperCanvasSize.height
        );
        this.renderPreviewImg(canvas);
        ctx.fillStyle = `rgba(${tone},${tone},${tone},.5)`;
        ctx.fillRect(
          0,
          0,
          this.cropperCanvasSize.width,
          this.cropperCanvasSize.height
        );
        // 绘制选中区域
        ctx.beginPath();
        if(this.shape === "round"){
          ctx.arc(
            this.circleCenter.X,
            this.circleCenter.Y,
            this.slectRadius,
            0,
            Math.PI * 2,
            true
          );
        }else{
          ctx.rect(this.cropperLocation.X,
            this.cropperLocation.Y,this.slectRadius*2,this.slectRadius*2)
        }

        ctx.clip();
        ctx.closePath();
        ctx.drawImage(
          this.originalImg,
          0,
          0,
          this.cropperCanvasSize.width,
          this.cropperCanvasSize.height
        );
        ctx.restore();
      },
      renderPreviewImg(image) {
        const canvas = this.$refs.preview;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.slectRadius * 2, this.slectRadius * 2);
        ctx.drawImage(
          image,
          // 剪裁图片
          this.cropperLocation.X,
          this.cropperLocation.Y,
          this.slectRadius * 2,
          this.slectRadius * 2,
          0,
          0,
          this.slectRadius * 2,
          this.slectRadius * 2
        );
      },
      drag() {
        const self = this;
        const canvas = this.$refs.cropper;
        canvas.onmousedown = e => {
          let [lastX, lastY] = [e.offsetX, e.offsetY];
          self.movement = true;
          canvas.onmousemove = e => {
            self.circleCenter = {
              X:
                self.cropperCanvasSize.width > 2 * self.slectRadius
                  ? self.circleCenter.X + (e.offsetX - lastX)
                  : self.cropperCanvasSize.width / 2,
              Y:
                self.cropperCanvasSize.height > 2 * self.slectRadius
                  ? self.circleCenter.Y + (e.offsetY - lastY)
                  : self.cropperCanvasSize.height / 2
            };
            self.renderCropperImg();
            [lastX, lastY] = [e.offsetX, e.offsetY];
          };
          canvas.onmouseup = e => {
            self.movement = false;
            canvas.onmousemove = null;
            canvas.onmouseup = null;
          };
        };
      },

      // 缩放图片
      changeScale (value) {
        this.$refs.cropper.changeScale(value)
      },



      uploadImg() {
        this.dialogVisible = false

        // const canvas = this.$refs.preview;
        // let src = canvas.toDataURL('image/png')   // 通过canvas获取到图片（base64格式）
        // this.dataURLtoFile(src)

        this.$refs.cropper.getCropData((data) => {
          this.dataURLtoFile(data)
        })

      },
      //将base64图片转换为文件对象 并上传到阿里云OSS
      dataURLtoFile(dataurl) {
        var arr = dataurl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        //转换成file对象
        let file = new File([u8arr], '.png', { type: mime })
        this.uploadOss(file)
      },


      // 上传到阿里云
      uploadOss(file){
        this.Oss.uploadFile(file).then(res => {
          this.savePicInfo(file.name, res.url)
        })
      },
      // 传到数据库中，重新获取头像数据
      savePicInfo(name, url) {
        this.request(this.apis.getApiByKey('UPLOAD_AVATAR_API'),{
          headImg: url
        }).then ( () => {
          this.request(this.apis.getApiByKey('USER_INFO_API'))
            .then( res => {
              let picurl = res.userInfo.userHeadImg
              this.headImg = picurl
              BroadCast.emit('uploadAvatar1', picurl)
              BroadCast.emit('uploadAvatar2', picurl)
              // this.clear()
            })
        })
      },
      // clear() {
      //   this.originalImg = null;
      //   this.originalImgData = {src: "", width: 0, height: 0},
      //   this.$refs.cropper.getContext("2d").clearRect(0, 0, this.cropperCanvasSize.width, this.cropperCanvasSize.height);
      //   this.$refs.preview.getContext("2d").clearRect(0, 0, this.previewSize, this.previewSize);
      // },

    },
    mounted() {

      this.request(this.apis.getApiByKey('USER_INFO_API'))
        .then(res => {
          let userInfo = res.userInfo
          let accountInfo = res.accInfo

          this.userName = userInfo.userName
          this.headImg = userInfo.userHeadImg
          this.orgName = userInfo.orgName
          this.positionName = userInfo.positionName
          this.enterpriseName = userInfo.enterpriseName
          this.accName = accountInfo.accName
        })
    }
  }
</script>
<style lang="scss" scoped>
  @import './personalInfo.scss';
</style>

<style lang="scss" scoped>
  .el-dialog {
    height: 340px;
    margin-top: 413px;
    color: rgba(52, 52, 52, 1);
    box-shadow: 0px 2px 9px 0px rgba(129, 129, 129, 0.3);
    border-radius: 10px;
    .el-dialog__header {
      margin: 0 auto;
      width: 340px;
      height: 82px;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(52, 52, 52, 1);
      border-bottom: 1px solid #979797;
    }
    .body {
      display: flex;
      flex-direction: column;
      // width: 340px;
      input {
        border-radius: 6px;
        border: 1px solid rgba(218, 218, 218, 1);
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(85, 85, 85, 1);
        padding: 0 18px;
        height: 46px;
      }
      .tel {
        width: 340px;
        margin: 0 auto;
      }
      .code {
        // margin-top: 20px;
        // width: 340px;
        // height: 46px;
        margin: 0 auto;

        input {
          width: 210px;
          margin-top: 20px;
        }
        button {
          display: inline-block;
          width: 120px;
          height: 46px;
          background: rgba(84, 116, 251, 1);
          border-radius: 6px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-left: 11px;
        }
      }
      .next {
        width: 340px;
        height: 48px;

        margin: 0 auto;
        background: rgba(8, 55, 248, 1);
        border-radius: 6px;
        margin-top: 30px;
        font-size: 22px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .vxBound_dailog {
    .el-dialog {
      height: 354px;
      .body {
        .ewm {
          width: 140px;
          height: 140px;
          margin: 0 auto;
          // margin-top: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .p1 {
          text-align: center;
          height: 30px;
          line-height: 25px;
        }
        .p2 {
          text-align: center;
          height: 22px;
          line-height: 25px;
          margin-top: 2px;
        }
      }
    }
  }
  .confirmPassword_dialog {
    .again {
      margin-top: 20px;
    }
  }

  /* 裁剪部分样式 */
  .photo {
    /deep/ .el-dialog {
      min-height: 380px;

      .el-dialog__header {
        height: 0;
        border: none;
      }
      .el-dialog__body {
        text-align: center;
        .movement{
          cursor: move;
        }
      }
    }
  }



  // 图片裁剪样式
  .cropper-content {
    .cropper {
      margin: 0 auto;
      width: 350px;
      height: 300px;             // 图片容器宽高

      /deep/ .vue-cropper {
        background: none;        // 去除裁剪区背景图

        .cropper-view-box {       // 裁剪区样式设置
          outline: none;
          border-radius: 50%;
        }

        .cropper-face {
          background-color: inherit;
        }

      }
    }
  }

  .scale {
    margin-top: 16px;
  }

</style>


