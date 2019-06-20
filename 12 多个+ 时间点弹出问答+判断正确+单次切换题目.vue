<template>
  <div>
    ....
    ....


  </div>
</template>


<script>
export default {
  data() {
    return {
       pauseVideo: [], //需要暂停答题的时间，和对应时间的题目是否已经通过:  [ { time: 10, isPass: false, paperId: 40 }, { time: 20.... }.... ]
    }
  },

  methods: {
    getVideoTestInfo() {
      // S1 获取所有课时数据，判断是当前课时时，获取当前课时的 所有问题相关数据(弹出时间、是否通过、对应试题的id)
      let currentSection = this.$route.query.sectionId

      let courseId = this.$route.query.courseId
      this.request(this.apis.getApiByKey('COURSE_DETAILS_API'), {      //S1.1 获取所有课时数据
        courseId: courseId,
        userStageCourseId: ''
      }).then(res => {
        res.plaintext.fxqCourseSectionViews.forEach( item => {  // item表示每个课时信息， 内部有当前课时id信息 + 当前的试题数组
          if (item.plaintext.id == currentSection) {
            item.children.forEach( value => {                   // value表示每个课时中的 依次每个暂停点

              let videoTimeObj = {}
              videoTimeObj.time = Math.floor( value.plaintext.readDate / 1000 )
              videoTimeObj.isPass = false
              videoTimeObj.paperId = value.plaintext.paperId
              this.pauseVideo.push(videoTimeObj)             //S1.2 获取当前课时的 所有问题相关数据(弹出时间、是否通过、对应试题的id)
            })
          }
        })

      })
    },

    // S2 监听视频的时间更新事件， 当 当前时间= 暂停时间点时， 暂停视频+ 发起请求以获取题目数据 + 弹出界面框
    captureTime () {
      let timeDisplay;
      let video = this.$refs.video
      video.addEventListener(
        'timeupdate',
        function () {
          if (Math.floor(video.currentTime) == timeDisplay) return;   //去除 因为floor精度问题导致的重复执行

          timeDisplay = Math.floor(video.currentTime)
          for (let value of self.pauseVideo) {
            if (timeDisplay == value.time && !value.isPass) {
              video.pause()
              self.getVideoTestPaper(value.paperId)
              // self.centerDialogVisible = true
              // self.curTimer = timeDisplay
            }
          }
        },
        false)
    },

    // S3 获取单个视频里的 单次暂停点的所有试卷数据
    getVideoTestPaper (paperId) {
      this.request(this.apis.getApiByKey('GET_TEXT_DATA_API'), {
        testId: paperId,
      }).then(res => {
        res.ciphertext.testName = this.common.decrypt(res.ciphertext.testName)              //S3.1 解密试卷加密内容
        res.ciphertext.textContent = this.common.decrypt(res.ciphertext.textContent)
        // console.log('000', res)





      })
    },

   
  }
}
</script>
