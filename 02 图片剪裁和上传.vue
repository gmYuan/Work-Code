参考文档
01 [vue 实现剪裁图片并上传服务器](https://juejin.im/post/5a96b4e1f265da4e82637ec6)
直接参考文档

02 [前端图片canvas，file，blob，DataURL等格式转换](https://juejin.im/post/5b5187da51882519ec07fa41)
bolb/dataurl含义

03 [细说Web API中的Blob](https://juejin.im/post/59e35d0e6fb9a045030f1f35)
bolb/dataurl的区别




S1 上传图像文件: label + input:file, 监听 @change事件，回调函数为readImage($event)

S2 readImage($event)
  S2.1 限制上传文件的类型为图片:                        正则test + e.target.value
  S2.2 新建Image对象，把图片文件转化为 二进制data url:   createObjectURL() / new FileReader()
  S2.3 存储上传图片的相关信息(为了之后按图片宽高比例 设置canvas的宽高):  originalImg + originalImgData: {src: "", width: 0, height: 0}

S3 calcCanvasSize: 根据originalImgData的信息，按图片宽高比例 设置canvas的宽高(cropperCanvasSize +  cropperSize)

S4 renderCropperImg: 显示上传的图片


<template>
  <div style="height:605px;overflow:hidden;">

    <div class="basic_information">
      <div class="word">基本信息</div>
      <div class="basic_info">
        <div class="photo">

          <span>
            <label for="fileInput" class="cursor_pointer">修改</label>
            <input type="file" id="fileInput"
                   v-show="false"
                   accept="image/png, image/jpeg, image/jpg"
                   @change="readImage($event)">
          </span>

          <el-dialog :visible.sync="dialogVisible"  width="30%">
            <canvas ref="cropper"
                    :width="cropperCanvasSize.width"
                    :height="cropperCanvasSize.height"
                    :class="{'movement':movement}"
            ></canvas>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadImg()">确 定</el-button>
              </span>
          </el-dialog>

          <canvas
            v-show="false"
            :width="previewSize" :height="previewSize"
            ref="preview"
          ></canvas>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import BroadCast from '@/common/js/broadcast.js'

  export default {
    data() {
      return {

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
        slectRadius:  75,    // previewSize/2

      }
    },
    computed: {
      circleCenter: {
        get() {
          return {
            X: this.cropperLocation.X + this.slectRadius,
            Y: this.cropperLocation.Y + this.slectRadius
          };
        },
        set(newVal) {
          let X = newVal.X - this.slectRadius;
          let Y = newVal.Y - this.slectRadius;
          // 设置临界点
          if (this.cropperCanvasSize.width > 2 * this.slectRadius) {
            X < 0 && (X = 0);
            X + 2 * this.slectRadius > this.cropperCanvasSize.width &&
            (X = this.cropperCanvasSize.width - 2 * this.slectRadius);
          }
          if (this.cropperCanvasSize.height > 2 * this.slectRadius) {
            Y < 0 && (Y = 0);
            Y + 2 * this.slectRadius > this.cropperCanvasSize.height &&
            (Y = this.cropperCanvasSize.height - 2 * this.slectRadius);
          }
          this.cropperLocation = { X, Y };
        }
      }
    },

    methods: {
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
        image.onload = () => {
          self.originalImgData = {
            src: image.src,
            width: image.width,
            height: image.height
          };

          let cropperFlag = true;
          if (cropperFlag) {
            self.originalImg = image;
            // console.log(self.originalImg, self.originalImgData)
            this.dialogVisible = true

            self.calcCanvasSize()
            setTimeout(() => {
              self.renderCropperImg();
              self.drag();
            }, 50);
          }
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
        this.cropperLocation = {                // 确定裁剪的左上角位置,默认为 0,0
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

      uploadImg() {
        this.dialogVisible = false

        const canvas = this.$refs.preview;
        let src = canvas.toDataURL('image/png')   // 通过canvas获取到图片（base64格式）
        this.dataURLtoFile(src)
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
              this.clear()
            })
        })
      },
      clear() {
        this.originalImg = null;
        this.originalImgData = {src: "", width: 0, height: 0},
          this.$refs.cropper.getContext("2d").clearRect(0, 0, this.cropperCanvasSize.width, this.cropperCanvasSize.height);
        this.$refs.preview.getContext("2d").clearRect(0, 0, this.previewSize, this.previewSize);
      },
    },

  }
</script>

<style lang="scss">

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
</style>


