
1 Q: 通过vue-router的 query获取到跨页面数据，有什么易错点

A:
S1 数据类型可能会发生变化, 第一次可能是number,之后可能是string

S2 当和switch配合使用时，可能因为数据类型的不同而不执行内部语句

S3 所以，最好的解决方法是: 用query获取到数据后，使用前先强制转化为某个 明确的数据类型

示例代码:


<script>

  export default {
    methods: {
      /* 获取课程详情 */
      async getDetail() {
        let {courseId, fromType} = this.$route.query
        let para = {courseId}
        let res
        let data
        console.log('ty', typeof fromType)          //fromType可能会发生变化，所以下面用了==来判断
        if (fromType == 0) {
          res = await basicCourseStudyApi(para)
          data = res.data

        } else if (fromType == 1) {
          res = await commonCourseDetailApi(para)
          data = res.data
        }

        if (data) {
          this.courseId = data.courseId
          this.courseDetail.title = data.courseName
          this.courseDetail.introduction = data.details
          this.src = data.videoUrl
          this.score = data.score
          this.coursewareList = data.wareList
          this.commentNum = data.commentNum
          this.collectionNum = data.collectionNum
          this.pointPraiseNum = data.pointPraiseNum
          this.isCollection = data.isCollection
          this.isPointPraise = data.isPointPraise
          this.status = data.status
        }
      },
    },
  }
</script>













